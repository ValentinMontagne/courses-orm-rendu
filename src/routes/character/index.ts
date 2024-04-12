import { Router, Request, Response } from "express";
import { CreateCharacter } from "../../lib/charactere/charactere.service";
import { ZodError } from "zod";
import { characters } from "../../infrastructure/db/schema";
import { db } from "../../infrastructure/db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const result = await db.select().from(characters);

    res.json(result)
    
});

router.get("/:id", async (req: Request, res: Response) => {
    const result = await db.select().from(characters);

    res.json(result)
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const character = await CreateCharacter(req.body);

    res.json(character);
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

router.delete("/:id", (req: Request, res: Response) => {
  res.send("Delete");
});

export const charactersRouter = router;
