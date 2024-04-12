import { Router, Request, Response } from "express";
import {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  deleteCharacter,
  updateCharacter,
} from "../../lib/character/character.service";
import { ZodError } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const characters = await getAllCharacters();
    res.json(characters);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const characterId = req.params.id as unknown as number;
    const character = await getCharacterById(characterId);
    
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

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const characterId = parseInt(req.params.id);
    const updatedCharacterData = req.body;

    await updateCharacter(characterId, updatedCharacterData);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update character.");
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const characterId = req.params.id as unknown as number;
    const character = await deleteCharacter(characterId);

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


export const charactersRouter = router;
