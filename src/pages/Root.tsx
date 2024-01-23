import { AuthProvider } from '@contexts/AuthProvider'
import FilterProvider from '@contexts/FilterContext'
import MainProvider from '@contexts/MainProvider'
import PaginationProvider from '@contexts/PaginationProvider'
import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <MainProvider>
      <AuthProvider>
        <PaginationProvider>
          <FilterProvider>
            <Outlet />
          </FilterProvider>
        </PaginationProvider>
      </AuthProvider>
    </MainProvider>
  )
}
