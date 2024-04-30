import { Router, Request, Response } from "express";
import { createCharacter, deleteCharacter, getAllCharacters, getCharacterById, updateCharacter } from "../../lib/character/character.service";
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
    const characterId = req.params.id;
    try {
      const character = await getCharacterById(characterId); 
      if (character) {
        res.json(character);
      } else {
        res.status(404).send("Character not found");
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
 
	
router.post("/", async (req: Request, res: Response) => {
    try {
      const player = await createCharacter(req.body);
   
      res.json(player);
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
    const characterId = req.params.id;
    const newData = req.body;
    try {
      const updatedCharacter = await updateCharacter(characterId, newData);
      res.json(updatedCharacter);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json(err);
        return;
      }
      console.error(err);
      res.sendStatus(500);
    }
  });
 
  router.delete("/:id", async (req: Request, res: Response) => {
    const characterId = req.params.id;
    try {
      await deleteCharacter(characterId);
      res.sendStatus(204); // No Content
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
 
export const charactersRouter = router;