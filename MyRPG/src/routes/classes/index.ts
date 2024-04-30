import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { createClasse } from "../../lib/classes/classes.service";
import { classes } from "../../infrastructure/db/schema";
import { db } from "../../infrastructure/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    res.send("get");
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const getById = await db.select().from(classes).where(eq(classes.id, parseInt(req.params.id)));

    res.json(getById);
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
    const character = await createClasse(req.body);

    res.json(character);
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
