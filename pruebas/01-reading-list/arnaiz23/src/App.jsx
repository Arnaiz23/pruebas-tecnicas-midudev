import booksDb from "../../books.json"

function App() {
  console.log(booksDb)

  return (
    <>
      <h1 className="text-xl">Libros</h1>

      {booksDb.library.map(({ book }) => <img alt={`Cover of ${book.title}`} src={book.cover} key={book.ISBN} />)}
    </>
  );
}

export default App;
