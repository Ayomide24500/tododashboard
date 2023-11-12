import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import task from "./router";

const URL: string = "mongodb://127.0.0.1:27017/testTaskDB";
const app: Application = express();
const port: number = 1122;

app.use(express.json());
app.use(cors());
app.use("/", task);

app.listen(port, async () => {
  await mongoose.connect(URL).then((res) => {
    console.log("Connected to DB");
  });
});
