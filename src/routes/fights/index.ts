import {Request, Response, Router} from "express";
import {db} from "../../infrastructure/db";
import {fights, players} from "../../infrastructure/db/schema";
import {createMonster, deleteMonsterById, updateMonsterById} from "../../lib/monsters/monster.service";
import {ZodError} from "zod";
import {createFight, deleteFightById, updateFightById} from "../../lib/fight/fight.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const result = await db
            .select()
            .from(fights)
            .execute();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


router.post("/", async (req: Request, res: Response) => {
    try {
        const fight = await createFight(req.body);
        res.json(fight);

    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json(err);
            return;
        }

        console.error(err);
        res.sendStatus(500);
    }
});

router.patch("/:id", async (req: Request, res: Response) => {
    try {
        const fightId: number = parseInt(req.params.id, 10);
        const fight = await updateFightById(fightId, req.body);
        res.json(fight);
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
        const fightId: number = parseInt(req.params.id, 10);
        const fight = await deleteFightById(fightId);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export const fightsRouter = router;