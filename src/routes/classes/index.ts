import { Router, Request, Response } from "express";
import {ZodError} from "zod";
import {createClass, deleteClassById, getClassById, updateClassById} from "../../lib/class/class.service";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const result = await createClass(req.body);
        res.json(result);

    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json(err);
            return;
        }

        console.error(err);
        res.sendStatus(500);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const classId: number = parseInt(req.params.id, 10);

        const result = await getClassById(classId);

        if (!result) {
            res.status(404).json({ error: "Character not found" });
            return;
        }

        res.json(result);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const classId: number = parseInt(req.params.id, 10);
        const result = await updateClassById(classId, req.body);
        res.json(result);
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json(err);
            return;
        }

        console.error(err);
        res.sendStatus(500);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const classId: number = parseInt(req.params.id, 10);
        const result = await deleteClassById(classId);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


export const classesRouter = router;
