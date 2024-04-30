	
import { Router, Request, Response } from "express";
import { createPlayer, getAllPlayer, getPlayerById } from "../../lib/player/player.service";
import { ZodError } from "zod";
 
const router = Router();
 
router.get("/", async (req: Request, res: Response) => {
    try {
        const players = await getAllPlayer(); 
        res.json(players);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
});
 
router.get("/:id", async (req: Request, res: Response) => {
    const playerId = req.params.id;
  try {
    const character = await getPlayerById(playerId); 
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
      const player = await createPlayer(req.body);
   
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
 
router.put("/:id", (req: Request, res: Response) => {
  res.send("Update");
});
 
router.delete("/:id", (req: Request, res: Response) => {
  res.send("Delete");
});
 
export const playersRouter = router;