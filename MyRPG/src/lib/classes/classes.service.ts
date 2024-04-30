import { CreateClasseSchema, Classe } from "./classes.model";
import { createClasseInRepository,deleteClassesInRepository,getAllClassesInRepository } from "./classes.repository";

export async function createClasse(data: unknown): Promise<Classe> {
  const ClasseData = CreateClasseSchema.parse(data);
  const result = await createClasseInRepository(ClasseData);

  return result[0];
}

export async function getAllClasses(): Promise<Classe[]> {
    const classes = await getAllClassesInRepository();
    return classes;
}

export async function deleteClasse(id : number): Promise<Classe[]> {
    const players = await deleteClassesInRepository(id);
    return players;
}