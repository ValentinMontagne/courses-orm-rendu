import { Router, Request, Response } from "express";
import { createMonster,getAllMonsters } from "../../lib/monsters/monsters.service";
import { ZodError } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
      const monsters = await getAllMonsters(); 
      res.json(monsters);
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
      const monster = await createMonster(req.body);
  
      res.json(monster);
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

export const monstersRouter = router;
