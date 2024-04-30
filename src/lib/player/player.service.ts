import { CreatePlayerSchema, Player } from "./player.model";
import {createPlayerInRepository, findAllInPlayerRepository, findIdInPlayerRepository} from "./player.repository";
import {findAllInCharacterRepository} from "../characters/character.repository";
import {Classe} from "../classe/classe.model";
import {findAllInClasseRepository, findIdInClasseRepository} from "../classe/classe.repository";

export async function createPlayer(data: unknown): Promise<Player> {
    const playerData = CreatePlayerSchema.parse(data);
    const result = await createPlayerInRepository(playerData);

    return result[0];
}

export async function findAllPlayer(): Promise<Player[]> {
    return findAllInPlayerRepository();
}

export async function findIdPlayer(id: number): Promise<Player[]> {
    return findIdInPlayerRepository(id);
}
