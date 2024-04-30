import express, { Request, Response } from "express";
import "dotenv/config";
import { playersRouter } from "./routes/players";
import { charactersRouter } from "./routes/characters";
import { classesRouter } from "./routes/classes";
import { monstersRouter } from "./routes/monsters";


const app = express();
const port = process.env.PORT || 3000;

// Adds the express JSON parser as a Middleware to parse each request.
app.use(express.json());
app.use("/players", playersRouter);
app.use("/characters", charactersRouter);
app.use("/classes", classesRouter);
app.use("/monsters", monstersRouter);

// Create route "/" and send plain text.
app.get("/", async (req: Request, res: Response) => {

});

// Starts the server.
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});