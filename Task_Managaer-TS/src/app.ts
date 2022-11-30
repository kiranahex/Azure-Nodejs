import express from "express";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./helpers/logging";
import notFound from "./middlewares/notFound";
// import errorHandler from "./middlewares/errorHandler";
import helmet from "helmet";
import path from "path";
import taskRouter from "./routes/taskRouter";

const app = express();

//connecting to Database
mongoose
  .connect(config.mongo.MONGO_URI)
  .then(() => {
    Logging.info("Database is connected");
    startServer();
  })
  .catch((error) => {
    Logging.error("db connection is required");
    Logging.error(error);
  });

// only start the server if DB connects
const startServer = () => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    //log the request
    Logging.info(
      `Incoming -> Method:[${req.method}] -url:[${req.url}] - IP:[${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      //log the response
      Logging.info(
        `Incoming -> Method:[${req.method}] -url:[${req.url}] - IP:[${req.socket.remoteAddress}] -status:[${res.statusCode}]`
      );
    });

    next();
  });
  //Middlwares
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //routes
  app.use("/api/v1/", taskRouter);

  app.use(notFound);

  app.listen(config.server.PORT_NUMBER, () => {
    Logging.info(`server is running on ${config.server.PORT_NUMBER}`);
  });
};
