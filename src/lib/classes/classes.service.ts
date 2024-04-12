import {CreateClasseSchema, Classe, UpdateClasseSchema} from "../classes/classes.model";
import {
    createClasseInRepository,
    deleteClasseByIdInteRepository,
    getAllClasseInRepository,
    getClasseByIdInRepository, updateClasseByIdInRepository
} from "./classes.repository";
import {HttpBadRequest, HttpNotFound} from "@httpx/exception";

export async function getAllClasse(): Promise<Classe[]> {
    const result = getAllClasseInRepository();
    if (!result){
        throw new HttpNotFound();
    }
    return result
}

export async function getClasseById(data: number): Promise<Classe> {
    const result = await getClasseByIdInRepository(data);
    if (!result){
        throw new HttpNotFound();
    }
    return result[0];
}

export async function createClasse(data: any): Promise<Classe> {
    const classeData = CreateClasseSchema.safeParse(data);
    if (classeData.success){
        const result = await createClasseInRepository(data);
        return result[0];
    }else {
        throw new HttpBadRequest(classeData.error);
    }
}

export async function updateClasseById(id: number, data: any){
    const classData = UpdateClasseSchema.safeParse(data);
    if (classData.success){
        const updatedClasse = await updateClasseByIdInRepository(id, data);
        if (updatedClasse.length === 0) {
            throw new HttpNotFound()
        }
        return updatedClasse[0];
    }else {
        throw new HttpBadRequest(classData.error);
    }
}

export async function deleteClasseById(id: number){
    const deleteClasse = await deleteClasseByIdInteRepository(id);
    if (deleteClasse.length === 0) {
        throw new HttpNotFound()
    }
    return deleteClasse[0];
}
