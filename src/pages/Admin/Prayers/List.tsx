import CustomTable from '@components/common/CustomTable/CustomTable'
import { FilterContext, FilterContextType } from '@contexts/FilterContext'
import { PaginationContext, PaginationContextType } from '@contexts/PaginationProvider'
import { publicPrayersCols } from '@data/colsData/Admin'
import { Stack } from '@mui/material'
import { getRequest } from '@services/requests/CommonRequests'
import { GetAdminPublicPrayersInterface } from '@src/types/detailHeaderTypes'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

export default function PublicPrayersList() {
  //   const { pathname } = useLocation()
  //   const [searchParams] = useSearchParams()
  //   const user = JSON.parse(window.localStorage.getItem('user'))

  const {
    state: { limit, offset, search },
  } = useContext<PaginationContextType>(PaginationContext)

  const { filterData } = useContext<FilterContextType>(FilterContext)
  const { publicPrayers } = filterData
  const { imam } = publicPrayers
  const { data, refetch, isLoading, isRefetching } = useQuery<GetAdminPublicPrayersInterface>({
    queryKey: [`public_prayers/list${limit + '/' + offset}`, offset, limit, search, imam],
    queryFn: () =>
      getRequest(`public_prayers/list/`, {
        params: {
          limit,
          offset,
          search,

          ...(imam && { imam: imam?.id }),
        },
      }),
  })

  return (
    <Stack gap="16px">
      {!isLoading && (
        <CustomTable
          cols={publicPrayersCols}
          rows={data?.results}
          count={data?.count}
          refetch={refetch}
          loading={isLoading || isRefetching}
          customActions={{ view: true }}
          load={false}
          filter="publicPrayers"
        />
      )}
    </Stack>
  )
}
