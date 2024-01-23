import CustomTable from '@components/common/CustomTable/CustomTable'
import { PaginationContext, PaginationContextType } from '@contexts/PaginationProvider'
import { imamCharityCols } from '@data/colsData/Imam'
import { Stack } from '@mui/material'
import { getRequest } from '@services/requests/CommonRequests'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

const CharityEventsList = () => {
  const { pathname } = useLocation()
  const isAdding = pathname.includes('add')
  const {
    state: { limit, offset, search },
  } = useContext<PaginationContextType>(PaginationContext)

  const { data, refetch, isLoading, isRefetching } = useQuery({
    queryKey: ['instructions', offset, limit, search],
    queryFn: () =>
      getRequest(`charity/list/`, {
        params: {
          limit,
          offset,
          search,
        },
      }),
  })

  return (
    <Stack gap="16px">
      {!isAdding && (
        <CustomTable
          cols={imamCharityCols}
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

export default CharityEventsList
