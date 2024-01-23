import CustomTable from '@components/common/CustomTable/CustomTable'
import { FilterContext, FilterContextType } from '@contexts/FilterContext'
import { PaginationContext, PaginationContextType } from '@contexts/PaginationProvider'
import { Box, Stack } from '@mui/material'
import { getRequest } from '@services/requests/CommonRequests'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { URLs, tabs } from './data'
import { FlexBetween, FlexWrapper } from '@components/common/Flex'
import CustomButton from '@components/common/CustomButton'
import AddIcon from '@mui/icons-material/Add'

const ActivitiesList = () => {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const typeQuery = +searchParams.get('type')
  const isAdding = pathname.includes('add')
  const navigate = useNavigate()

  const {
    state: { limit, offset, search },
  } = useContext<PaginationContextType>(PaginationContext)

  const { filterData } = useContext<FilterContextType>(FilterContext)
  const { instructions } = filterData
  const { date, region } = instructions

  let link = URLs.find((o) => +o.id === +typeQuery)
  console.log(link)

  const { data, refetch, isLoading, isRefetching } = useQuery({
    queryKey: [link.url, limit, offset, search, typeQuery, region, date],
    queryFn: () =>
      getRequest(link.url, {
        params: {
          limit,
          offset,
          search,
          to_region: region?.id,
          from_date: date?.from,
          to_date: date?.to,
        },
      }),
  })


  return (
    <Stack gap="16px">
      <FlexBetween gap="10px">
        <Box />
        <CustomButton
          value={
            <FlexWrapper
              sx={{
                gap: '10px',
                fontSize: '16px',
              }}
            >
              <AddIcon />
              Qo’shish
            </FlexWrapper>
          }
          padding="12px 24px"
          onClick={() => navigate(`/activities/add?type=${typeQuery}`)}
        />
      </FlexBetween>
      {typeQuery && !isAdding && (
        <CustomTable
          cols={link.cols}
          rows={data?.results}
          count={data?.count}
          filter="instructions"
          deletePath={link.url.replace('list', 'delete')}
          refetch={refetch}
          loading={isLoading || isRefetching}
        />
      )}
    </Stack>
  )
}

export default ActivitiesList
