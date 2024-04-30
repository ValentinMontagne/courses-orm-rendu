	
import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { createFight, getAllFight, getFightById } from "../../lib/fights/fight.service";
 
const router = Router();
 
router.get("/", async (req: Request, res: Response) => {
  try {
      const fight = await getAllFight(); 
      res.json(fight);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
  const fightId = req.params.id;
try {
  const fight = await getFightById(fightId); 
  if (fight) {
    res.json(fight);
  } else {
    res.status(404).send("Fight not found");
  }
} catch (err) {
  console.error(err);
  res.sendStatus(500);
}
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