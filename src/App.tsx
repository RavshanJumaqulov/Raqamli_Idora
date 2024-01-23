import Root from '@pages/Root'
import privateAdminRoutes from '@routes/adminRoutes'
import publicRoutes from '@routes/publicRoutes'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { UserInterface } from './types/userTypes'
import privateImamRoutes from '@routes/imamRoutes'
import { Box } from '@mui/material'
import privateDistrictRoutes from '@routes/districtRoutes'
import privateRegionRoutes from '@routes/regionRoutes'

function App() {
  const user: UserInterface = JSON.parse(window.localStorage.getItem('user'))
  const roleId = +user?.role

  // const privateRoutesArray =
  //   !!user && roleId == 1
  //     ? [...privateAdminRoutes()]
  //     : !!user && [3, 2].includes(roleId)
  //       ? [...privateDistrictRoutes()]
  //       : !!user && roleId == 4
  //         ? [...privateImamRoutes()]
  //         : []

  const privateRoutesArray = [
    privateAdminRoutes,
    privateRegionRoutes,
    privateDistrictRoutes,
    privateImamRoutes,
    privateImamRoutes,
  ][roleId - 1]?.()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [...(privateRoutesArray || []), ...publicRoutes()],
    },
  ])

  return (
    <Box
      sx={{
        '& ::-webkit-scrollbar': {
          mt: 1,
          width: 3,
          height: 10,
          transition: '0.3s all',
        },

        '& ::-webkit-scrollbar-track': {
          background: 'hsla(0,0%,100%,.1)',
        },

        '& ::-webkit-scrollbar-thumb': {
          background: '#00A76F',
          borderRadius: 2,
        },

        '& ::-webkit-scrollbar-thumb:hover': {
          background: '#00A76F',
        },
      }}
    >
      <RouterProvider router={router} />
    </Box>
  )
}

export default App
