import { Application } from "express";
import { AuthRouter } from "./auth.route";
import { AdminRouter } from "./admin.route";
import { MainRouter } from "./main.route";

export default class Routes {
  constructor(app: Application) {
    app.use("/", MainRouter);
    app.use("/admin", AdminRouter);
    app.use("/auth", AuthRouter);
  }
}
