import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import {
  createCharacter,
  getCharacters,
} from "../lib/characters/character.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/:id", (req: Request, res: Response) => {
  res.send("Get");
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const character = await createCharacter(req.body);

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
