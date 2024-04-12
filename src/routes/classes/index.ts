import {Router, Request, Response} from "express";
import {ZodError} from "zod";
import {
    createClasse,
    deleteClasseById,
    getAllClasse,
    getClasseById,
    updateClasseById
} from "../../lib/classes/classes.service";
import {errorFormatObject, utilsErr} from "../../utilsErr";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const player = await getAllClasse();
        res.json(player);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const classeID: number = parseInt(req.params.id);
    try {
        const classe = await getClasseById(classeID);
        if (!classe) {
            res.sendStatus(404);
        }
        res.json(classe);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


router.post("/", async (req: Request, res: Response) => {
    try {
        const classe = await createClasse(req.body);

        res.json(classe);
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
    const classeId: number = parseInt(req.params.id);
    try {
        const classe = await updateClasseById(classeId ,req.body);
        res.json(classe);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({ message: data.message });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const classeId: number = parseInt(req.params.id);
    try {
        const classe = await deleteClasseById(classeId);
        res.json(classe);
    } catch (err) {
        const data: errorFormatObject = utilsErr(err)
        res.status(data.code).json({message: data.message});
    }
});

export const classesRouter = router;