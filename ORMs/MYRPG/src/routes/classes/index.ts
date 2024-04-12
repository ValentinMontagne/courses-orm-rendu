import { Router, Request, Response } from "express";
import { ZodError } from "zod";

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
      const classes = await Createclasses(req.body);
   
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
export const classesRouter = router;
function Createclasses(body: any) {
    throw new Error("Function not implemented.");
}

