import { FlexBetween, FlexWrapper } from '@components/common/Flex'
import PageTab from '@components/common/PageTab'
import { Stack } from '@mui/system'
import { useLocation } from 'react-router'
import AddIcon from '@mui/icons-material/Add'
import { tabList, tabs } from '../../../data/thesisData'
import CustomButton from '@components/common/CustomButton'
import { useSearchParams, useNavigate } from 'react-router-dom'
import CustomTable from '@components/common/CustomTable/CustomTable'
import { useQuery } from '@tanstack/react-query'
import { getRequest } from '@services/requests/CommonRequests'
import { PaginationContext, PaginationContextType } from '@contexts/PaginationProvider'
import { useContext } from 'react'
import { fridayThesisCols } from '@data/colsData/Admin'
import { FilterContext, FilterContextType } from '@contexts/FilterContext'

const ThesisList = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const typeQuery = +searchParams.get('type')
  const isAdding = pathname.includes('add')

  const {
    state: { limit, offset, search },
  } = useContext<PaginationContextType>(PaginationContext)

  const { filterData } = useContext<FilterContextType>(FilterContext)
  const { thesis } = filterData
  const { date } = thesis

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['friday_tesis', typeQuery, limit, offset, search, date],
    queryFn: () =>
      getRequest('friday_tesis/list/', {
        params: {
          types: typeQuery,
          limit,
          offset,
          search,

          ...(date?.from && { start_date: date?.from }),
          ...(date?.to && { finish_date: date?.to }),
        },
      }),
  })

  return (
    <Stack gap="16px">
      {!isAdding && (
        <FlexBetween>
          <PageTab tabs={tabs} />

          <CustomButton
            value={
              <FlexWrapper sx={{ fontSize: '16px', gap: '10px' }}>
                <AddIcon />
                {tabList[typeQuery - 1]} qo'shish
              </FlexWrapper>
            }
            padding="12px 24px"
            // bgColor="#002E18"
            onClick={() => navigate(`/friday-thesis/add?type=${typeQuery}`)}
          />
        </FlexBetween>
      )}

      {typeQuery && !isAdding && (
        <CustomTable
          cols={fridayThesisCols}
          rows={data?.results}
          count={data?.count}
          refetch={refetch}
          loading={isLoading || isRefetching}
          deletePath="friday_tesis/detail/"
          filter="thesis"
        />
      )}
    </Stack>
  )
}

export default ThesisList
