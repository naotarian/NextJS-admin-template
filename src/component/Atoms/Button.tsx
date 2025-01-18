import React from 'react'

import { Button, CircularProgress } from '@mui/material';

import type { ButtonProps } from '@mui/material/Button';

interface CustomButtonProps extends ButtonProps {
  label: string // ボタンのラベル
  isLoading?: boolean // ローディング状態フラグ
  fontWeight?: number // フォントの太さ
}

const CustomButton = ({
  label,
  isLoading = false,
  fontWeight = 500,
	variant = 'contained',
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      {...props}
			variant={variant}
      disabled={props.disabled || isLoading} // ローディング中または無効化フラグに基づいて disabled を設定
      aria-busy={isLoading} // アクセシビリティ対応
      sx={{
        fontWeight, // フォントの太さ
        textTransform: 'none', // テキストの大文字変換を無効化
        ...props.sx, // 外部からのカスタムスタイルを許容
      }}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : label}
    </Button>
  )
}

// React.memo を使用して不要な再レンダリングを防止
export default React.memo(CustomButton)
