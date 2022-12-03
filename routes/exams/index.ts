import { Router } from "express";

const examsRouter = Router();

examsRouter.get("/", (req, res) => {
  res.send("Test");
});

export { examsRouter };
