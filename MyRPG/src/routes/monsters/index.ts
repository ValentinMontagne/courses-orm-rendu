import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { getMonsters, createMonster } from "../../lib/monsters/monster.service";

export const monstersRouter = Router();

monstersRouter.get("/", async (req: Request, res: Response) => {
  const result = await getMonsters();
  res.json(result);
});

monstersRouter.post("/", async (req: Request, res: Response) => {
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