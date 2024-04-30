import express, { Request, Response } from "express";
import "dotenv/config";
import { db } from "./infrastructure/db";
import { playersRouter } from "./routes/players";
import { charactersRouter } from "./routes/characters";
import { classesRouter } from "./routes/classes";
import { monstersRouter } from "./routes/monsters";
import { fightsRouter } from "./routes/fights";
import { characters, monsters } from "./infrastructure/db/schema";
import { eq } from "drizzle-orm";

const app = express();
const port = process.env.PORT || 3000;

// Adds the express JSON parser as a Middleware to parse each request.
app.use(express.json());
app.use("/players", playersRouter);
app.use("/characters", charactersRouter);
app.use("/classes", classesRouter);
app.use("/monsters", monstersRouter);
app.use("/fights", fightsRouter);

// Create route "/" and send plain text.
app.get("/", async (req: Request, res: Response) => {
  const result = await db.select().from(characters).innerJoin(monsters, eq(monsters.id, characters.id));
  console.log("Result :", result);
  res.send("Hello, TypeScript Express!");
});

// Starts the server.
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});