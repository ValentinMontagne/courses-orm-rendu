import { ZodError } from "zod";
import { createClasses, getClasses } from "../../lib/classes/classes.service";
import { Request, Response, Router } from "express";

export const classesRouter = Router();


 classesRouter.post("/", async (req: Request, res: Response) => {
    try {
      const classes = await createClasses(req.body);
  
      res.json(classes);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json(err);
        return;
      }
      console.error(err);
      res.sendStatus(500);
    }
  });

classesRouter.get("/", async (req: Request, res: Response) => {
    const result = await getClasses();
    res.json(result);
  });

