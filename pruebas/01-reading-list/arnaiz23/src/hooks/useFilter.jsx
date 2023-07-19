import { useContext } from "react"

import { FilterContext } from "../context/FilterContext"

export const useFilter = () => {
  const { filters } = useContext(FilterContext)

  const filterBooks = (booksDb, genre, pages) => {
    return booksDb.library.filter(({ book }) => {
      return book.pages >= pages && (genre === "all" || book.genre === genre)
    })
  }

  return {
    filterBooks,
    filters,
  }
}
