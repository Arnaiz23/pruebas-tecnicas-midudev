import { useContext } from "react"

import booksDb from "../../books.json"
import Header from "./components/Header"
import { FilterContext } from "./context/FilterContext"

function App() {
  const { filters } = useContext(FilterContext)

  const filterBooks = (booksDb, genre, pages) => {
    return booksDb.library.filter(({ book }) => {
      return book.pages >= pages && (genre === "all" || book.genre === genre)
    })
  }

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
