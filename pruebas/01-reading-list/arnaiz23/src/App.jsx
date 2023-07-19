import { useState, useId } from "react"

import booksDb from "../../books.json"

function App() {
  const pagesId = useId()
  const genreId = useId()
  const genresMap = booksDb.library.map(({ book }) => book.genre)
  const genresList = [...new Set(genresMap)]

  const [genre, setGenre] = useState("all")
  const [pages, setPages] = useState(0)

  const filterBooks = (booksDb, genre, pages) => {
    // if (genre === "all") {
    //   return booksDb.library.map(book => book)
    // }
    // return booksDb.library.filter(({ book }) => book.genre === genre && book.pages >= pages)
    return booksDb.library.filter(({ book }) => {
      return book.pages >= pages && (genre === "all" || book.genre === genre)
    })
  }

  const booksList = filterBooks(booksDb, genre, pages)

  return (
    <>
      <h1 className="text-xl">Libros</h1>

      <div>
        <label htmlFor={pagesId}>Filtrar por páginas</label>
        <input
          type="range"
          id={pagesId}
          min={0}
          max={1500}
          value={pages}
          onChange={(e) => {
            setPages(e.target.value)
          }}
        />
        <span>{pages}</span>
      </div>
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
        <span>{booksList.length}</span>
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
