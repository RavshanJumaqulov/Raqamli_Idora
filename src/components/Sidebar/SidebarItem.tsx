import { ArrowIcon } from '@components/icons/icons'
import { useMainContext } from '@contexts/MainProvider'
import useVisiblity from '@hooks/useVisibility'
import { Badge, Box, IconButton, Stack, Typography } from '@mui/material'
import { SidebarItemChildTypes, SidebarItemsTypes } from '@src/types/SidebarTypes'
import { Text } from '@styles/globalStyle'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function SidebarItem({ item, open }: { item: SidebarItemsTypes; open: boolean }) {
  const location = useLocation()
  const active =
    location.pathname.includes(item.key) || (location.pathname == '/' && item.key == '/home')
  const visability = useVisiblity(active)
  const navigate = useNavigate()

  const {
    state: {
      notifications: { directions },
    },
  } = useMainContext()

  return (
    <Box
      sx={{
        backgroundColor: active ? '#F6F7F8' : 'none',
        height: 'auto',
        minHeight: 44,
        borderRadius: 2,
        overflow: 'hidden',
        transition: '0.3s all',
        position: 'relative',
        '&:hover': {
          transition: '0.3s all',
          backgroundColor: '#F6F7F8',
        },
        cursor: 'pointer',
      }}
    >
      <Box
        onClick={() => (item.child ? visability.toggle() : navigate(item.link))}
        sx={{
          position: 'absolute',
          height: 44,
          width: '100%',
          zIndex: 1000,
        }}
      />
      <Stack
        key={item.label}
        direction={'row'}
        sx={{
          py: 1,
          alignItems: 'center',
          px: 1.5,
          color: 'text.secondary',
          '& svg': {
            color: active && '#00A76F',
          },
        }}
      >
        {item.icon}
        {open && (
          <Stack
            direction={'row'}
            sx={{
              width: '100%',
              pl: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
              '& svg': {
                transform: visability.visiblity ? 'rotate(180deg)' : 'rotate(0deg)',
              },
            }}
          >
            <Text
              // variant="sidebar"
              c={active ? 'var(--primary)' : '#777777'}
              sx={{ fontWeight: active ? 600 : 500 }}
            >
              {item.label}
            </Text>
            <Badge
              badgeContent={
                item.key == '/instructions/' && directions.length > 0 ? directions.length : 0
              }
              color="secondary"
              sx={{ mr: '10px' }}
            />
            {item.child && (
              <IconButton>
                <ArrowIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Stack>
        )}
      </Stack>
      {open && item.child && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: visability.visiblity ? '10px' : 0,
            pb: visability.visiblity ? 1 : 0,
          }}
        >
          {item.child?.map((el: SidebarItemChildTypes) => {
            const search: string | undefined = '?' + el.link.split('?')[1]
            const childActive = Boolean(
              location.search.includes(search) ||
                location.pathname?.includes(el?.link ? el?.link : 'none')
            )
            const filteredDirections = directions.filter((item) =>
              el.key.includes(item?.direction_type)
            )
            return (
              <Box
                key={el.label}
                component={Link}
                to={el.link}
                sx={{
                  display: 'inline-flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  transition: '0.3s all',
                  height: visability.visiblity
                    ? (location.pathname + location.search).includes(item.key) && childActive
                      ? 38
                      : 28
                    : 0,
                  overflow: 'hidden',
                  py: 0,
                  px: 6.5,
                  backgroundColor:
                    (location.pathname + location.search).includes(item.key) && childActive
                      ? '#CEECE0'
                      : 'none',
                  textDecoration: 'none',
                  borderRadius: 1,
                  WebkitTransition: '0.3s all',
                  '&:hover': {
                    backgroundColor: '#CEECE0',
                    py: 2.3,
                  },
                }}
              >
                <Typography
                  // variant="sidebar"
                  color={
                    (location.pathname + location.search).slice(1).includes(el.link)
                      ? '#00A76F'
                      : '#637381'
                  }
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  {el.label}
                  <Badge
                    badgeContent={
                      item.key == '/instructions/' && filteredDirections.length > 0
                        ? filteredDirections.length
                        : 0
                    }
                    color="secondary"
                  />
                </Typography>
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}
