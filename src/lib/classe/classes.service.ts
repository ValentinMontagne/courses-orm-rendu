import {
    createClasseInRepository,
    deleteClasseRepository,
    findAllInClasseRepository,
    findIdInClasseRepository
} from "./classe.repository";
import {Classe, CreateClasseSchema} from "./classe.model";


export async function createClasse(data: unknown): Promise<Classe> {
    const classeData = CreateClasseSchema.parse(data);
    const result = await createClasseInRepository(classeData);

    return result[0];
}

export async function findAllClasse(): Promise<Classe[]> {
    return findAllInClasseRepository();
}

export async function findIdClasse(id: number): Promise<Classe[]> {
    return findIdInClasseRepository(id);
}

export async function deleteClasse(id: number): Promise<Classe[]> {
    return deleteClasseRepository(id);
}
