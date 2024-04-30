import express, { Request, Response } from "express";
import "dotenv/config";
import { db } from "./infrastructure/db";
import { players } from "./infrastructure/db/schema";
import { playerRouter } from "./routes/players";
import { classeRouter } from "./routes/classes";
import { characterRouter } from "./routes/character";


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/players", playerRouter);
app.use("/classes", classeRouter);
app.use("/characters", characterRouter);

app.get("/", async (req: Request, res: Response) => {
    const result = await db
    .insert(players)
    .values({
        email: "dimitri.perreaux@gmail.com",
        name: "Dimitri PERREAUX",
    })
    .returning();
    console.log("Result: ", result);
    res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});

