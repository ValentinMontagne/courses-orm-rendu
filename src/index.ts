import express, {Request, Response} from "express";
import "dotenv/config";
import { db } from "./infrastructure/db";
import { players } from "./infrastructure/db/schema";
import { classes } from "./infrastructure/db/schema";
import { playersRouter } from "./routes/players";
import { classesRouter } from "./routes/classes";
import { characterRouter } from "./routes/characters";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/players", playersRouter);
app.use("/classes", classesRouter);
app.use("/characters", characterRouter);
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript Express");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});