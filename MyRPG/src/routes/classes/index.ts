import { Router, Request, Response } from "express";
import { ZodError, number } from "zod";
import { createClasse, deleteClasse, getClasses } from "../../lib/classes/classe.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try{
        const classes = await getClasses();
        res.json(classes);
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
      const player = await createClasse(req.body);
  
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

router.get("/:id", (req: Request, res: Response) => {
  res.send("Get");
});

router.post("/", (req: Request, res: Response) => {
  res.send("Create");
});

router.put("/:id", (req: Request, res: Response) => {
  res.send("Update");
});

router.delete("/:id",async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const player = await deleteClasse(parseInt(id));
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

export const classesRouter = router;
