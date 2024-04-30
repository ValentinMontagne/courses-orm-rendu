import { Router, Request, Response} from "express";
import { createPlayer } from "../../lib/player/player.service";
import { ZodError } from "zod";
import { createClasse } from "../../lib/classe/classe.service";
import { createCharacter, getAllCharacter } from "../../lib/character/character.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const character = await getAllCharacter();
        res.json(character)
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json(err);
            return;
        }
        console.error(err);
        res.sendStatus(500);
    }
});

router.get("/:id", (req: Request, res: Response) => {
    res.send("Get")
});

router.get("/", (req: Request, res: Response) => {
    res.send("Create")
});

router.get("/:id", (req: Request, res: Response) => {
    res.send("Update")
});

router.get("/:id", (req: Request, res: Response) => {
    res.send("Delete")
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const character = await createCharacter(req.body);
        res.json(character)
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json(err);
            return;
        }
        console.error(err);
        res.sendStatus(500);
    }
})

export const characterRouter = router;