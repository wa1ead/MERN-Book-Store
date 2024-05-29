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

//Route for get all Books from DataBase
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//Route for get a Book from Database by Id
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//Route for update a Book
app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send({ message: "Please fill in all the fields" });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//Route for delete a Book from DataBase
app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book Deleted Successfully" });
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
