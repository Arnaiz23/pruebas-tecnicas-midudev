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
    return booksDb.library.filter(({ book }) => {
      return book.pages >= pages && (genre === "all" || book.genre === genre)
    })
  }

  const booksList = filterBooks(booksDb, genre, pages)

  return (
    <div className="bg-gray-800 text-white h-screen">
      <header className="w-full p-8 flex flex-col gap-3">
        {/* TODO: length fake because is the same always */}
        <h2 className="text-2xl">{booksDb.library.length} libros disponibles</h2>

        <div className="flex justify-start items-center gap-3">
          <div className="flex flex-col justify-center items-center gap-3">
            <label htmlFor={pagesId}>Filtrar por páginas</label>
            <div className="flex justify-center items-center gap-2">
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
          </div>

          <div className="flex flex-col justify-center items-center gap-3">
            <label htmlFor={genreId}>Filtrar por género</label>
            <div className="flex justify-center items-center gap-2">
              <select
                id={genreId}
                onChange={(e) => {
                  setGenre(e.target.value)
                }}
                className="bg-transparent border border-white p-2"
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
          </div>
        </div>
      </header>

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
    </div>
  )
}

export default App
