import express, { Request, Response } from "express";
import connectToDataBase from "./db";
import "dotenv/config";
import userRoutes from "../routes/user.routes";
import categoryRoutes from "../routes/category.routes";
import taskRoutes from "../routes/task.routes";

const app = express();

app.use(express.json());

const PORT = 1337;
connectToDataBase();

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
