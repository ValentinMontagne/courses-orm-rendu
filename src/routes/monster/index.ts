import {Router, Request, Response, json} from "express";
import {ZodError} from "zod";
import {findAllCharacter, findIdCharacter, PutCharacter} from "../../lib/characters/character.service";
import {createClasse, deleteClasse, findAllClasse, findIdClasse} from "../../lib/classe/classes.service";
import {createMonster, deleteMonster, findAllMonster, findIdMonster} from "../../lib/monster/monster.service";
import {putMonsterRepository} from "../../lib/monster/monster.repository";

const router = Router();

router.get("/", async (req: Request, res: Response) => {

    const monster = await findAllMonster();
    if(monster.length == 0){
        res.sendStatus(404);
    }else{
        res.json(monster);
    }

});

router.get("/:id", async (req: Request, res: Response) => {

    const monster = await findIdMonster(parseInt(req.params.id));
    if (monster.length == 0) {
        res.sendStatus(404);
    } else {
        res.json(monster);
    }

});

router.post("/", async (req: Request, res: Response) => {
    try {

        const monster = await createMonster(req.body);

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

        const monster = await putMonsterRepository(req.body, parseInt(req.params.id));
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

router.delete("/:id", async (req: Request, res: Response) => {
    const classes = await deleteMonster(parseInt(req.params.id));
    if (classes.length == 0) {
        res.sendStatus(404);
    } else {
        res.json(classes);
    }

    res.send("Delete");
});

export const monsterRouter = router;
