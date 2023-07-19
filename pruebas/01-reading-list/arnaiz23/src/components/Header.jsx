import { useId, useContext } from "react"

import { FilterContext } from "../context/FilterContext"

const Header = ({ booksDb, booksList }) => {
  const { filters, setFilters } = useContext(FilterContext)

  const pagesId = useId()
  const genreId = useId()

  const genresMap = booksDb.library.map(({ book }) => book.genre)
  const genresList = [...new Set(genresMap)]

  const handlePageChange = (e) => {
    setFilters({ ...filters, pages: e.target.value })
  }

  const handleGenreChange = (e) => {
    setFilters({ ...filters, genre: e.target.value })
  }

  return (
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
              value={filters.pages}
              onChange={handlePageChange}
            />
            <span>{filters.pages}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          <label htmlFor={genreId}>Filtrar por género</label>
          <div className="flex justify-center items-center gap-2">
            <select
              id={genreId}
              onChange={handleGenreChange}
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
  )
}

export default Header
