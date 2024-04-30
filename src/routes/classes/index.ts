import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import {
  createClasseService,
  getAllclasses,
} from "../../lib/classe/classe.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const allClasses = await getAllclasses();
  res.json(allClasses);
});

router.get("/:id", (req: Request, res: Response) => {
  res.send("Get")
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const classe = await createClasseService(req.body);
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

router.delete("/id", (req: Request, res: Response) => {
  res.send("Delete");
});

export const classeRouter = router;
