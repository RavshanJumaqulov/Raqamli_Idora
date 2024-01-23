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
import { useNavigate } from 'react-router-dom'
import { FilterContext, FilterContextType } from '@contexts/FilterContext'
import { EmployeeCols, platformEmployeeCols } from '@data/colsData/Admin'
import { tabList, tabs } from '@data/employeesData'

const EmployeeList = () => {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const typeQuery = +searchParams.get('type')
  const isAdding = pathname.includes('add')
  const navigate = useNavigate()
  const isPlatformAdmin = +typeQuery === 2

  const {
    state: { limit, offset, search },
  } = useContext<PaginationContextType>(PaginationContext)

  const { filterData } = useContext<FilterContextType>(FilterContext)
  const { employees, platformEmployees } = filterData
  const { degree, district, education, region, graduatedYear, age, graduated_univer } = employees

  const {
    district: platFormEmployeeDistrict,
    region: platFormEmployeeRegion,
    role: platFormEmployeeRole,
    mosque: platFormEmployeeMosque,
  } = platformEmployees

  const { data, refetch, isLoading, isRefetching } = useQuery({
    queryKey: [
      'employee',
      typeQuery,
      limit,
      offset,
      search,

      // for employees
      degree,
      district,
      education,
      region,
      graduatedYear,
      age,
      graduated_univer,

      // for platform employees
      platFormEmployeeDistrict,
      platFormEmployeeRegion,
      platFormEmployeeRole,
      platFormEmployeeMosque,
    ],
    queryFn: () =>
      getRequest(isPlatformAdmin ? 'auth/accounts' : 'employee/employee/list', {
        params: {
          types: +typeQuery,
          limit,
          offset,
          search,

          // for employees
          ...(region && { mosque__region: region?.id }),
          ...(+district && { mosque__district: district }),
          ...(+degree && { academic_degree: degree }),
          ...(+education && { education: education }),
          ...(graduatedYear && { graduated_year: graduatedYear }),
          ...(age?.from && { start_age: age?.from }),
          ...(age?.to && { finish_age: age?.to }),
          ...(graduated_univer && { graduated_univer: graduated_univer?.id }),

          // for platform employees
          ...(platFormEmployeeRegion && { region: platFormEmployeeRegion?.id }),
          ...(+platFormEmployeeDistrict && { district: platFormEmployeeDistrict }),
          ...(+platFormEmployeeRole && { role: platFormEmployeeRole }),
          ...(platFormEmployeeMosque && { profil__mosque: platFormEmployeeMosque?.id }),
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
            onClick={() => navigate(typeQuery === 2 ? '/employee/add-account' : `/employee/add`)}
          />
        </FlexBetween>
      )}
      {typeQuery && !isAdding && (
        <CustomTable
          cols={isPlatformAdmin ? platformEmployeeCols : EmployeeCols}
          rows={data?.results}
          count={data?.count}
          refetch={refetch}
          loading={isLoading || isRefetching}
          deletePath={isPlatformAdmin ? 'auth/accounts/' : 'employee/employee/'}
          filter={isPlatformAdmin ? 'platformEmployees' : 'employees'}
          onEditClick={(row) => {
            isPlatformAdmin
              ? navigate(`/employee/edit-account/${row.id}`)
              : navigate(`/employee/edit/${row.id}`)
          }}
        />
      )}
    </Stack>
  )
}

export default EmployeeList
