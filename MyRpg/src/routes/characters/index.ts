import { Router, Request, Response } from "express";
import { createCharacter, findAllCharacters, findCharacterById, updateCharacter, deleteCharacter } from "../../lib/character/character.service";
import { ZodError } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const characters = await findAllCharacters(); // Utilisez la méthode findAll() de votre ORM pour récupérer tous les personnages
        res.json(characters); // Renvoyez les personnages sous forme de JSON
      } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des personnages." });
      }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const character = await findCharacterById(req.params.id); // Utilisez la méthode findAll() de votre ORM pour récupérer tous les joueurs
        res.json(character); // Renvoyez les joueurs sous forme de JSON
      } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération du personnage." });
      }
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

  router.patch("/:id", async (req: Request, res: Response) => {
    const characterId = req.params.id;
    const characterData = req.body;
    try {
      const updatedCharacter = await updateCharacter(characterId, characterData);
      res.json(updatedCharacter);
    } catch (error) {
      res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour du personnage." });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const characterId = req.params.id;
  try {
    const deletedCharacter = await deleteCharacter(characterId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression du personnage." });
  }
});

export const charactersRouter = router;