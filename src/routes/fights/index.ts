import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { createFight, getAllFights, getFightById } from "../../lib/fight/fight.service";

const router = Router();

// Route pour récupérer tous les combats
router.get("/", async (req: Request, res: Response) => {
  try {
    const fights = await getAllFights(); 
    res.json(fights);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Route pour récupérer un combat par son identifiant
router.get("/:id", async (req: Request, res: Response) => {
  const fightId = req.params.id;
  try {
    const fight = await getFightById(fightId); 
    if (fight) {
      res.json(fight);
    } else {
      res.status(404).send("Fight not found");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Route pour créer un nouveau combat
router.post("/", async (req: Request, res: Response) => {
  try {
    const fight = await createFight(req.body); 
    res.json(fight);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json(err);
      return;
    }
    console.error(err);
    res.sendStatus(500);
  }
});

// Route pour mettre à jour un combat (non implémentée pour le moment)
router.put("/:id", (req: Request, res: Response) => {
  res.send("Update");
});

// Route pour supprimer un combat (non implémentée pour le moment)
router.delete("/:id", (req: Request, res: Response) => {
  res.send("Delete");
});

export const fightsRouter = router;
