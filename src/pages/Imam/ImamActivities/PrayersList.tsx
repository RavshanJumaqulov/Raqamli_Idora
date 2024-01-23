import CustomTable from '@components/common/CustomTable/CustomTable'
import { PaginationContext, PaginationContextType } from '@contexts/PaginationProvider'
import { imamPrayersCols } from '@data/colsData/Imam'
import { Stack } from '@mui/material'
import { getRequest } from '@services/requests/CommonRequests'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

const PrayersList = () => {
  const { pathname } = useLocation()
  const isAdding = pathname.includes('add')
  const {
    state: { limit, offset, search },
  } = useContext<PaginationContextType>(PaginationContext)

  const { data, refetch, isLoading, isRefetching } = useQuery({
    queryKey: ['instructions', offset, limit, search],
    queryFn: () =>
      getRequest(`public_prayers/list/`, {
        params: {
          limit,
          offset,
          search,
          direction_type: 3,
        },
      }),
  })

  return (
    <Stack gap="16px">
      {!isAdding && (
        <CustomTable
          cols={imamPrayersCols}
          rows={data?.results}
          count={data?.count}
          filter="instructions"
          deletePath="orders/delete/"
          refetch={refetch}
          loading={isLoading || isRefetching}
          directionId={true}
        />
      )}
    </Stack>
  )
}

export default PrayersList
