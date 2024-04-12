import { Classes, CreateClassesSchema } from "./classes.model";
import { createClassesInRepository } from "./classes.repository";

export async function Createclasses(data: unknown): Promise<Classes> {
  const classData = CreateClassesSchema.parse(data);
  const result = await createClassesInRepository(classData);

  return result[0];
}
