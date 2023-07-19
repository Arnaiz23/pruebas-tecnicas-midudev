import { useState, useId } from "react"

import booksDb from "../../books.json"

function App() {
  const genreId = useId()
  const genresMap = booksDb.library.map(({ book }) => book.genre)
  const genresList = [...new Set(genresMap)]

  const [genre, setGenre] = useState("all")

  const filterBooksGenre = (booksDb, genre) => {
    if (genre === "all") {
      return booksDb.library.map(book => book)
    }
    return booksDb.library.filter(({ book }) => book.genre === genre)
  }

  const booksList = filterBooksGenre(booksDb, genre)

  console.log(booksList)

  return (
    <>
      <h1 className="text-xl">Libros</h1>

      <div>
        <label htmlFor={genreId}>Filtrar por género</label>
        <select
          id={genreId}
          onChange={(e) => {
            setGenre(e.target.value)
          }}
        >
          <option value="all">Todos</option>
          {genresList.map((genre) => (
            <option value={genre} key={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
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
    </>
  )
}

export default App
