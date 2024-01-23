import { PaginationContext, PaginationContextType } from '@contexts/PaginationProvider'
import { Stack } from '@mui/material'
import { getRequest } from '@services/requests/CommonRequests'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { FilterContext, FilterContextType } from '@contexts/FilterContext'
import CustomTable from '@components/common/CustomTable/CustomTable'
import { ImamInstructionListType } from '@src/types/detailHeaderTypes'
import { imamInstructionCols } from '@data/colsData/Imam'

const InstructionList = () => {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const user = JSON.parse(window.localStorage.getItem('user'))
  const typeQuery = +searchParams.get('type')

  const isAdding = pathname.includes('add')
  const {
    state: { limit, offset, search },
  } = useContext<PaginationContextType>(PaginationContext)

  const { filterData } = useContext<FilterContextType>(FilterContext)
  const { instructions } = filterData
  const { date, region } = instructions

  const { data, refetch, isLoading, isRefetching } = useQuery<ImamInstructionListType>({
    queryKey: ['instructions', offset, limit, search, typeQuery, region, date],
    queryFn: () =>
      getRequest(`orders/seen/list?direction__direction_type=${typeQuery}&&employee=${user.id}`, {
        params: {
          limit,
          offset,
          search,
          direction_type: typeQuery,
          to_region: region?.id,
          from_date: date?.from,
          to_date: date?.to,
        },
      }),
  })
 
  return (
    <Stack gap="16px">
      {typeQuery && !isAdding && (
        <CustomTable
          cols={imamInstructionCols}
          rows={data?.results}
          count={data?.count}
          filter="instructions"
          deletePath="orders/delete/"
          refetch={refetch}
          loading={isLoading || isRefetching}
          directionId={true}
          customActions={{ view: true, update: true }}
          updatePath="orders/seen/update/"
        />
      )}
    </Stack>
  )
}

export default InstructionList
