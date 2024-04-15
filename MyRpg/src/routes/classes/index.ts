import { Router, Request, Response } from "express";
import { createClasse, findAllClasses, findClasseById, updateClasse, deleteClasse } from "../../lib/classe/classe.service";
import { ZodError } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const classes = await findAllClasses(); // Utilisez la méthode findAll() de votre ORM pour récupérer tous les personnages
        res.json(classes); // Renvoyez les personnages sous forme de JSON
      } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des classes." });
      }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const classe = await findClasseById(req.params.id); // Utilisez la méthode findAll() de votre ORM pour récupérer tous les joueurs
        res.json(classe); // Renvoyez les joueurs sous forme de JSON
      } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de la classe." });
      }
});

router.post("/", async (req: Request, res: Response) => {
    try {
      const classe = await createClasse(req.body);
  
      res.json(classe);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json(err);
        return;
      }
      console.error(err);
      res.sendStatus(500);
    }
  });

  router.patch("/:id", async (req: Request, res: Response) => {
    const classeId = req.params.id;
    const classeData = req.body;
    try {
      const updatedClasse = await updateClasse(classeId, classeData);
      res.json(updatedClasse);
    } catch (error) {
      res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour de la classe." });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const classeId = req.params.id;
  try {
    const deletedClasse = await deleteClasse(classeId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression de la classe." });
  }
});

export const classesRouter = router;