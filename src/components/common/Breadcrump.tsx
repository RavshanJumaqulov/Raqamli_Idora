import { Box, Breadcrumbs, Link as MuiLink } from '@mui/material'
import { SidebarItemsTypes } from '@src/types/SidebarTypes'
import { Text } from '@styles/globalStyle'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'

type T = {
  sidebarItems: SidebarItemsTypes[],
  innerPageName?:string,
  backLink?: string
}
const Breadcrumb: React.FC<T> = ({ sidebarItems, innerPageName = "", backLink }) => {
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const { id } = useParams()
  const type = params.get('type')
  const pathnames = pathname?.split('/')

  const add = pathname?.includes('add')
  const edit = pathname?.includes('edit') && !!id
  const view = pathname?.includes('view') && !!id

  const firstPage = sidebarItems.find((item) => item.key.includes(pathnames[1]))

  const secondpage =
    firstPage?.child && type
      ? firstPage?.child?.find((el) => el.key?.split('?type=')?.includes(type))
      : null

  const activeTitle = add
    ? `${ innerPageName ? innerPageName : secondpage ? secondpage?.label : firstPage?.label} qo'shish`
    : edit
      ? `${ innerPageName ? innerPageName : secondpage ? secondpage?.label : firstPage?.label}ni o'zgartirish`
      : view
        ? `${ innerPageName ? innerPageName : secondpage ? secondpage?.label : firstPage?.label}ni ko'rish`
        : ''

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '15px' }}>
        <MuiLink
          component={Link}
          to={'/' + (backLink ?? firstPage?.link)}
          color={'secondary'}
          sx={{ textDecoration: 'none', fontSize: '14px', color: '#919EAB' }}
        >
          {firstPage?.label}
        </MuiLink>

        {secondpage && (
          <MuiLink
            component={Link}
            to={'/' + secondpage?.link}
            color={'secondary'}
            sx={{ textDecoration: 'none', fontSize: '14px', color: '#919EAB' }}
          >
            {secondpage?.label}
          </MuiLink>
        )}

        <Text fs="14px">{activeTitle}</Text>
      </Breadcrumbs>
    </Box>
  )
}

export default Breadcrumb
