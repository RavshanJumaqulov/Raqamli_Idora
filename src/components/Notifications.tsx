import { useMainContext } from '@contexts/MainProvider'
import { Box, ClickAwayListener, Stack } from '@mui/material'
import { Text } from '@styles/globalStyle'
import { FC } from 'react'
import { FlexWrapper } from './common/Flex'
import FridayThesisIcon from '@assets/images/notifications/friday-thesis.svg'
import DirectionsIcon from '@assets/images/notifications/direction.svg'
import { Link } from 'react-router-dom'

export type OrderT = {
  direction: number
  title: string
  direction_type: string
  from_role: string
  created_at: string
}

export type ThesisT = {
  created_at: string
  title: string
  id: number
}

const fromRoles = ['Bosh boshqarma', 'Viloyat boshqarmasi', 'Tuman boshqarmasi']

const directionTypes = ['Qaror', 'Buyruq', 'Dastur', 'Xat', 'Topshiriq']

export const Notifications = () => {
  const {
    state: { notificationOpen, notifications, user },
    actions: { setNotificationOpen },
  } = useMainContext()

  const handleClick = () => setNotificationOpen(false)

  return (
    notificationOpen && (
      <ClickAwayListener onClickAway={handleClick}>
        <Box
          sx={{
            borderRadius: '12px',
            boxShadow: '0 2px 14px rgba(38, 60, 85, 0.16)',
            position: 'absolute',
            top: '100%',
            right: 0,
            zIndex: 10,
            bgcolor: '#fff',
            width: '420px',
            maxHeight: '400px',
            overflowX: 'auto',
            pb: 2,
            // width: "100%",
          }}
        >
          <Box px={2.5} py={2}>
            <Text fs="18px" fw="600" c="unset">
              Bildirishnomalar
            </Text>
          </Box>
          {notifications?.directions?.length || notifications?.friday_tesis?.length ? (
            <Stack>
              {notifications?.directions?.map((item: OrderT, i) => (
                <NotificationItem
                  key={i}
                  badge={fromRoles[+item?.from_role - 1]}
                  title={`${directionTypes[+item?.direction_type - 1]}: ${item?.title}`}
                  icon={DirectionsIcon}
                  date={new Date(item?.created_at).toLocaleDateString()}
                  pathname={`/instructions/list?type=${item.direction_type}`}
                />
              ))}
              {user?.role == '4' &&
                notifications?.friday_tesis?.map((item: ThesisT) => (
                  <NotificationItem
                    badge={fromRoles[0]}
                    title={`Juma tezis: ${item?.title}`}
                    icon={FridayThesisIcon}
                    date={new Date(item?.created_at).toLocaleDateString()}
                    pathname="/prayers/list?type=2"
                  />
                ))}
            </Stack>
          ) : (
            <Text textAlign={'center'} c="unset" fs="15px" fw="600" marginY={2}>
              Bildirishnomalar mavjud emas
            </Text>
          )}
        </Box>
      </ClickAwayListener>
    )
  )
}

type T = {
  badge?: string
  icon?: string
  title?: string
  date?: string
  pathname?: string
}

const NotificationItem: FC<T> = ({ badge, icon, title, date, pathname }) => {
  return (
    <FlexWrapper
      component={Link}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
      }}
      // @ts-ignore
      to={pathname}
      p={'20px'}
      gap={2}
      borderBottom={'1px dashed #CDD2D7'}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          style={{
            width: '24px',
            height: '24px',
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      )}
      <Stack alignItems={'start'}>
        <Text
          c="var(--textColor)"
          fs="12px"
          fw="600"
          lineHeight={'20px'}
          mb={'4px'}
          sx={{
            padding: '2px 6px',
            bgcolor: 'rgba(145, 158, 171, 0.20)',
          }}
        >
          {badge}
        </Text>
        <Text ff="Public Sans" fs="16px" fw="800" c="#212B36" mb={'8px'}>
          {title}
        </Text>
        <Text fs="12px" fw="400" c="var(--textColor)">
          {date}
        </Text>
      </Stack>
    </FlexWrapper>
  )
}
