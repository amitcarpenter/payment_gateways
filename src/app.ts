import express, { Response, Application } from "express";
import { connectDB } from "./config/db";
import { configApp } from "./config/routes";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
connectDB();

console.log(path.join(__dirname, "views"))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
configApp(app);

app.get("/", (_, res: Response) => {
  res.send("Payment Intregation setup in typescript");
});

export default app;
