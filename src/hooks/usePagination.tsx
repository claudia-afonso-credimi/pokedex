import { PaginationData, PageContext } from '../types/types'

/**
 * Returns an object with pagination values, like prevPage and nextPage pages
 * @param {data} Gatsby page object with page context information
 */

export const usePagination = (data: PageContext): PaginationData => {
  const { currentPage, numPages } = data
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return { isFirst, isLast, prevPage, nextPage }
}
