import { FlexBetween, FlexWrapper } from '@components/common/Flex'
import PageTab from '@components/common/PageTab'
import { Stack } from '@mui/system'
import { useLocation } from 'react-router'
import AddIcon from '@mui/icons-material/Add'
import CustomButton from '@components/common/CustomButton'
import { useSearchParams } from 'react-router-dom'
import CustomTable from '@components/common/CustomTable/CustomTable'
import { useQuery } from '@tanstack/react-query'
import { getRequest } from '@services/requests/CommonRequests'
import { PaginationContext, PaginationContextType } from '@contexts/PaginationProvider'
import { useContext } from 'react'
import { tabs } from '../../../data/mosqueData'
import { MasjidCols } from '@data/colsData/Admin'
import { useNavigate } from 'react-router-dom'
import { FilterContext, FilterContextType } from '@contexts/FilterContext'

const MosquesList = () => {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const typeQuery = +searchParams.get('type')
  const isAdding = pathname.includes('add')
  const navigate = useNavigate()

  const {
    state: { limit, offset, search },
  } = useContext<PaginationContextType>(PaginationContext)

  const { filterData } = useContext<FilterContextType>(FilterContext)
  const { mosques } = filterData
  const { district, region, mosque_heating_fuel, mosque_heating_type, mosque_status, mosque_type } =
    mosques

  const { data, refetch, isLoading, isRefetching } = useQuery({
    queryKey: [
      'instructions',
      typeQuery,
      limit,
      offset,
      search,

      district,
      region,
      mosque_heating_fuel,
      mosque_heating_type,
      mosque_status,
      mosque_type,
    ],
    queryFn: () =>
      getRequest('mosque/list/', {
        params: {
          // types: typeQuery,
          limit,
          offset,
          search,

          ...(region && { region: region?.id }),
          ...(+district && { district }),
          // ...(date?.from && { start_date: date?.from }),
          // ...(date?.to && { finish_date: date?.to }),
          ...(+mosque_heating_fuel && { mosque_heating_fuel }),
          ...(+mosque_heating_type && { mosque_heating_type }),
          ...(+mosque_status && { mosque_status }),
          ...(+mosque_type && { mosque_type }),

          ...(typeQuery === 2 && { has_imam: false }),
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
                Masjid qo'shish
              </FlexWrapper>
            }
            padding="12px 24px"
            // bgColor="#002E18"
            onClick={() => navigate(`/mosques/add?type=${typeQuery}`)}
          />
        </FlexBetween>
      )}

      {typeQuery && !isAdding && (
        <CustomTable
          deletePath="mosque/delete/"
          cols={MasjidCols}
          rows={data?.results}
          count={data?.count}
          refetch={refetch}
          loading={isLoading || isRefetching}
          filter="mosques"
        />
      )}
    </Stack>
  )
}

export default MosquesList
