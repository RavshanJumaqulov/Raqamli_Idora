import { Outlet } from 'react-router-dom'
import Sidebar from '@components/Sidebar'
import { Box } from '@mui/material'
import Navbar from '@components/Navbar/Navbar'

export default function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box sx={{ width: '100%' }}>
        <Navbar />

        <Box
          className="layout-outlet-box"
          p="16px 24px"
          bgcolor="#fafafa"
          sx={{ minHeight: '100vh', width: '100%' }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
