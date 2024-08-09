import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { WelcomeModel } from "../models/welcomes.model";
class MainController {
  async welcome(req: Request, res: Response, next: NextFunction) {
    const images = await WelcomeModel.find({ active: true }).select("image");
    return res.json({ images });
  }
}
export default new MainController();
