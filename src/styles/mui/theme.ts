// @ts-nocheck
import { createTheme } from '@mui/material/styles'
export const theme = createTheme({
  palette: {
    primary: {
      light: '#0CAF60',
      main: '#0CAF60',
      dark: '#0CAF60',
    },
    green: {
      primary: '#002E18',
      light: '#0CAF60',
    },
    text: {
      black: '#080A09',
      black1: '#2C3659',
      grey: '#718096',
      grey1: '#A7AEC1',
      greyscale500: '#A0AEC0',
      secondary: '#919EAB',
    },
    sidebar: {
      secondary: '#637381',
      primary: '#637381',
      active: '#00A76F',
    },
    bg: {
      white: '#F6F6F6',
      primary100: '#E7F7EF',
    },
    red: {
      primary: '#E60019',
    },
  },
  typography: {
    subtitle1: {
      color: '#212B36',
      fontFamily: "'Public Sans', sans-serif !important",
      fontSize: 32,
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '36px',
      cursor: 'default',
    },
    subtitle2: {
      color: '#212B36',
      fontFamily: "'Public Sans', sans-serif !important",
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '36px',
      cursor: 'default',
    },
    sidebar: {
      color: '#637381',
      fontFamily: "'Public Sans', sans-serif !important",
      fontSize: 16,
      lineHeight: '22px',
      fontWeight: 500,
      cursor: 'default',
    },
    detailLabel: {
      color: '#637381',
      fontFamily: "'Public Sans', sans-serif !important",
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '22px',
    },
  },
})

declare module '@mui/material/styles/createTypography' {
  interface Typography {
    sidebar: TypographyStyle
    detailLabel: TypographyStyle
  }
  interface TypographyOptions {
    sidebar?: TypographyStyleOptions
    detailLabel?: TypographyStyleOptions
  }
}

declare module '@mui/material/Typography/Typography' {
  interface TypographyPropsVariantOverrides {
    sidebar: true
    detailLabel: true
  }
}
