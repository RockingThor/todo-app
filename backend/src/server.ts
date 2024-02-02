import express, { Request, Response } from "express";

const app = express();

const PORT = 1337;

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
