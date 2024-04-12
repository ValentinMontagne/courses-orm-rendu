import { Router, Request, Response } from "express";
import {
  getAllMonsters,
  getMonsterById,
  createMonster,
  deleteMonster,
  updateMonster,
} from "../../lib/monster/monster.service";
import { ZodError } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const monsters = await getAllMonsters();
    res.json(monsters);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const monsterId = req.params.id as unknown as number;
    const monster = await getMonsterById(monsterId);

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

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const monsterId = parseInt(req.params.id);
    const updatedMonsterData = req.body;

    await updateMonster(monsterId, updatedMonsterData);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update monster.");
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const monsterId = req.params.id as unknown as number;
    const monster = await deleteMonster(monsterId);

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

export const monstersRouter = router;
