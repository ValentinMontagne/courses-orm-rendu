import "dotenv/config";
import express, { Request, Response } from "express";
import { db } from "./infrastructure/db";
import { characters, players } from "./infrastructure/db/schema";
import { playersRouter } from "./routes/player";
import { charactersRouter } from "./routes/character/index"

const app = express();
const port = process.env.PORT || 3000;

// Adds the express JSON parser as a Middleware to parse each request.
app.use(express.json());
app.use("/players", playersRouter);
app.use("/characters", charactersRouter);

// Starts the server.
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
