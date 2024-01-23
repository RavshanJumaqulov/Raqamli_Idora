import CustomButton from '@components/common/CustomButton'
import CustomTable from '@components/common/CustomTable/CustomTable'
import { FlexWrapper } from '@components/common/Flex'
import { usePaginationContext } from '@contexts/PaginationProvider'
import { Add } from '@mui/icons-material'
import { Stack } from '@mui/material'
import { getQuery } from '@services/requests/CommonRequests'
import { useNavigate } from 'react-router-dom'
import { COLS } from './data'

export default function PromotionsNeighborhoodList() {
  const navigate = useNavigate()
  const {
    state: { limit, offset, search },
  } = usePaginationContext()

  const { data, isLoading, isRefetching, refetch } = getQuery<any>('neighborhood/list/', [
    limit,
    offset,
    search,
  ])

  return (
    <Stack gap="16px">
      <Stack alignItems={'end'}>
        <CustomButton
          value={
            <FlexWrapper sx={{ fontSize: '16px', gap: '10px' }}>
              <Add />
              Qo'shish
            </FlexWrapper>
          }
          padding="12px 24px"
          onClick={() => {
            navigate(location.pathname.replace('list', 'add'))
          }}
        />
      </Stack>

      <CustomTable
        cols={COLS}
        rows={data?.results}
        count={data?.count}
        deletePath="neighborhood/delete/"
        loading={isLoading || isRefetching}
        refetch={refetch}
      />
    </Stack>
  )
}
