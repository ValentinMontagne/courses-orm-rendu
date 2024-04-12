import { Router, Request, Response } from "express";
import { ZodError, number } from "zod";
import { createMonster, deleteMonster, getMonsters, getMonstersById } from "../../lib/monster/monster.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try{
        const monsters = await getMonsters();
        res.json(monsters);
    }catch(err){
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

router.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const monster = await getMonstersById(parseInt(id));
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

router.delete("/:id",async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const monster = await deleteMonster(parseInt(id));
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

export const monstersRouter = router;
