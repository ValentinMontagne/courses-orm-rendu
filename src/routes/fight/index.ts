import {Router, Request, Response, json} from "express";
import {ZodError} from "zod";
import {findAllCharacter, findIdCharacter, PutCharacter} from "../../lib/characters/character.service";
import {createClasse, findAllClasse, findIdClasse} from "../../lib/classe/classes.service";
import {createMonster, findAllMonster, findIdMonster} from "../../lib/monster/monster.service";
import {putMonsterRepository} from "../../lib/monster/monster.repository";
import {createFight, findAllFight, findIdFight, putFight} from "../../lib/fight/fight.service";
import {putFightRepository} from "../../lib/fight/fight.repository";

const router = Router();

router.get("/", async (req: Request, res: Response) => {

    const monster = await findAllFight();
    if(monster.length == 0){
        res.sendStatus(404);
    }else{
        res.json(monster);
    }

});

router.get("/:id", async (req: Request, res: Response) => {

    const monster = await findIdFight(parseInt(req.params.id));
    if (monster.length == 0) {
        res.sendStatus(404);
    } else {
        res.json(monster);
    }

});

router.post("/", async (req: Request, res: Response) => {
    try {

        const monster = await createFight(req.body);

        res.json(monster);
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json(err)
            return;
        }
        console.error(err);
        res.sendStatus(500);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {

        const monster = await putFight(req.body, parseInt(req.params.id));
        res.json(monster);

    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json(err)
            return;
        }
        console.error(err);
        res.sendStatus(500);
    }
});

router.delete("/:id", (req: Request, res: Response) => {
    res.send("Delete");
});

export const fightRouter = router;
