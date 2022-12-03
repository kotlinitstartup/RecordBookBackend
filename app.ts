import express, { Express } from "express";
import dotenv from "dotenv";
import { examsRouter } from "./routes/exams";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use("/exams", examsRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
