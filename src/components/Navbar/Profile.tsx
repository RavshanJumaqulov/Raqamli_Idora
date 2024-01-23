import { useContext, useState } from 'react'
import {
  Tooltip,
  IconButton,
  Avatar,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@mui/material'
import { KeyboardArrowDown, Logout, Settings } from '@mui/icons-material'
import { FlexWrapper } from '@components/common/Flex'
import { MainContext, MainContextType } from '@contexts/MainProvider'
import { Link } from 'react-router-dom'
import { getUser } from '@utils/helper'

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const {
    actions: { logout },
  } = useContext<MainContextType>(MainContext)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  let user = getUser()

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '8px',
            p: '8px',
            border: {
              xs: 'none',
              lg: "'1px solid #D3DDEB'",
            },
          }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar alt="profile" />
          <FlexWrapper gap="8px" sx={{ display: { xs: 'none', lg: 'flex' } }}>
            <Stack>
              <Typography sx={{ color: 'text.black1', fontWeight: '700' }}>
                {user?.first_name} {user?.last_name} {!user?.first_name && user?.username}
              </Typography>
              <Typography sx={{ color: 'text.getUserrey1', fontWeight: 500, fontSize: 14 }}>
                {/* {user.email || "Email kiritishingizni so'raymiz."} */}
              </Typography>
            </Stack>
            <KeyboardArrowDown />
          </FlexWrapper>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to="/profile" style={{ textDecoration: 'none', color: '#000' }}>
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
        </Link>
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Sozlamalar
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Tizimdan chiqish
        </MenuItem>
      </Menu>
    </>
  )
}
