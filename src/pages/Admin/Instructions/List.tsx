import CustomButton from '@components/common/CustomButton'
import { FlexBetween, FlexWrapper } from '@components/common/Flex'
import PageTab from '@components/common/PageTab'
import { PaginationContext, PaginationContextType } from '@contexts/PaginationProvider'
import AddIcon from '@mui/icons-material/Add'
import { Stack } from '@mui/material'
import { getRequest } from '@services/requests/CommonRequests'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { orderCols } from '@data/colsData/Admin'
import { FilterContext, FilterContextType } from '@contexts/FilterContext'
import { tabList, tabs } from '@data/instructionsData'
import CustomTable from '@components/common/CustomTable/CustomTable'

const InstructionsList = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const typeQuery = +searchParams.get('type')
  const activeTab = searchParams.get('activeTab')
  const isAdding = pathname.includes('add')

  const {
    state: { limit, offset, search },
  } = useContext<PaginationContextType>(PaginationContext)

  const { filterData } = useContext<FilterContextType>(FilterContext)
  const { instructions } = filterData
  const { date, region, type, district } = instructions

  const { data, refetch, isLoading, isRefetching } = useQuery({
    queryKey: [
      'instructions',
      offset,
      limit,
      search,
      typeQuery,
      region,
      date,
      type,
      district,
      activeTab,
    ],
    queryFn: () =>
      getRequest('orders/list/', {
        params: {
          limit,
          offset,
          search,
          direction_type: typeQuery,

          ...(region && { to_region: region?.id }),
          ...(+district && { to_district: district }),
          ...(date?.from && { start_date: date?.from }),
          ...(date?.to && { finish_date: date?.to }),
          ...(+type && { types: type }),
        },
      }),
  })

  return (
    <Stack gap="16px">
      {!isAdding && (
        <FlexBetween gap="10px">
          <PageTab tabs={tabs} />

          <CustomButton
            value={
              <FlexWrapper
                sx={{
                  gap: '10px',
                  fontSize: '16px',
                }}
              >
                <AddIcon />
                {tabList[typeQuery - 1]} qo’shish
              </FlexWrapper>
            }
            padding="12px 24px"
            // bgColor="#002E18"
            onClick={() => navigate(`/instructions/add?type=${typeQuery}`)}
          />
        </FlexBetween>
      )}

      {typeQuery && !isAdding && (
        <CustomTable
          cols={orderCols}
          rows={data?.results}
          count={data?.count}
          filter="instructions"
          deletePath="orders/detail/"
          refetch={refetch}
          loading={isLoading || isRefetching}
        />
      )}
    </Stack>
  )
}

export default InstructionsList
