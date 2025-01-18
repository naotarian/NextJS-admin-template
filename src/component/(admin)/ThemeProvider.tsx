'use client'

import type { ReactNode } from 'react'

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import theme from '@/component/(admin)/theme'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
