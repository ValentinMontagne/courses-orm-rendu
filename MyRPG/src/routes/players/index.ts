import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { getPlayers, createPlayer } from "../../lib/player/player.service";

export const playersRouter = Router();

playersRouter.get("/", async (req: Request, res: Response) => {
  const result = await getPlayers();
  res.json(result);
});

playersRouter.get("/:id", (req: Request, res: Response) => {
  res.send("Get");
});

playersRouter.post("/", async (req: Request, res: Response) => {
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

playersRouter.put("/:id", (req: Request, res: Response) => {
  res.send("Update");
});

playersRouter.delete("/:id", (req: Request, res: Response) => {
  res.send("Delete");
});
