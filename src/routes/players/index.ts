
import { Router, Request, Response } from "express";
import {
    createPlayer,
    deletePlayerById,
    getAllPlayer,
    getPlayerById,
    updatePlayerById
} from "../../lib/player/player.service";
import {ZodError} from "zod";
import {errorFormatObject, utilsErr} from "../../utilsErr";


const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const player = await getAllPlayer();
        res.json(player);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({ message: data.message });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const playerId: number = parseInt(req.params.id);
    try {
        const player = await getPlayerById(playerId);
        if(!player){
            res.sendStatus(404);
        }
        res.json(player);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({ message: data.message });
    }
});


router.post("/", async (req: Request, res: Response) => {

    try {
        const player = await createPlayer(req.body);

        res.json(player);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({ message: data.message });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const playerId: number = parseInt(req.params.id);
    try {
        const player = await updatePlayerById(playerId ,req.body);
        res.json(player);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({ message: data.message });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const playerId: number = parseInt(req.params.id);
    try {
        const player = await deletePlayerById(playerId);
        res.json(player);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({message: data.message});
    }
});

export const playersRouter = router;