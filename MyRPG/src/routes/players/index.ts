import { Router, Request, Response } from "express";
import { createPlayer, deletePlayer, getPlayers } from "../../lib/player/player.service";
import { ZodError, number } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try{
        const players = await getPlayers();
        res.json(players);
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

router.get("/:id", (req: Request, res: Response) => {
  res.send("Get");
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
        const player = await deletePlayer(parseInt(id));
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

export const playersRouter = router;
