import {Router, Request, Response} from "express";
import {
    createCharacter, deleteCharacterById,
    getAllCharacter,
    getCharacterById,
    updateCharacterById
} from "../../lib/characters/characters.service";
import {errorFormatObject, utilsErr} from "../../utilsErr";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const character = await getAllCharacter();
        res.json(character);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({ message: data.message });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const characterId: number = parseInt(req.params.id);
    try {
        const character = await getCharacterById(characterId);
        res.json(character);
    } catch (err) {

        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({ message: data.message });
    }
});


router.post("/", async (req: Request, res: Response) => {
    try {
        const character = await createCharacter(req.body);
        res.json(character);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({ message: data.message });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const characterId: number = parseInt(req.params.id);
    try {
        const character = await updateCharacterById(characterId ,req.body);
        res.json(character);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({ message: data.message });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const characterId: number = parseInt(req.params.id);
    try {
        const character = await deleteCharacterById(characterId);
        res.json(character);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({message: data.message});
    }
});

export const charactersRouter = router;