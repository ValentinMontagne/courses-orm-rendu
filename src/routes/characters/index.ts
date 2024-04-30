import {Router, Request, Response, json} from "express";
import {createPlayer} from "../../lib/player/player.service";
import {ZodError} from "zod";
import {createCharacter, findAllCharacter, findIdCharacter, PutCharacter} from "../../lib/characters/character.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {

    const characters = await findAllCharacter();
    if(characters.length == 0){
        res.sendStatus(404);
    }else{
        res.json(characters);
    }

});

router.get("/:id", async (req: Request, res: Response) => {

    const characters = await findIdCharacter(parseInt(req.params.id));
    if (characters.length == 0) {
        res.sendStatus(404);
    } else {
        res.json(characters);
    }

});

router.post("/", async (req: Request, res: Response) => {
    try {

        const character = await createCharacter(req.body);

        res.json(character);
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

        const character = await PutCharacter(req.body, parseInt(req.params.id));
        res.json(character);

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

export const characterRouter = router;
