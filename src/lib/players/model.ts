// Importation du schéma des joueurs depuis le fichier 'schema' situé dans le répertoire 'infrastructure/db' 
// Il est probable que 'players' représente le schéma ou le modèle des joueurs dans la base de données
import { players } from "../../infrastructure/db/schema";

// Importation de Zod, une bibliothèque de validation des schémas en TypeScript
import { z } from "zod";

// Définition du schéma pour un joueur à l'aide de Zod
export const PlayerSchema = z.object({
  // Définition des propriétés du joueur avec leurs contraintes de validation
  id: z.number(),                // L'identifiant du joueur est un nombre
  email: z.string().email(),     // L'email du joueur est une chaîne de caractères au format email valide
  name: z.string().min(2),       // Le nom du joueur est une chaîne de caractères d'au moins 2 caractères
});

// Définition du type Player en utilisant le mécanisme $inferSelect fourni par Zod pour inférer le type à partir du schéma 'players'
export type Player = typeof players.$inferSelect;

// Création d'un schéma pour la création d'un joueur en excluant la propriété 'id' du schéma original
export const CreatePlayerSchema = PlayerSchema.omit({ id: true });

// Définition du type CreatePlayer en inférant le type à partir du schéma 'CreatePlayerSchema'
export type CreatePlayer = z.infer<typeof CreatePlayerSchema>;
