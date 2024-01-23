import styled from 'styled-components'

import Menu, { MenuProps } from '@mui/material/Menu'
import { alpha } from '@mui/material/styles'

export const TableWrapper = styled.table<{ $height?: string }>`
  width: 100%;
  border: none;
  border-spacing: 0;
  height: ${({ $height }) => $height && $height};
  overflow: auto;
  /* padding: 16px 24px; */
`

export const THead = styled.thead`
  tr {
    th {
      border-bottom: 1px solid #aaa;

      text-align: start;

      /* :first-child() { */
      /* padding-left: 5px; */
      /* } */
    }
  }
`

export const TBody = styled.tbody`
  & > tr:hover {
    /* background-color: #0caf604f; */
    background-color: #f0f0f0;
  }
`

export const Tr = styled.tr<{ $isThead?: boolean }>`
  cursor: default;
  height: 40px;
  /* &:nth-child(even) {
    background: ${({ $isThead }) => ($isThead ? '' : '#f0f0f0')};
  } */
`

export const Th = styled.th<{ $pl?: string; $minWidth?: number; $width?: number | string }>`
  padding-left: ${({ $pl }) => $pl && $pl};
  min-width: ${({ $minWidth }) => $minWidth && `${$minWidth}px`};
  /* min-width: max-content; */
  width: ${({ $width }) => $width && `${$width}px`};
`

export const Td = styled.td<{ $pl?: string }>`
  padding-left: ${({ $pl }) => $pl && $pl};
  padding-right: 20px;
  border-bottom: 1px solid #d4d8dd;
  overflow: hidden;
`

export const tableEyeIconStyle = { cursor: 'pointer', color: 'var(--primary)', width: '25px' }
export const tablePencilIconStyle = { cursor: 'pointer', color: '#FFAA1D', width: '25px' }
export const tableTrashIconStyle = { cursor: 'pointer', color: '#D7280F', width: '25px' }
export const tableAddIconStyle = { cursor: 'pointer', color: 'var(--primary)', width: '25px' }

export const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 4,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        // color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}))
