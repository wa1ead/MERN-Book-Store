import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowBooks from "./pages/ShowBooks";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/details/:id" element={<ShowBooks />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
}
