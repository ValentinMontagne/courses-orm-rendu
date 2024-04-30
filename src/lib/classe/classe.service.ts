import { CreateClasseSchema, Classe } from "./classe.model";
import { createClasseInRepository, getClassesInRepository } from "./classe.repository";

export async function createClasseService(data: unknown): Promise<Classe> {
    const classeData = CreateClasseSchema.parse(data);
    const result = await createClasseInRepository(classeData);

    return result[0];
}

export async function getAllclasses(): Promise<Classe[]> {
    const result = await getClassesInRepository();
    return result;
}