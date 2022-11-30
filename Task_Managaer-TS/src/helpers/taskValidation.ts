import joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import Logging from "./logging";
import { Task } from "../models/taskModel";

export const validateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      Logging.error(error);
      res.status(422).json({ error });
    }
  };
};

const taskSchema = joi.object<Task>({
  name: joi.string().trim().required().min(3).max(20).alphanum().uppercase(),
  completed: joi.boolean(),
});

export default taskSchema;
