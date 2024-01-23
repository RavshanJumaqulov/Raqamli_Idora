import { MainContext, MainContextType } from '@contexts/MainProvider'
import { Box, Checkbox, Stack, Tooltip, Typography } from '@mui/material'
import { useContext } from 'react'
import { TBody, THead, TableWrapper, Td, Th, Tr } from './Style'
import { PaginationContext, PaginationContextType } from '@contexts/PaginationProvider'
import { Text } from '@styles/globalStyle'
import Close from '@mui/icons-material/Close'
import { useSearchParams } from 'react-router-dom'
import CustomDetail from '../CustomDetail/CustomDetail'
import { adminPublicPrayersCols } from '../CustomDetail/DataHeaders'

export type colType = {
  field: string
  headerName: string
  show?: boolean
  width?: number | string
  minWidth?: number
  renderCell?
  renderHeader?
}

type T = {
  cols: colType[]
  rows
  height?: string
  checkboxSelection?: boolean
}

const Table: React.FC<T> = ({ cols, rows, height, checkboxSelection }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const publicPrayerId = searchParams.get('publicPrayerId')

  const closeModal = () => {
    searchParams.delete('publicPrayerId')
    setSearchParams(searchParams)
  }
  const {
    state: { rowSelectionModel },
    actions: { setRowSelectionModel },
  } = useContext<MainContextType>(MainContext)

  const {
    state: { offset },
  } = useContext<PaginationContextType>(PaginationContext)

  const prayers = publicPrayerId !== null ? rows.find((el) => el.id == publicPrayerId).prayer : null

  return (
    <>
      <TableWrapper $height={height}>
        <THead>
          <Tr $isThead>
            {checkboxSelection && <Th $pl="5px"></Th>}

            <Th $pl="5px" $minWidth={50} $width={50}>
              #
            </Th>
            {cols?.map((item, index) => (
              <Th key={index} $width={item?.width} $minWidth={item?.minWidth}>
                {item?.renderHeader ? item?.renderHeader : item?.headerName}
              </Th>
            ))}
          </Tr>
        </THead>
        <TBody>
          {rows?.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {checkboxSelection && (
                <Td $pl="5px">
                  <Checkbox
                    sx={{ p: '0', pl: '5px' }}
                    checked={rowSelectionModel?.[0] === row?.id}
                    onChange={() => setRowSelectionModel([row?.id])}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Td>
              )}
              <Td $pl="5px">{+offset + rowIndex + 1}</Td>
              {cols?.map((col, i) => (
                <Td key={i}>
                  <Tooltip title={(col.field == 'title' || col.field == 'tesis_title') && (col?.renderCell
                    ? col?.renderCell({ ...row, id: row?.id || rowIndex })
                    : row?.[col?.field])}>
                    <Box sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {col?.renderCell
                        ? col?.renderCell({ ...row, id: row?.id || rowIndex })
                        : row?.[col?.field]}
                    </Box>
                  </Tooltip>
                </Td>
              ))}
            </Tr>
          ))}
        </TBody>
      </TableWrapper>
      <Text textAlign="center" width="100%">
        {rows?.length === 0 && 'Malumot topilmadi'}
      </Text>
      {publicPrayerId !== null && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 10000,
            background: '#0000003f',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '90%',
              maxWidth: 600,
              background: '#fff',
              borderRadius: 4,
              px: 3,
              py: 2,
            }}
          >
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography
                sx={{
                  color: '#212B36',
                  fontFamily: 'Public Sans, sans-serif',
                  fontSize: 24,
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '36px',
                }}
              >
                Jamoat namozlari
              </Typography>
              <Close onClick={() => closeModal()} sx={{ color: '#212B36' }} />
            </Stack>
            <CustomDetail rows={2} data={prayers} header={adminPublicPrayersCols} />
          </Box>
        </Box>
      )}
    </>
  )
}

export default Table
