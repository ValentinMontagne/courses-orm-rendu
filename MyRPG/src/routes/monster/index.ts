import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { createMonster } from "../../monster/monster.service";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Find");
});

router.get("/:id", (req: Request, res: Response) => {
  res.send("Get");
});

router.put("/:id", (req: Request, res: Response) => {
  res.send("Update");
});

router.delete("/:id", (req: Request, res: Response) => {
  res.send("Delete");
});

router.post("/", async (req: Request, res: Response) => {
    try {
      const player = await createMonster(req.body);
   
      res.json(player);
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json(err);
        return;
      }
      console.error(err);
      res.sendStatus(500);
    }
});    
export const playersRouter = router;
