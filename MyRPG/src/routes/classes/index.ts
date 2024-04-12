import { Router, Request, Response } from "express";
import { createClass } from "../../lib/class/class.service";
import { ZodError } from "zod";
// Tu auras besoin d'implémenter ces fonctions dans ton service de classe.

const router = Router();

// Trouver toutes les classes
router.get("/", async (req: Request, res: Response) => {
    res.send("Route des classes");
});

// Obtenir une classe par ID
router.get("/:id", async (req: Request, res: Response) => {
  // Implémente la logique pour récupérer une classe par son ID
});

// Créer une classe
router.post("/", async (req: Request, res: Response) => {
  try {
    const classInstance = await createClass(req.body);
    res.json(classInstance);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json(err);
      return;
    }
    console.error(err);
    res.sendStatus(500);
  }
});

// Mettre à jour une classe
router.put("/:id", async (req: Request, res: Response) => {
  // Implémente la logique pour mettre à jour une classe
});

// Supprimer une classe
router.delete("/:id", async (req: Request, res: Response) => {
  // Implémente la logique pour supprimer une classe
});

export const classesRouter = router;
