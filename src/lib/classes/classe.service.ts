	
import { CreateClasseSchema, Classe } from "./classe.model";
import { createClasseInRepository, getAllClassesFromRepository, getClassesByIdFromRepository } from "./classe.repository";
 
export async function createClasse(data: unknown): Promise<Classe> {
  const classeData = CreateClasseSchema.parse(data);
  const result = await createClasseInRepository(classeData);
 
  return result[0];
}

export async function getAllClasses(): Promise<Classe[]> {
    const characters = await getAllClassesFromRepository();
    return characters;
  }
  
  export async function getClasseById(id: string): Promise<Classe | null> {
    const classe = await getClassesByIdFromRepository(id);
    return classe;
  }