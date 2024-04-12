import { Router, Request, Response } from "express";
import { createPlayer, deletePlayer, getPlayers } from "../../lib/player/player.service";
import { ZodError, number } from "zod";
import { createCharacter, deleteCharacter, getCharacterById, getCharacters } from "../../lib/character/character.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try{
        const characters = await getCharacters();
        res.json(characters);
    }catch(err){
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

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id
  try {
      const character = await getCharacterById(parseInt(id));
      if(character == null){
        res.status(404).json({"message":"not found"})
      }
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

router.post("/", (req: Request, res: Response) => {
  res.send("Create");
});

router.put("/:id", (req: Request, res: Response) => {
  res.send("Update");
});

router.delete("/:id",async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const character = await deleteCharacter(parseInt(id));
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
