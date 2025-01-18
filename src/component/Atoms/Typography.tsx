import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'body3' | 'caption' | 'button' | 'overline'

interface CustomTypographyProps extends TypographyProps {
  variant?: Variant
  children: React.ReactNode
}

export const CustomTypography: React.FC<CustomTypographyProps> = ({ variant = 'body1', children, ...props }) => {
  return (
    <Typography variant={variant} {...props}>
      {children}
    </Typography>
  )
}
