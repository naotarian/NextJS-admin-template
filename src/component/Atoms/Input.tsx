import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import TextField from '@mui/material/TextField'

/**
 * @/component/Atoms/DocMD/Input.md
 */
type CustomInputProps<Variant extends 'outlined' | 'filled' | 'standard'> =
  MuiTextFieldProps<Variant> & {
    maxLength?: number // 任意のプロパティを追加
    label?: string
    type?: string
  }

const Input = <Variant extends 'outlined' | 'filled' | 'standard'>({
  maxLength,
  onChange,
  variant = 'outlined',
  label,
  type = 'text',
  ...props
}: CustomInputProps<Variant>) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((prev) => !prev)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <TextField
      {...props}
      onChange={onChange}
      variant={variant}
      type={type === 'password' && !showPassword ? 'password' : 'text'}
      label={label}
      slotProps={{
        htmlInput: {
          maxLength
        },
        input:
          type === 'password'
            ? {
                endAdornment: (
                  <button
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      margin: 0
                    }}
                    aria-label={showPassword ? '表示' : '非表示'}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </button>
                )
              }
            : undefined
      }}
    />
  )
}

export default Input
