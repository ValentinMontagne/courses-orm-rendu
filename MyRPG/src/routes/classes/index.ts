import { Router, Request, Response } from "express";
import { createClasse, deleteClasse, getAllClasses } from "../../lib/classes/classes.service";
import { ZodError } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
      const classe = await getAllClasses(); 
      res.json(classe);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });


router.get("/:id", (req: Request, res: Response) => {
  res.send("Get");
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

router.put("/:id", (req: Request, res: Response) => {
  res.send("Update");
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id); 
        const classe = await deleteClasse(id); 
        res.json(classe);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export const classesRouter = router;
