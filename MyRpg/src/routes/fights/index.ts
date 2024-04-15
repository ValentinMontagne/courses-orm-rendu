import {Router, Request, Response} from "express";
import {ZodError} from "zod";

import {errorFormatObject, utilsErr} from "../../utilsErr";
import {
    attackFightById,
    createFight,
    deleteFightById,
    getAllFight,
    getFightById,
    updateFightById
} from "../../lib/fight/fight.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const fights = await getAllFight();
        res.json(fights);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const fightID: number = parseInt(req.params.id);
    try {
        const fight = await getFightById(fightID);
        if (!fight) {
            res.sendStatus(404);
        }
        res.json(fight);
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
router.put("/:id/attack", async (req: Request, res: Response) => {
    const fightID: number = parseInt(req.params.id);
    try {
        const fight = await attackFightById(fightID ,req.body);
        res.json(fight);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({ message: data.message });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const fightID: number = parseInt(req.params.id);
    try {
        const fight = await updateFightById(fightID ,req.body);
        res.json(fight);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({ message: data.message });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const fightId: number = parseInt(req.params.id);
    try {
        const fight = await deleteFightById(fightId);
        res.json(fight);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({message: data.message});
    }
});

export const fightsRouter = router;