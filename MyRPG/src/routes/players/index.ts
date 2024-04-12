import { Router, Request, Response } from "express";
import {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  deletePlayer,
  updatePlayer,
} from "../../lib/player/player.service";
import { ZodError } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const players = await getAllPlayers();
    res.json(players);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const playerId = req.params.id as unknown as number;
    const player = await getPlayerById(playerId);

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
    const playerId = parseInt(req.params.id);
    const updatedPlayerData = req.body;

    await updatePlayer(playerId, updatedPlayerData);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update player.");
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const playerId = req.params.id as unknown as number;
    const player = await deletePlayer(playerId);

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
