import { HttpBadRequest, HttpForbidden } from "@httpx/exception";
import { Classes, CreateClassesSchema } from "./classes.model";
import { createClassesInRepository, getClassesInRepository } from "./classes.repository";

export async function createClasses(data: unknown): Promise<Classes> {
    const classes = CreateClassesSchema.safeParse(data);

    if (!classes.success) {
        throw new HttpBadRequest(classes.error);
    }

    const result = await createClassesInRepository(classes.data);

    if (!result) {
        throw new HttpForbidden("Classes already exists");
    }

    return result[0];
}

export async function getClasses(): Promise<Classes[]> {
    return getClassesInRepository()
}