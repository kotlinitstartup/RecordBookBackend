import { Router } from "express";
import { models } from "../../models";

const studentsRouter = Router();

studentsRouter.get("/marks", async (req, res) => {
  const st = await models.Student?.findAll();
  console.log("req", req);
  res.json({
    firstname: "1",
  });
});

export { studentsRouter };
