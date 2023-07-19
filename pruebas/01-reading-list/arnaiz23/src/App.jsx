import booksDb from "../../books.json"
import Header from "./components/Header"
import { useFilter } from "./hooks/useFilter"

function App() {
  const {filters, filterBooks} = useFilter()

  const booksList = filterBooks(booksDb, filters.genre, filters.pages)

  return (
    <div className="bg-gray-800 text-white h-screen">
      <Header booksDb={booksDb} booksList={booksList} />

      <main>
        <div className="w-9/12 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-3 m-auto">
          {booksList.map(({ book }) => (
            <img
              alt={`Cover of ${book.title}`}
              src={book.cover}
              key={book.ISBN}
              className="w-56 h-auto"
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
