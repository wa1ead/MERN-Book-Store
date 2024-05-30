import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDbUrl } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

//Middelware for parsing request
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome To MERN Stack World");
});

app.use("/books", booksRoute);

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
