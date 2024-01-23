import { FlexBetween, FlexWrapper } from '@components/common/Flex'
import { Box, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { Badge, IconButton } from '@mui/material'
import { BellOutlined } from '@components/icons/icons'
import Profile from './Profile'
import { adminSideBarItems } from '@components/Sidebar/adminSidebarItems'
import { imomSideBarItems } from '@components/Sidebar/imomSidebaritems'
import { UserInterface } from '@src/types/userTypes'
import { useMainContext } from '@contexts/MainProvider'
import { Notifications } from '@components/Notifications'
import Language from './Language'
import { districtSideBarItems } from '@components/Sidebar/districtSidebarItems'

export default function Navbar() {
  const location = useLocation()
  const user: UserInterface | null = JSON.parse(window.localStorage.getItem('user'))
  const currentSidebarItem =
    user?.role === '1'
      ? adminSideBarItems.find((item) => location.pathname.includes(item.key))
      : user?.role === '2' || user?.role === '3'
        ? districtSideBarItems.find((item) => location.pathname.includes(item.key))
        : imomSideBarItems.find((item) => location.pathname.includes(item.key))

  const {
    state: { notifications, notificationOpen },
    actions: { setNotificationOpen },
  } = useMainContext()

  return (
    <FlexBetween sx={{ p: '10px 24px', borderBottom: '1px solid #D3DDEB' }}>
      <Typography
        sx={{ fontSize: { lg: 32, md: 28, xs: 24 }, fontWeight: 600, color: 'text.black' }}
      >
        {location.pathname == '/' ? 'Statistika' : currentSidebarItem?.label}
      </Typography>

      <FlexWrapper gap="16px">
        {/* <CustomTextField
          placeholder="Search..."
          InputProps={{ startAdornment: <SearchIcon /> }}
          variant="outlined"
          fullWidth
          sx={{
            input: { pl: '10px' },
          }}
        /> */}
        <Language />
        <Box
          sx={{
            position: 'relative',
            display: ['2', '3', '4']?.includes(user?.role) ? 'block' : 'none',
          }}
        >
          <IconButton
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: '1.5px solid #f5f5f5',
              display: 'grid',
              placeItems: 'center',
              mr: '8px',
            }}
            onClick={() => {
              if (!notificationOpen) {
                setNotificationOpen(true)
              }
            }}
          >
            <Badge
              sx={{
                '& span': {
                  bgcolor: 'red.primary',

                  // width: 8,
                  // height: 8,
                  color: '#fff',
                },
              }}
              variant="standard"
              badgeContent={notifications?.count}
            >
              <BellOutlined />
            </Badge>
          </IconButton>
          {['2', '3', '4']?.includes(user?.role) && <Notifications />}
        </Box>
        <Profile />
      </FlexWrapper>
    </FlexBetween>
  )
}
