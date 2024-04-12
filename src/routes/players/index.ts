import { Router, Request, Response } from "express";
import {createPlayer, deletePlayerById, getPlayerById, updatePlayerById} from "../../lib/player/player.service";
import {ZodError} from "zod";
import {players} from "../../infrastructure/db/schema";
import {db} from "../../infrastructure/db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const result = await db
            .select()
            .from(players)
            .execute();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const characterId: number = parseInt(req.params.id, 10);

        const character = await getPlayerById(characterId);

        if (!character) {
            res.status(404).json({error: "Character not found"});
            return;
        }

        res.json(character);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const playerId: number = parseInt(req.params.id, 10);
        const player = await updatePlayerById(playerId, req.body);
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

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const playerId: number = parseInt(req.params.id, 10);
        const player = await deletePlayerById(playerId);
        res.sendStatus(200);
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

export const playersRouter = router;
