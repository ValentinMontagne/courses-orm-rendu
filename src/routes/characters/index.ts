import { Router, Request, Response } from "express";
import { createCharacter } from "../../lib/characters/character.service";
import { ZodError, number } from "zod";
import { getCharacterAndClasse } from "../../lib/characters/character.repository";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Find");
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const characterClass = await getCharacterAndClasse(Number(req.params.id));
    
    res.send(characterClass);
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
      const characters = await createCharacter(req.body);
  
      res.json(characters);
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
