import { Router } from "express";
import { createClass, getClasses } from "../lib/classes/classes.service";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const newClass = await createClass(req.body);
        res.json(newClass);
    } catch (err) {
        console.error(err);
        res.sendStatus(400).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const classes = await getClasses();
        return res.json(classes);
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
})
export const classesRouter = router;