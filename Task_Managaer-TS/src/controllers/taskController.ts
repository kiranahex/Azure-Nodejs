import { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import taskSchema from "../helpers/taskValidation";
import TaskModel from "../models/taskModel";

//Get all the tasks
const getAllTasks = async (req: Request, res: Response) => {
  const getTasks = await TaskModel.find();
  try {
    if (!getTasks) {
      res.status(200).json({ msg: "No Tasks are found ..!" });
    }
    res.status(200).json({
      getTasks,
    });
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

//Create a single task
const createTasks = async (req: Request, res: Response) => {
  try {
    const validData = await taskSchema.validateAsync(req.body);
    const task = new TaskModel(validData);
    const result = await task.save();
    res.status(200).json({ result });
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

//Get a single task by ID
const getTaskById = async (req: Request, res: Response) => {
  try {
    // let params: any = req.params;
    const _id = req.params.id;
    console.log(_id);
    const taskById = await TaskModel.findById(_id);
    console.log(taskById);
    if (!taskById) {
      res.json({
        msg: ` No such ${_id} is found`,
      });
    } else {
      res.json({
        data: taskById,
      });
    }
  } catch (error: any) {
    res.json(error.message);
  }
};

//Deleting a Task
const deleteTaskById = async (req: Request, res: Response) => {
  try {
    // let params: any = req.params;
    const _id = req.params.id;
    console.log(_id);
    const taskById = await TaskModel.findByIdAndDelete(_id);
    console.log(taskById);
    if (!taskById) {
      res.json({
        msg: ` No such ${_id} is found`,
      });
    } else {
      res.json({
        data: taskById,
        msg: "Deleted successfully",
      });
    }
  } catch (error: any) {
    res.json(error.message);
  }
};

//Updating a Task
const updateTaskById = async (req: Request, res: Response) => {
  try {
    // let params: any = req.params;
    const validData = await taskSchema.validateAsync(req.body);
    const _id = req.params.id;
    const taskById = await TaskModel.findByIdAndUpdate(_id, validData);
    console.log(taskById);
    if (!taskById) {
      res.json({
        msg: ` No such ${_id} is found`,
      });
    } else {
      res.json({
        data: taskById,
        msg: "Updated successfully",
      });
    }
  } catch (error: any) {
    res.json(error.message);
  }
};

export default {
  getAllTasks,
  createTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
};
