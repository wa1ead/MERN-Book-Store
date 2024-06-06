import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

export default function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        alert("Book deleted successfully");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("There was an error deleting the book, please check console");
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-xl bg-sky-400 w-[600px] mx-auto p-8">
        <h3 className="text-2xl">Are you sure you want to delete this Book?</h3>
        <button className="bg-red-600 text-white p-4 m-8 w-full">
          Yes, Delete it
        </button>
      </div>
    </div>
  );
}
