import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { createFight, getAllFights } from "../../lib/figths/fights.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
      const figths = await getAllFights(); 
      res.json(figths);
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
      const fight = await createFight(req.body);
  
      res.json(fight);
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

export const fightsRouter = router;
