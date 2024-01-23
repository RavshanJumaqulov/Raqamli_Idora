import * as React from 'react'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Link } from 'react-router-dom'
import bigLogo from '@assets/images/logo/Logotip.svg'
// import logo from '@assets/images/logo/Logo.svg'
import { IconButton } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { adminSideBarItems } from './adminSidebarItems'
import { SidebarItemsTypes } from '@src/types/SidebarTypes'
import SidebarItem from './SidebarItem'
import { imomSideBarItems } from './imomSidebaritems'
import { UserInterface } from '@src/types/userTypes'
import { homePageUrl } from '@utils/helper'
import { districtSideBarItems } from './districtSidebarItems'
import { FlexWrapper } from '@components/common/Flex'
import { Text } from '@styles/globalStyle'

export default function Sidebar() {
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const user: UserInterface | null = JSON.parse(window.localStorage.getItem('user'))

  const handleDrawerClose = () => {
    setOpen(false)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          borderRight: '1px solid #D3DDEB',
        }}
        variant="permanent"
        open={open}
        onMouseEnter={handleDrawerOpen}
        PaperProps={{
          sx: {
            width: `${open ? '290px' : '80px'} !important`,
            px: `${open ? 0 : '11px'} !important`,
          },
        }}
      >
        <Box sx={{ px: '8%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: '24px' }}>
            <ListItem disablePadding sx={{ display: 'flex', gap: '10px' }}>
              <ListItemButton
                component={Link}
                to={homePageUrl}
                sx={{
                  minHeight: 40,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: '8px',
                  cursor: 'default',
                  '&:hover': {
                    background: 'none',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? '10px' : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {open ? (
                    <FlexWrapper gap="10px">
                      <img src={bigLogo} style={{ height: '40px' }} alt="logo" />
                      <Text fs="20px" fw="500">
                        {
                          ['Bosh idora', 'Viloyat idorasi', 'Tuman idorasi', 'Imom', 'Noib'][
                            +user?.role - 1
                          ]
                        }
                      </Text>
                    </FlexWrapper>
                  ) : (
                    <img src={bigLogo} style={{ height: '40px' }} alt="logo" />
                  )}
                </ListItemIcon>

                {/* <ListItemText
                  primary="Logo"
                  sx={{
                    display: open ? 'block' : 'none',
                    '& span': {
                      fontSize: 24,
                      fontWeight: 700,
                    },
                  }}
                /> */}
              </ListItemButton>

              <IconButton
                onClick={handleDrawerClose}
                sx={{
                  display: open ? 'inline-flex' : 'none',
                  border: '1px solid #F1F2F4',
                  ':hover': {
                    border: 'none',
                  },
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </ListItem>
          </Box>

          <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {user?.role == '1'
              ? adminSideBarItems.map((item: SidebarItemsTypes) => (
                  <SidebarItem key={item.label} item={item} open={open} />
                ))
              : ['2', '3'].includes(user.role)
                ? districtSideBarItems.map((item: SidebarItemsTypes) => (
                    <SidebarItem key={item.label} item={item} open={open} />
                  ))
                : imomSideBarItems.map((item: SidebarItemsTypes) => (
                    <SidebarItem key={item.label} item={item} open={open} />
                  ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}

const drawerWidth = 288

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
)
