import type { ThemeOptions } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  // TypographyVariants に `body3` を追加
  interface TypographyVariants {
    body3: React.CSSProperties
  }

  // TypographyVariantsOptions に `body3` を追加
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties
  }
}

// Typography のプロップスに `body3` を追加
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true
  }
}
declare module '@mui/material/styles' {
  interface Palette {
    bgGray: {
      main: string
    }
    txGray: {
      main: string
    }
  }
  interface PaletteOptions {
    bgGray?: {
      main?: string
    }
    txGray?: {
      main?: string
    }
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#E7674C' // アクセントカラー
    },
    background: {
      default: '#FEFFFA' // ベースカラー
    },
    text: {
      primary: '#444949' // テキストカラー
    },
    bgGray: {
      main: '#f9fafb'
    },
    txGray: {
      main: '#667085'
    }
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 400
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 400
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400
    },
    body3: {
      fontSize: '0.75rem',
      fontWeight: 400
    }
  }
}

const theme = createTheme(themeOptions)

export default theme
