import { Classe, CreateClasseSchema } from "./classe.model";
import { createClasseInRepository, deleteClasseInRepository, getClassesInRepository } from "./classe.repository";

export async function createClasse(data: unknown): Promise<Classe> {
  const playerData = CreateClasseSchema.parse(data);
  const result = await createClasseInRepository(playerData);

  return result[0];
}

export async function getClasses() : Promise<Classe[]> {
    const result = await getClassesInRepository()
    return result;
}

export async function deleteClasse(id : number) : Promise<Classe> {
    const result= await deleteClasseInRepository(id);
    return result[0];
}
