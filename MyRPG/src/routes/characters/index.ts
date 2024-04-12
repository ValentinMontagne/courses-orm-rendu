import { Router, Request, Response } from "express";
import { createCharacter} from "../../lib/character/character.service";
import { ZodError } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    res.send("Route des personnages");
});

router.get("/:id", async (req: Request, res: Response) => {
});


router.post("/", async (req: Request, res: Response) => {
  try {
    const character = await createCharacter(req.body);
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

router.put("/:id", async (req: Request, res: Response) => {

});

router.delete("/:id", async (req: Request, res: Response) => {
  
});

export const charactersRouter = router;
