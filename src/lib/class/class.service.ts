import { CreateClassSchema, Class } from "./class.model";
import { createClassInRepository } from "./class.repository";

export async function createClass(data: unknown): Promise<Class> {
  const ClassData = CreateClassSchema.parse(data);
  const result = await createClassInRepository(ClassData);

  return result[0];
}
