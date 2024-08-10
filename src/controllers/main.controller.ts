import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { WelcomeModel } from "../models/welcomes.model";
import { ScheduleModel } from "../models/schedules.model";
class MainController {
  async welcome(req: Request, res: Response, next: NextFunction) {
    const images = await WelcomeModel.find({ active: true }).select("image");
    return res.json({ images });
  }
  async schedules(req: Request, res: Response, next: NextFunction) {
    const schedules = await ScheduleModel.find({ done: false });
    return res.json({ schedules });
  }
}
export default new MainController();
