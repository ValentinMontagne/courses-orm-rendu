import { Router, Request, Response } from "express";
import { createPlayer, deletePlayer, findAllPlayers, findPlayerById, updatePlayer } from "../../lib/player/player.service";
import { ZodError } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const players = await findAllPlayers(); // Utilisez la méthode findAll() de votre ORM pour récupérer tous les joueurs
        res.json(players); // Renvoyez les joueurs sous forme de JSON
      } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des joueurs." });
      }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const player = await findPlayerById(req.params.id); // Utilisez la méthode findAll() de votre ORM pour récupérer tous les joueurs
        res.json(player); // Renvoyez les joueurs sous forme de JSON
      } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération du joueur." });
      }
});

router.post("/", async (req: Request, res: Response) => {
    try {
      const player = await createPlayer(req.body);
  
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

router.patch("/:id", async (req: Request, res: Response) => {
    const playerId = req.params.id;
    const playerData = req.body;
    try {
      const updatedPlayer = await updatePlayer(playerId, playerData);
      res.json(updatedPlayer);
    } catch (error) {
      res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour du joueur." });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const playerId = req.params.id;
  try {
    const deletedPlayer = await deletePlayer(playerId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression du joueur." });
  }
});

export const playersRouter = router;
