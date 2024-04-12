import { CreateClassSchema, Class } from "./class.model";
import { createClassInRepository, deleteClassInRepository, getAllClassesInRepository, getClassInRepository, updateClassInRepository } from "./class.repository";

export async function createClass(data: unknown): Promise<Class> {
  const classData = CreateClassSchema.parse(data);
  const result = await createClassInRepository(classData);

  return result[0];
}

export async function getAllClasses(): Promise<Class[]> {
  return await getAllClassesInRepository();
}

export async function getClassById(classId: number): Promise<Class[]> {
  return await getClassInRepository(classId);
}

export async function updateClassById(classId: number, updatedClassData: Partial<Class>): Promise<void> {
  await updateClassInRepository(classId, updatedClassData);
}


export async function deleteClassById(classId: number) {
  return await deleteClassInRepository(classId);
}