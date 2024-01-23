import { PaginationContext, PaginationContextType } from '@contexts/PaginationProvider'
import { Stack } from '@mui/material'
import { getRequest } from '@services/requests/CommonRequests'
import { useQuery } from '@tanstack/react-query'
import { MouseEvent, useContext, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { FilterContext, FilterContextType } from '@contexts/FilterContext'
import CustomTable from '@components/common/CustomTable/CustomTable'
import { prayersData } from './data'
import CustomButton from '@components/common/CustomButton'
import { FlexWrapper } from '@components/common/Flex'
import AddIcon from '@mui/icons-material/Add'
import { PrayersMenu } from './components/PrayersMenu'

const PrayersList = ({ customTypeQuery }: { customTypeQuery?: number }) => {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const typeQuery = customTypeQuery ? customTypeQuery : +searchParams.get('type')
  const isAdding = pathname.includes('add')
  

  const {
    state: { limit, offset, search },
  } = useContext<PaginationContextType>(PaginationContext)

  const selectedTabData = prayersData.find((item) => item.id === typeQuery)

  const { filterData } = useContext<FilterContextType>(FilterContext)
  const { imamThesis } = filterData
  const { status } = imamThesis

  const { data, refetch, isLoading, isRefetching } = useQuery({
    queryKey: ['instructions', offset, limit, search, typeQuery, status],
    queryFn: () =>
      getRequest(selectedTabData.url, {
        params: {
          limit,
          offset,
          search,
          direction_type: typeQuery,
          ...(+status && { state: status }),
          ...(typeQuery && { tesis__types: [1, 2][typeQuery - 2] }),
        },
      }),
  })


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Stack gap="16px">
      {typeQuery == 1 && (
        <>
        <Stack alignItems={'end'}>
          <CustomButton
            value={
              <FlexWrapper sx={{ fontSize: '16px', gap: '10px' }}>
                Qo'shish
                <AddIcon />
              </FlexWrapper>
            }
            padding="12px 24px"
            onClick={handleClick}
          />
        </Stack>
        <PrayersMenu refetchList={refetch} anchorEl={anchorEl} handleClose={handleClose} open={open} />
        </>
      )}

      {typeQuery && !isAdding && (
        <CustomTable
          cols={selectedTabData.cols}
          rows={data?.results}
          count={data?.count}
          deletePath="orders/delete/"
          refetch={refetch}
          loading={isLoading || isRefetching}
          filter="imamThesis"
          tesisId={true}
          customActions={{ view: true, update: true }}
          updatePath="friday_tesis/seen/update/"
          isResult={false}
        />
      )}
    </Stack>
  )
}

export default PrayersList
