import { Router, Request, Response } from "express";
import { createClass, deleteClassById, getAllClasses, getClassById, updateClassById } from "../../lib/class/class.service";
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
    const classId = req.params.id as unknown as number;
    const Class = await getClassById(classId);
    res.json(Class);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/", async (req: Request, res: Response) => {
    try {
      const Class = await createClass(req.body);
  
      res.json(Class);
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
      const classId = parseInt(req.params.id);
      const updatedClassData = req.body;
  
      await updateClassById(classId, updatedClassData);
  
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to update class.");
    }
  });

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const classId = parseInt(req.params.id);
    await deleteClassById(classId);

    res.sendStatus(204); 
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


export const classesRouter = router;
