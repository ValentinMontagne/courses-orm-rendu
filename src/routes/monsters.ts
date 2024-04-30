import { Router } from "express";
import { createMonster } from "../lib/mosters/monster.service";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const result = await createMonster(data);

        res.json(result);

    } catch (error) {
        return res.status(400).json(error);
    }
});


export const monsterRouter = router;