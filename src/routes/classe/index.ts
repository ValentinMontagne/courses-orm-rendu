import {Router, Request, Response, json} from "express";
import {ZodError} from "zod";
import {findAllCharacter, findIdCharacter} from "../../lib/characters/character.service";
import {createClasse, deleteClasse, findAllClasse, findIdClasse} from "../../lib/classe/classes.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {

    const classes = await findAllClasse();
    if(classes.length == 0){
        res.sendStatus(404);
    }else{
        res.json(classes);
    }

});

router.get("/:id", async (req: Request, res: Response) => {

    const classes = await findIdClasse(parseInt(req.params.id));
    if (classes.length == 0) {
        res.sendStatus(404);
    } else {
        res.json(classes);
    }

});

router.post("/", async (req: Request, res: Response) => {
    try {

        const classe = await createClasse(req.body);

        res.json(classe);
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json(err)
            return;
        }
        console.error(err);
        res.sendStatus(500);
    }
});

router.put("/:id", (req: Request, res: Response) => {
    res.send("Update");
});

router.delete("/:id", async (req: Request, res: Response) => {

    const classes = await deleteClasse(parseInt(req.params.id));
    if (classes.length == 0) {
        res.sendStatus(404);
    } else {
        res.json(classes);
    }

    res.send("Delete");
});

export const classeRouter = router;
