import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { WelcomeModel } from "../models/welcomes.model";
import path from "path";
import fs from "fs";
import { ScheduleModel } from "../models/schedules.model";
class AuthController {
  async getImages(req: Request, res: Response, next: NextFunction) {
    const images = await WelcomeModel.find();
    return res.json({ images });
  }
  async upload(req: any, res: Response, next: NextFunction) {
    if (req.file.path) {
      await WelcomeModel.create({ image: req.file.filename });
    }
    return res.json({ message: "Upload thành công" });
  }
  async changeActive(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const welcome = await WelcomeModel.findById(id);
    if (welcome) {
      welcome.active = !welcome.active;
      welcome.save();
      return res.json({ message: "Đã thay đổi trạng thái" });
    }
  }
  async deleteImage(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const welcome = await WelcomeModel.findById(id);
    if (welcome) {
      fs.unlink("./public/images/" + welcome.image, async (err) => {
        if (err) throw err;
        await welcome.deleteOne();
        return res.json({ message: "Xóa ảnh thành công" });
      });
    }
  }
  async getSchedule(req: Request, res: Response, next: NextFunction) {
    const schedules = await ScheduleModel.find();
    return res.json({ schedules });
  }
  async createSchedule(req: Request, res: Response, next: NextFunction) {
    const schedule = await ScheduleModel.create(req.body);
    return res.json({ schedule, message: "Thêm lịch thành công" });
  }
  async deleteSchedule(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    await ScheduleModel.findByIdAndDelete(id);
    return res.json({ message: "Xóa lịch thành công" });
  }
}
export default new AuthController();
