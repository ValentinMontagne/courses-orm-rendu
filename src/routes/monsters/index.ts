import {Request, Response, Router} from "express";
import {db} from "../../infrastructure/db";
import {players} from "../../infrastructure/db/schema";
import {createPlayer, deletePlayerById, getPlayerById, updatePlayerById} from "../../lib/player/player.service";
import {ZodError} from "zod";
import {createMonster, deleteMonsterById, getMonsterById, updateMonsterById} from "../../lib/monsters/monster.service";


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


router.post("/", async (req: Request, res: Response) => {
    try {
        const monster = await createMonster(req.body);
        res.json(monster);

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
    try {
        const monsterId: number = parseInt(req.params.id, 10);

        const monster = await getMonsterById(monsterId);

        if (!monster) {
            res.status(404).json({error: "Monster not found"});
            return;
        }

        res.json(monster);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const monsterId: number = parseInt(req.params.id, 10);
        const monster = await deleteMonsterById(monsterId);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const monsterId: number = parseInt(req.params.id, 10);
        const monster = await updateMonsterById(monsterId, req.body);
        res.json(monster);
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json(err);
            return;
        }

        console.error(err);
        res.sendStatus(500);
    }
});

export const monstersRouter = router;