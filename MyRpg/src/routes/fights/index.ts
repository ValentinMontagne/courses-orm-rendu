import { Router, Request, Response } from "express";
import { createFight, findAllFights, findFightById, updateFight, deleteFight } from "../../lib/fight/fight.service";
import { ZodError } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const fights = await findAllFights(); // Utilisez la méthode findAll() de votre ORM pour récupérer tous les personnages
        res.json(fights); // Renvoyez les personnages sous forme de JSON
      } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des personnages." });
      }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const fight = await findFightById(req.params.id); // Utilisez la méthode findAll() de votre ORM pour récupérer tous les joueurs
        res.json(fight); // Renvoyez les joueurs sous forme de JSON
      } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération du personnage." });
      }
});

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

  router.patch("/:id", async (req: Request, res: Response) => {
    const fightId = req.params.id;
    const fightData = req.body;
    try {
      const updatedFight = await updateFight(fightId, fightData);
      res.json(updatedFight);
    } catch (error) {
      res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour du personnage." });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const fightId = req.params.id;
  try {
    const deletedFight = await deleteFight(fightId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression du personnage." });
  }
});

export const fightsRouter = router;