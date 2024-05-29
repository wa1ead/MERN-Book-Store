import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDbUrl } from "./config.js";
import { Book } from "./models/BookModel.js";

const app = express();

//Middelware for parsing request
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome To MERN Stack World");
});

//Route for add a Book to DataBase
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return respone
        .status(400)
        .send({ message: "Please fill in all the fields" });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    respone.status(500).send({ message: error.message });
  }
});

//Routr for get all Books from DataBase
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
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
