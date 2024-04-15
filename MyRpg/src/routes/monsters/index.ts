import { Router, Request, Response } from "express";
import { createMonster, findAllMonsters, findMonsterById, updateMonster, deleteMonster } from "../../lib/monster/monster.service";
import { ZodError } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const monsters = await findAllMonsters(); // Utilisez la méthode findAll() de votre ORM pour récupérer tous les personnages
        res.json(monsters); // Renvoyez les personnages sous forme de JSON
      } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des monsters." });
      }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const monster = await findMonsterById(req.params.id); // Utilisez la méthode findAll() de votre ORM pour récupérer tous les joueurs
        res.json(monster); // Renvoyez les joueurs sous forme de JSON
      } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de la monster." });
      }
});

router.post("/", async (req: Request, res: Response) => {
    try {
      const monster = await createMonster(req.body);
  
      res.json(monster);
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
    const monsterId = req.params.id;
    const monsterData = req.body;
    try {
      const updatedMonster = await updateMonster(monsterId, monsterData);
      res.json(updatedMonster);
    } catch (error) {
      res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour de la monster." });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const monsterId = req.params.id;
  try {
    const deletedMonster = await deleteMonster(monsterId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression de la monster." });
  }
});

export const monstersRouter = router;