import "dotenv/config";
import express, { Request, Response } from "express";
import { db } from "./infrastructure/db";
import { players } from "./infrastructure/db/schema";
import { playersRouter } from "./routes/players";
import { charactersRouter } from "./routes/characters";
import { classesRouter } from "./routes/classes";
const app = express();
const port = process.env.PORT || 3000;

// Adds the express JSON parser as a Middleware to parse each request.
app.use(express.json());

// Create route "/" and send plain text.
app.get("/", async (req: Request, res: Response) => {
  const result = await db
    .insert(players)
    .values({
      email: "valentin.montagne@gmail.com",
      name: "Valentin Montagne",
    })
    .returning();
  console.log("Result :", result);
  res.send("Hello, TypeScript Express!");
});

// Starts the server.
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// Adds the express JSON parser as a Middleware to parse each request.
app.use(express.json());
app.use("/players", playersRouter);
app.use("/characters", charactersRouter);
app.use("/classes", classesRouter);