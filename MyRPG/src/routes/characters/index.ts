import { ZodError } from "zod";
import { createCharacter, getCharacters } from "../../lib/characters/character.service";
import { Request, Response, Router } from "express";

export const charactersRouter = Router();

charactersRouter.post("/", async (req: Request, res: Response) => {
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

charactersRouter.get("/", async (req: Request, res: Response) => {
    const result = await getCharacters();
    res.json(result);
  });