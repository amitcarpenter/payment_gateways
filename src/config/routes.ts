import express, { Application } from "express";
import bodyParser from "body-parser";
import router from "../routes/paymentRoutes";

export const configApp = async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api/payments", router);
};
