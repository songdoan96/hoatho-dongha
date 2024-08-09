import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";

const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Trang truy cập không tồn tại";
    res.status(status).json({ status, message });
  } catch (error) {
    next(error);
  }
};
export default ErrorMiddleware;
