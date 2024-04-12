import { Router, Request, Response } from "express";
import {ZodError} from "zod";
import {
    createCharacter,
    deleteCharacterById,
    getCharacterById,
    updateCharacterById
} from "../../lib/character/character.service";
import {db} from "../../infrastructure/db";
import {characters} from "../../infrastructure/db/schema";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const result = await db
            .select()
            .from(characters)
            .execute();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const characterId: number = parseInt(req.params.id, 10);

        const character = await getCharacterById(characterId);

        if (!character) {
            res.status(404).json({ error: "Character not found" });
            return;
        }

        res.json(character);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const characterId: number = parseInt(req.params.id, 10);
        const character = await deleteCharacterById(characterId);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


router.post("/", async (req: Request, res: Response) => {
    try {
        const character = await createCharacter(req.body);
        res.json(character);

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
    try {
        const characterId: number = parseInt(req.params.id, 10);
        const character = await updateCharacterById(characterId, req.body);
        res.json(character);
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json(err);
            return;
        }

        console.error(err);
        res.sendStatus(500);
    }
});

export const charactersRouter = router;
