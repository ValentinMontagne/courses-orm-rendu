import { Router, Request, Response } from "express";
import {createPlayer, findAllPlayer, findIdPlayer} from "../../lib/player/player.service";
import {ZodError} from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {

    const monster = await findAllPlayer();
    if(monster.length == 0){
        res.sendStatus(404);
    }else{
        res.json(monster);
    }

});

router.get("/:id", async (req: Request, res: Response) => {

    const monster = await findIdPlayer(parseInt(req.params.id));
    if (monster.length == 0) {
        res.sendStatus(404);
    } else {
        res.json(monster);
    }

});

router.post("/", async (req: Request, res: Response) => {
    try {
        const player = await createPlayer(req.body);

        res.json(player);
    } catch (err) {
        if (err instanceof ZodError) {
            return;
        }
        console.error(err);
        res.sendStatus(500);
    }
});

router.put("/:id", (req: Request, res: Response) => {
    res.send("Update");
});

router.delete("/:id", (req: Request, res: Response) => {
    res.send("Delete");
});

export const playersRouter = router;
