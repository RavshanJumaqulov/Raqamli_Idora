import { useSearchParams } from 'react-router-dom'
import { FlexWrapper } from './Flex'
import { Badge, Button } from '@mui/material'
import { useMainContext } from '@contexts/MainProvider'

export default function PageTab({ tabs, sx = {}, ...props }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('activeTab')
  const typeQuery = searchParams.get('type')
  const {
    state: {
      notifications: { directions },
    },
  } = useMainContext()

  return (
    <FlexWrapper
      {...props}
      sx={{
        '& a': {
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.04)',
          },
        },
        ...sx,
      }}
    >
      {tabs.map(({ path, label, id }) => {
        const isActive = id == typeQuery
        const filteredDirections = directions.filter((item) => item?.direction_type == id)
        return (
          <Button
            key={label}
            style={{
              padding: '12px 24px',
              textDecoration: 'none',
              color: isActive ? '#080A09' : '#8D8D8D',
              fontWeight: isActive ? 600 : 500,
              borderBottom: isActive ? '2px solid #0CAF60' : '1px solid #A0AEC0',
              transition: 'all 0.15s',
              borderRadius: '8px 8px 0 0',
              textTransform: 'capitalize',
            }}
            onClick={() => setSearchParams(activeTab ? { activeTab, type: id } : { type: id })}
          >
            {label}
            <Badge
              badgeContent={
                ['/instructions/list'].includes(location.pathname) && filteredDirections.length > 0
                  ? filteredDirections.length
                  : null
              }
              color="secondary"
              sx={{ mt: '-10px', ml: '20px' }}
            />
          </Button>
        )
      })}
    </FlexWrapper>
  )
}
