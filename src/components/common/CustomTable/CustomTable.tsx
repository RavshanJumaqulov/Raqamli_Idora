import React, { useContext, useState } from 'react'
import { Box, Button, MenuItem, Stack, Typography } from '@mui/material'
import { FlexWrapper } from '../Flex'
import CustomTextField from '../CustomTextField'
import Table, { colType } from './Table'
import { Filters } from './Filters/Filters'
import CommonPagination from '../CustomPagination'
import { SearchIcon } from '@components/icons/icons'
import { PaginationContext, PaginationContextType } from '@contexts/PaginationProvider'
import { useLocation } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings'
import { filterNameTypes } from '@src/types/table'
import DeleteModal from '../DeleteModal'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { MainLoading } from '../Loading'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CustomButton from '../CustomButton'
import FilterListIcon from '@mui/icons-material/FilterList'
import Menus from './Menus'

export type data = {
  label: string
  value: string
}

export type customActionsT = {
  view?: boolean
  update?: boolean
  edit?: boolean
  delete?: boolean
  add?: boolean
}

type T = {
  directionId?: boolean
  cols: colType[]
  rows
  pagination?: boolean
  count: number
  actions?: boolean
  customActions?: customActionsT
  filter?: filterNameTypes
  deletePath?: string
  refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>
  loading?: boolean
  updatePath?: string
  tesisId?: boolean
  onEditClick?: (row) => void
  isResult?: boolean
  load?: boolean
}

const CustomTable: React.FC<T> = ({
  directionId = false,
  tesisId = false,
  cols,
  rows,
  count,
  pagination = true,
  actions = true,
  customActions,
  filter,
  deletePath,
  loading,
  updatePath,
  refetch,
  onEditClick,
  isResult = false,
  load = true,
}) => {
  const {
    actions: { setLimit, setSearch },
  } = useContext<PaginationContextType>(PaginationContext)

  const handleLimitChange = (e) => setLimit(e.target.value)
  const handleSearchChange = (e) => setSearch(e.target.value)

  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const { pathname } = useLocation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openDropDown = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const isInstructionOrThesisResults =
    (pathname.includes('instructions') || pathname.includes('friday-thesis')) &&
    pathname.includes('results')

  const additionAction: colType = {
    field: 'actions',
    headerName: '',
    renderHeader: (
      <FlexWrapper gap="10px">
        <Button
          sx={{
            background: 'transparent',
            width: 'fit-content',
            minWidth: 'fit-content',
            svg: { display: 'block' },
          }}
        >
          <SettingsIcon fontSize="small" sx={{ display: 'block' }} className="tableSettingsIcon" />
        </Button>
      </FlexWrapper>
    ),
    show: true,
    width: 50,
    renderCell: (row) => {
      if (actions)
        return (
          <div onClick={() => setSelectedRow(row)}>
            <Button
              id="demo-customized-button"
              aria-controls={openDropDown ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openDropDown ? 'true' : undefined}
              disableElevation
              disabled={isInstructionOrThesisResults && !row?.result_id}
              onClick={(e) => handleClick(e)}
              sx={{
                textTransform: 'initial',
                width: '40px',
                minWidth: '40px',
                height: '40px',
                borderRadius: '100%',
              }}
            >
              <MoreVertIcon />
            </Button>
          </div>
        )
    },
  }

  const [isOpenFilter, setIsOpenFilter] = useState(false)

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setIsOpenFilter(open)
  }

  return (
    <Stack bgcolor="#fff" p="16px 24px" gap="16px" sx={{ borderRadius: 4 }}>
      {filter && (
        <Filters filter={filter} isOpenFilter={isOpenFilter} toggleDrawer={toggleDrawer} />
      )}

      <FlexWrapper gap="20px">
        <FlexWrapper gap="16px">
          <Typography sx={{ fontSize: '14px', color: 'text.grey' }}>Soni: </Typography>
          <CustomTextField
            customHandleChange={handleLimitChange}
            select
            defaultValue={10}
            width="68px"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </CustomTextField>
        </FlexWrapper>

        <CustomTextField
          placeholder="Qidiruv..."
          InputProps={{ startAdornment: <SearchIcon /> }}
          variant="outlined"
          fullWidth
          sx={{ input: { pl: '15px' } }}
          customHandleChange={handleSearchChange}
        />

        <CustomButton
          onClick={toggleDrawer(true)}
          value={
            <FlexWrapper gap="12px" sx={{ color: 'var(--primary)' }}>
              <FilterListIcon />
              Filter
            </FlexWrapper>
          }
          bgColor="var(--Greyscale-50, #FAFAFA)"
          color="var(--textColor)"
          padding="10px 16px"
          fs="14px"
          fw="600"
        />
      </FlexWrapper>

      <Box width="calc(100vw - 410px)" overflow="auto" pb="15px">
        {loading ? <MainLoading /> : <Table cols={[...cols, additionAction]} rows={rows} />}
      </Box>

      <DeleteModal
        refetch={refetch}
        row={selectedRow}
        path={deletePath}
        open={open}
        setOpen={setOpen}
      />

      <Menus
        refetch={refetch}
        anchorEl={anchorEl}
        directionId={directionId}
        tesisId={tesisId}
        handleClose={handleClose}
        isInstructionOrThesisResults={isInstructionOrThesisResults}
        openDropDown={openDropDown}
        selectedRow={selectedRow}
        setOpen={setOpen}
        customActions={customActions}
        updatePath={updatePath}
        onEditClick={onEditClick}
        isResult={isResult}
        load={load}
      />

      {pagination && !!count && <CommonPagination count={count || 0} />}
    </Stack>
  )
}

export default CustomTable
