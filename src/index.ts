import express, { Request, Response } from "express";
import "dotenv/config";
import { db } from "./infrastructure/db";
import { players } from "./infrastructure/db/schema";
import { playersRouter } from "./routes/players";
import { classesRouter } from "./routes/classes";
import { characterRouter } from "./routes/characters";
import { monstersRouter } from "./routes/monsters";
import { fightsRouter } from "./routes/fights";

 
const app = express();
const port = process.env.PORT || 3000;
 
// Adds the express JSON parser as a Middleware to parse each request.
app.use(express.json());

	
app.use(express.json());
app.use("/players", playersRouter);
app.use("/classes", classesRouter);
app.use("/characters", characterRouter);
app.use("/monsters", monstersRouter);
app.use("/fights", fightsRouter);

 
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

	
