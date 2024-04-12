import { char } from "drizzle-orm/mysql-core";
import { getCharacterByIdInRepository } from "../character/character.repository";
import { getCharacterById } from "../character/character.service";
import { CreateFightSchema, Fight } from "./fight.model";
import { createFightInRepository, deleteFightInRepository, getFightsInRepository } from "./fight.repository";
import { getClassesByIdInRepository, getClassesInRepository } from "../classes/classe.repository";
import { getMonstersById } from "../monster/monster.service";

export async function createFight(data: unknown):Promise<number | Fight> {
  const FightData = CreateFightSchema.parse(data);

  //En cas de not found, nous renvoyons un code d'erreur qui nous permettras pas la suite de renvoyer un message cohérent à l'utilisateur
  var hpCharacter = 0;
  // Première étape, on récupère tous les characters et on incrémente les points de vie
  for(var characterId of FightData.characterIds){
    var character  = await getCharacterByIdInRepository(characterId);
    if(character[0] == null){
        return 1;
    }
    console.log(character)
    var classe = await getClassesByIdInRepository(character[0].classId);
    hpCharacter+=classe[0].hp;
  }

  //Deuxième étape, pareil que pour les character mais pour les monster
  var hpMonster = 0;
  // Première étape, on récupère tous les characters et on incrémente les points de vie
  for(var monsterId of FightData.monsterIds){
    let monster  = await getMonstersById(monsterId);
    if(monster == null){
        return 2;
    }
    console.log("monster found")
    console.log(monster)
    hpMonster+=monster.hp;
  }

  //Troisième étape, on set les nouveaux HP pour le Fight
  FightData.charactersHP = hpCharacter;
  FightData.monstersHP = hpMonster;
  const result = await createFightInRepository(FightData);
  return result[0];
}

export async function getFights() : Promise<Fight[]> {
    const result = await getFightsInRepository()
    return result;
}


