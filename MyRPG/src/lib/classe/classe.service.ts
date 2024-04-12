import { CreateClasseSchema, Classe } from "./classe.model";
import {
  createClasseInRepository,
  getAllClassesFromRepository,
  getClasseByIdFromRepository,
  deleteClasseFromRepository,
  updateClasseInRepository,
} from "./classe.repository";

export async function createClasse(data: unknown): Promise<Classe> {
  const classeData = CreateClasseSchema.parse(data);
  const result = await createClasseInRepository(classeData);

  return result[0];
}

export async function getAllClasses(): Promise<Classe[]> {
  return await getAllClassesFromRepository();
}

export async function getClasseById(
  classeId: number
): Promise<Classe[] | null> {
  return await getClasseByIdFromRepository(classeId);
}

export async function deleteClasse(classeId: number) {
  return await deleteClasseFromRepository(classeId);
}

export async function updateClasse(
  classeId: number,
  updatedClasseData: Partial<Classe>
): Promise<void> {
  await updateClasseInRepository(classeId, updatedClasseData);
}