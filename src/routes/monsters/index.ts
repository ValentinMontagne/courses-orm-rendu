import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { createMonsterService, getAllMonsters } from "../../lib/monstre/monster.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const allMonsters = await getAllMonsters();
  res.json(allMonsters);
});

router.get("/:id", (req: Request, res: Response) => {
  res.send("Get")
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const monster = await createMonsterService(req.body);
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

router.put("/:id", (req: Request, res: Response) => {
  res.send("Update");
});

router.delete("/id", (req: Request, res: Response) => {
  res.send("Delete");
});

export const classeRouter = router;
