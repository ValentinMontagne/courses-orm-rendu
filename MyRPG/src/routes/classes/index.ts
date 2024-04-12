import { Router, Request, Response } from "express";
import {
  getAllClasses,
  getClasseById,
  createClasse,
  deleteClasse,
  updateClasse,
} from "../../lib/classe/classe.service";
import { ZodError } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const classes = await getAllClasses();
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const classeId = req.params.id as unknown as number;
    const classe = await getClasseById(classeId);

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
  try {
    const classeId = parseInt(req.params.id);
    const updatedClasseData = req.body;

    await updateClasse(classeId, updatedClasseData);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update classe.");
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const classeId = req.params.id as unknown as number;
    const classe = await deleteClasse(classeId);

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

export const classesRouter = router;
