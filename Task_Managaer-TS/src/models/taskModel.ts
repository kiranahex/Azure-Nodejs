import mongoose, { Document, Schema } from "mongoose";
export interface Task {
  name: string;
  completed: boolean;
}

export interface TaskModel extends Task, Document {}

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<TaskModel>("Tasks", taskSchema);
