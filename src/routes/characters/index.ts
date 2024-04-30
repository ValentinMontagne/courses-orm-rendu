	
import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { createCharacter, deleteCharacter, getAllCharacters, getCharacterById, updateCharacterById } from "../../lib/characters/character.service";
 
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
        const id = parseInt(req.params.id); 
        const players = await updateCharacterById(id); 
        res.json(players);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const characterId = req.params.id;
  try {
    const existingCharacter = await getCharacterById(characterId);
    if (!existingCharacter) {
      return res.status(404).send("Character not found");
    }

    await deleteCharacter(characterId);
    res.sendStatus(204); // No content (success)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
 
export const characterRouter = router;