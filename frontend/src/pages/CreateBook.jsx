import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleSaveBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        // alert("Book saved successfully!");
        enqueSnackbar("Book saved successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert("There was an error saving the book, please check console");
        enqueSnackbar(
          "There was an error saving the book, please check console",
          { variant: "error" }
        );
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 rounded-xl border-sky-400 w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl text-gray-500 mr-4">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl text-gray-500 mr-4">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl text-gray-500 mr-4">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 m-8 bg-sky-400" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
}
