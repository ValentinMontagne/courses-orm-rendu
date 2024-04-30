import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { CreateCharacter, DeleteCharacter, GetCharacter, UpdateCharacter } from "../../lib/characters/characters.service";
import { characters } from "../../infrastructure/db/schema";
import { db } from "../../infrastructure/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const get = await GetCharacter();
    
        res.json(get);
      } catch (err) {
        if (err instanceof ZodError) {
          res.status(400).json(err);
          return;
        }
        console.error(err);
        res.sendStatus(500);
      }
});

router.get("/:id", (req: Request, res: Response) => {
  res.send("Get");
});

router.post("/", async (req: Request, res: Response) => {
    try {
      const player = await CreateCharacter(req.body);
  
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
    try{
        const update = await UpdateCharacter(req.params.id)

        res.json(update);
    }catch (err){
        if (err instanceof ZodError) {
            res.status(400).json(err);
            return;
          }
          console.error(err);
          res.sendStatus(500);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try{
        const deleteById = await DeleteCharacter(req.params.id)

        res.json(deleteById);
    }catch (err){
        if (err instanceof ZodError) {
            res.status(400).json(err);
            return;
          }
          console.error(err);
          res.sendStatus(500);
    }
});

export const charactersRouter = router;