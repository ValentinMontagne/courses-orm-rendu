import { Router, Request, Response } from "express";
import { createClass } from "../../lib/class/class.service";
import { ZodError } from "zod";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Find");
});

router.get("/:id", (req: Request, res: Response) => {
    res.send("Get");
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const newClass = await createClass(req.body);
        res.json(newClass);
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json(err);
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

export const classesRouter = router;
