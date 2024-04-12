import {CreateClassSchema, Class} from "./class.model";
import {createClassInRepository} from "./class.repository";

export async function createClass(data: unknown): Promise<Class> {
    const classData = CreateClassSchema.parse(data);
    const result = await createClassInRepository(classData);

    return result[0];
}