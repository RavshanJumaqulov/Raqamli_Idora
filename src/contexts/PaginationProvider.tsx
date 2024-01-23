import * as React from 'react'
import { createContext, useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PaginationContext = createContext<any>(undefined)

const usePagination = () => {
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState<number>(10)
  const [offset, setOffset] = useState<number>(0)
  const location = useLocation()

  useEffect(() => {
    setSearch('')
    setOffset(0)
  }, [location.pathname])

  return {
    state: { search, limit, offset },
    actions: {
      setSearch,
      setLimit,
      setOffset,
    },
  }
}

export type PaginationContextType = ReturnType<typeof usePagination>

export const usePaginationContext = () => useContext<PaginationContextType>(PaginationContext)

const PaginationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = usePagination()
  return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>
}

export default PaginationProvider
