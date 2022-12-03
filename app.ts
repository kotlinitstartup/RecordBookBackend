import express, { Express } from "express";
import dotenv from "dotenv";
import { studentsRouter } from "./routes/students";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use("/students", studentsRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
