import SingleBookCard from "./SingleBookCard";

export default function BooksCard({ books }) {
  return (
    <div className="grid sm:grid-col-2 lg:grid-col-3 xl:grid-col-4">
      {books.map((item) => (
        <SingleBookCard key={item._id} book={item} />
      ))}
    </div>
  );
}
