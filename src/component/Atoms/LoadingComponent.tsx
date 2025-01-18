import React from 'react'

import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from '@mui/material'

interface LoadingComponentProps {
  message?: string // 表示するメッセージ
  type?: 'circular' | 'linear' // ローディングタイプ
  withOverlay?: boolean // 背景を暗くするオーバーレイを表示するか
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  message = 'Loading...',
  type = 'circular',
  withOverlay = false,
}) => {
  return (
    <Box
      position={withOverlay ? 'fixed' : 'relative'}
      top={0}
      left={0}
      width={withOverlay ? '100vw' : '100%'}
      height={withOverlay ? '100vh' : '100%'}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent={type === 'circular' ? 'center' : 'flex-start'}
      bgcolor={withOverlay ? 'rgba(0, 0, 0, 0.5)' : 'transparent'}
      zIndex={withOverlay ? 1300 : 'auto'} // オーバーレイ時は最前面に配置
    >
      {type === 'circular' ? (
        <CircularProgress style={{ color: '#333' }} />
      ) : (
        <LinearProgress style={{ width: '100%' }} />
      )}
      <Typography
        variant="body1"
        mt={type === 'circular' ? 2 : 1}
        style={{ color: withOverlay ? '#fff' : 'inherit' }}
      >
        {message}
      </Typography>
    </Box>
  )
}

export default LoadingComponent
