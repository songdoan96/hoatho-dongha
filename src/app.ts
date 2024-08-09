import cors from "cors";
import express, { Application } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { DB_DATABASE, DB_HOST, DB_PORT, JWT_EXPIRATION, LOG_FORMAT, PORT } from "./config";
import Routes from "./routes";
import ErrorMiddleware from "./middlewares/error.middleware";
import path from "path";
export default class App {
  private app: Application;
  private port: number;
  constructor() {
    this.app = express();
    this.port = Number(PORT) || 8000;
    this.connectToDB();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  async connectToDB() {
    const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
    await mongoose.connect(url).then(() => console.log("DB Connected!"));
  }
  initializeMiddlewares() {
    this.app.use(cors({ origin: "*", credentials: true }));
    this.app.use(morgan(LOG_FORMAT || "combined"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
    this.app.use(express.static("public"));
  }
  initializeRoutes() {
    new Routes(this.app);
  }
  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("NODE_ENV: " + process.env.NODE_ENV);
      console.log(`Server is running at http://localhost:${this.port}`);
    });
  }
}
