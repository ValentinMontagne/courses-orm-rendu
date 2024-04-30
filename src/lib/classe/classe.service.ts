import { Classe, CreateClasseSchema } from "./classe.model";
import { createClasseInRepository, getAllClasseInRepository } from "./classe.repository";

export async function createClasse(data:unknown): Promise<Classe> {
    const classeData = CreateClasseSchema.parse(data);
    const result = await createClasseInRepository(classeData);

    return result[0];
}

export async function getAllClasse(): Promise<Classe[]> {
    const result = await getAllClasseInRepository();

    return result;
}