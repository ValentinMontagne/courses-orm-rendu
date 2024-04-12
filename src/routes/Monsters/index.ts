import {Router, Request, Response} from "express";
import {ZodError} from "zod";
import {errorFormatObject, utilsErr} from "../../utilsErr";
import {
    createMonster,
    deleteMonsterById,
    getAllMonster,
    getMonsterById,
    updateMonsterById
} from "../../lib/Monsters/monster.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const player = await getAllMonster();
        res.json(player);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const monsterID: number = parseInt(req.params.id);
    try {
        const monster = await getMonsterById(monsterID);
        if (!monster) {
            res.sendStatus(404);
        }
        res.json(monster);
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

router.put("/:id", async (req: Request, res: Response) => {
    const monsterId: number = parseInt(req.params.id);
    try {
        const monster = await updateMonsterById(monsterId ,req.body);
        res.json(monster);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({ message: data.message });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const monsterId: number = parseInt(req.params.id);
    try {
        const monster = await deleteMonsterById(monsterId);
        res.json(monster);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({message: data.message});
    }
});

export const monstersRouter = router;
