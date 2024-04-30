import { Class, createClassSchema } from "./classes.model";
import { createClassInRepository, getClassesFromRepository } from "./classes.repository";

export async function createClass(data: unknown): Promise<Class> {
  const classData = createClassSchema.parse(data);
  const result = await createClassInRepository(classData);

  return result[0];
}

export async function getClasses(): Promise<Class[]> {
  const classes = await getClassesFromRepository();
  return classes;
}