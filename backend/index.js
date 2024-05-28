import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDbUrl } from "./config.js";

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome To MERN Stack World");
});

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log("App connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`App listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
