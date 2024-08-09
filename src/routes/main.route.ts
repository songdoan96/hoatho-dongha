import { Router } from "express";
import MainController from "../controllers/main.controller";
import { WelcomeModel } from "../models/welcomes.model";
import fs from "fs";
const MainRouter = Router();

MainRouter.get("/", async (req, res, next) => {
  return res.send("HELLO");
});
MainRouter.get("/welcome", MainController.welcome);

export { MainRouter };
