import { Router, Request, Response } from "express";
import { createPlayer, getAllPlayer, getPlayerById, updatePlayerById } from "../../lib/player/player.service";
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
    try {
        const id = parseInt(req.params.id); 
        const players = await getPlayerById(id); 
        res.json(players);
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

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id); 
        const players = await updatePlayerById(id); 
        res.json(players);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.delete("/:id", (req: Request, res: Response) => {
  res.send("Delete");
});

export const playersRouter = router;
