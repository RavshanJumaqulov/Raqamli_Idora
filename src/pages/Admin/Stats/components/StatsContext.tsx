import { createContext, useState } from 'react'

const useStatsContext = () => {
  const [data, setData] = useState({ start_date: '', finish_date: '' })

  return { data, setData }
}

type TStatsContext = ReturnType<typeof useStatsContext>

export const StatsContext = createContext<TStatsContext>(undefined)

const StatsProvider = ({ children }) => {
  const value = useStatsContext()
  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
}

export default StatsProvider
