import express, { Request, Response } from "express";
import "dotenv/config";
import {players} from "./infrastructure/db/schema";
import {db} from "./infrastructure/db";
import {playersRouter} from "./routes/players";

const app = express();
const port = process.env.PORT || 3000;

// Adds the express JSON parser as a Middleware to parse each request.
app.use(express.json());
app.use("/players", playersRouter);

// Create route "/" and send plain text.
app.get("/", async (req: Request, res: Response) => {
    const result = await db.insert(players).values({
        email: "pavy.martin@gmail.com",
        name: "Martin Pavy",
    }).returning();
    console.log("Result :", result);
    res.send("Hello, TypeScript Express!");
});

// Starts the server.
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
