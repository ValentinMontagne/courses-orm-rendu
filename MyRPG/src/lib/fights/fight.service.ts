import { HttpBadRequest, HttpForbidden } from "@httpx/exception";
import { Fight} from "./fight.model";
import { createFightInRepository } from "./fight.repository";
import { get } from "http";
import { getMonsters } from "../monsters/monster.service";
import { getCharacters } from "../characters/character.service";

// Pour les combats, nous allons implémenter un combat tour par tour, il y aura beaucoup de logique métier ici :

// Le combat débute lors de sa création, on génère alors les points de vie des deux camps en additionnant les points de vie pour chaque Character ou Monster. Dès qu'un des deux champs "charactersHP" ou "monstersHP" tombent à zéro, le combat est terminé.

// Ensuite, chaque requête PATCH pour ajouter une action "attack" dans les champs "playerActions" ou "monsterActions" permet de réaliser un tour. Bien sûr, on ne peut pas jouer si ce n'est pas son tour, une "attack" fait diminuer les points de vie de l'adversaire de la somme de la puissance de chaque Character ou Monster

export async function createFight(data: unknown): Promise<Fight> {
    // TODO: Implement the createFight function
  return null;
}
