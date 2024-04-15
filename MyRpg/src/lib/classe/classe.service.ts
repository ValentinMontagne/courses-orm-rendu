import { CreateClasseSchema, Classe } from "./classe.model";
import { createClasseInRepository, findAll, findById, deleteClasseById, updateClasseById } from "./classe.repository";

export async function createClasse(data: unknown): Promise<Classe> {
  const classeData = CreateClasseSchema.parse(data);
  const result = await createClasseInRepository(classeData);

  return result[0];
}

export async function findAllClasses(): Promise<Classe[]> {
    return findAll();
  }

export async function findClasseById(id: string){
    const classeId = parseInt(id);
    const existingClasse = await findById(classeId);
    if (!existingClasse) {
        throw new Error("Personnage non trouvé.");
      }
    return existingClasse;
}

export async function updateClasse(id: string, data: Partial<Classe>){
    const classeId = parseInt(id);
    const existingClasse = await findClasseById(id);
    if (!existingClasse) {
      throw new Error("Personnage non trouvé.");
    }
    const updatedClasse = await updateClasseById(classeId, data);
    if (!updatedClasse) {
      throw new Error("La mise à jour du personnage a échoué.");
    }
    return updatedClasse;
}

export async function deleteClasse(id: string){
    const classeId = parseInt(id);
    return deleteClasseById(classeId);
  }
  