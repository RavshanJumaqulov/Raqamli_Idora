import { Box, Typography, styled as muiStyled } from '@mui/material'
import styled from 'styled-components'

type textType = {
  fs?: string
  c?: string
  fw?: string
  o?: string
  ff?: string
}

export const Text = styled(Typography)<textType>`
  font-size: ${({ fs }) => fs} !important;
  color: ${({ c }) => (c ? c : 'var(--primary)')} !important;
  font-weight: ${({ fw }) => (fw ? fw : '400')} !important;
  font-family: ${({ ff }) => (ff ? ff : 'Montserrat Variable, sans-serif ')} !important;
  opacity: ${({ o }) => (o ? o : 1)} !important;
`

export const CardWrapper = muiStyled(Box)(({ theme }) => ({
  padding: '22px',
  borderRadius: '5px',
  // background: theme.palette.background.paper,
  // boxShadow: theme.shadows[1],
  boxShadow: '0 2px 14px rgba(38, 60, 85, 0.16)',
}))

// export const PrimeButton = styled(Button)`
//   border-radius: 8px;
//   background-color: #0caf60;
//   padding: 11px 16px;
//   color: white;
//   font-weight: 700;
//   line-height: 26px;
//   text-transform: unset;
//   &:hover {
//     background-color: #0caf60;
//   }
// `
