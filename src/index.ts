import express, { Request, Response } from "express";
import "dotenv/config";
import { playersRouter } from "./routes/players/index";
import { charactersRouter } from "./routes/characters/index";
import { classesRouter } from "./routes/classes/index";
import { monstersRouter } from "./routes/monsters/index";
import { fightersRouter } from "./routes/fighters/index";
import { db } from "./infrastructure/db/index";
import { players } from "./infrastructure/db/schema";
import { characters } from "./infrastructure/db/schema";
import { classes } from "./infrastructure/db/schema";
import { monsters } from "./infrastructure/db/schema";
import { fighters } from "./infrastructure/db/schema";

const app = express();
const port = process.env.PORT || 3100;

app.use(express.json());
app.use("/players", playersRouter);
app.use("/characters", charactersRouter);
app.use("/classes", classesRouter);
app.use("/monsters", monstersRouter);
app.use("/fighters", fightersRouter);


app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript Express!");
});


app.get("/", async (req: Request, res: Response) => {
    const result = await db
        .insert(players)
        .values({
            email: "valentin.montagne@gmail.com",
            name: "Valentin Montagne",
        })
        .returning();
    console.log("Result :", result);
    res.send("Players !");
});

app.get("/", async (req: Request, res: Response) => {
    const result = await db
        .insert(characters)
        .values({
            name: "Character1",
            xp: 10,
        })
        .returning();
    console.log("Result :", result);
    res.send("Characters !")
})

app.get("/", async (req: Request, res: Response) => {
    const result = await db
        .insert(classes)
        .values({
            name: "Fighter",
            power: 10,
            hp: 100,
        })
        .returning();
    console.log("Result :", result);
    res.send("Classes !")
})

app.get("/", async (req: Request, res: Response) => {
    const result = await db
        .insert(monsters)
        .values({
            name: "Goblin",
            power: 20,
            hp: 100,
        })
        .returning();
    console.log("Result :", result);
    res.send("Classes !")
})

app.get("/", async (req: Request, res: Response) => {
    const result = await db
        .insert(fighters)
        .values({
            currentTurn: '',
            turn: 10,
            charactersHP: ,
            monstersHP: ,
            playerActions: ,
            monsterActions: ,
            status: ,
        })
        .returning();
    console.log("Result :", result);
    res.send("Fighters !")
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


