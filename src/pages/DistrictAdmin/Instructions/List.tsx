import CustomButton from '@components/common/CustomButton'
import { FlexBetween, FlexWrapper } from '@components/common/Flex'
import PageTab from '@components/common/PageTab'
import { PaginationContext, PaginationContextType } from '@contexts/PaginationProvider'
import AddIcon from '@mui/icons-material/Add'
import { Stack } from '@mui/material'
import { getRequest } from '@services/requests/CommonRequests'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { orderCols } from '@data/colsData/Admin'
import { FilterContext, FilterContextType } from '@contexts/FilterContext'
import { tabList, tabs } from '@data/instructionsData'
import CustomTable from '@components/common/CustomTable/CustomTable'
import { imamInstructionCols } from '@data/colsData/Imam'
import { UserInterface } from '@src/types/userTypes'

const RegionAdminInstructionsList = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const typeQuery = +searchParams.get('type')
  const activeTab = searchParams.get('activeTab')
  const isAdding = pathname.includes('add')
  const user: UserInterface = JSON.parse(window.localStorage.getItem('user'))

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
      getRequest(
        activeTab === '1'
          ? `orders/seen/list?direction__direction_type=${typeQuery}&employee=${user.id}`
          : `orders/list?direction__direction_type=${typeQuery}&employee=${user.id}`,
        {
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
        }
      ),
  })

  useEffect(() => {
    if (!activeTab) setSearchParams({ type: String(typeQuery), activeTab: '1' })
  }, [activeTab])

  return (
    <Stack gap="16px">
      {!isAdding && (
        <FlexBetween gap="10px">
          <FlexWrapper gap="40px">
            <PageTab tabs={tabs} />

            <FlexWrapper gap="10px">
              <div className="tab-box">
                <div
                  className={`tab ${activeTab === '1' ? 'active-tab' : ''}`}
                  onClick={() => setSearchParams({ type: String(typeQuery), activeTab: '1' })}
                >
                  Kelib tushgan
                </div>
                <div
                  className={`tab ${activeTab === '2' ? 'active-tab' : ''}`}
                  onClick={() => setSearchParams({ type: String(typeQuery), activeTab: '2' })}
                >
                  Jo'natilgan
                </div>
              </div>
            </FlexWrapper>
          </FlexWrapper>
          {activeTab == '2' && (
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
              onClick={() => navigate(`/instructions/add?type=${typeQuery}&activeTab=2`)}
            />
          )}
        </FlexBetween>
      )}

      {typeQuery && !isAdding && (
        <CustomTable
          cols={activeTab === '1' ? imamInstructionCols : orderCols}
          rows={data?.results}
          count={data?.count}
          filter="instructions"
          deletePath="orders/delete/"
          updatePath="orders/seen/update/"
          refetch={refetch}
          loading={isLoading || isRefetching}
          directionId={activeTab === '1' ? true : false}
          customActions={
            activeTab === '1' && { delete: false, add: true, edit: false, update: true, view: true }
          }
          isResult={activeTab === '1' ? true : false}
        />
      )}
    </Stack>
  )
}

export default RegionAdminInstructionsList
