import { defaultFilterData } from '@components/common/CustomTable/Filters/data'
import { SelectChangeEvent } from '@mui/material'
import React, { createContext, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FilterContext = createContext<any>(undefined)

const useFilterContext = () => {
  const [filterData, setFilterData] = useState(defaultFilterData)
  // const [isMore, setIsMore] = useState(false)
  // const handleClickMore = () => setIsMore(!isMore)
  const emptyFilterData = () => setFilterData(defaultFilterData)

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) {
    const { name, value } = event.target
    setFilterData({ ...filterData, [name]: value })
  }

  return { filterData, handleInputChange, setFilterData, emptyFilterData }
}

export type FilterContextType = ReturnType<typeof useFilterContext>

const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useFilterContext()
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export default FilterProvider
