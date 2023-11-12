import { Schema, Document, model } from "mongoose";

interface iTask {
  task: {};
}

interface iTaskData extends iTask, Document {}

const taskModel = new Schema(
  {
    task: {
      type: {},
    },
  },
  { timestamps: true }
);

export default model<iTaskData>("tasks", taskModel);
