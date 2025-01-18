'use client'

import React, { useState, useEffect } from 'react'

import Typography from '@mui/material/Typography'

const DateTimeDisplay: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null)

  useEffect(() => {
    // クライアントサイドでのみ実行される
    setCurrentDateTime(new Date())

    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer) // クリーンアップ
  }, [])

  if (!currentDateTime) {
    // サーバーサイドレンダリング時には何も表示しない
    return null
  }

  const getJapaneseWeekday = (date: Date): string => {
    const weekdays = ['日', '月', '火', '水', '木', '金', '土']
    return `(${weekdays[date.getDay()]})`
  }

  const formattedDate = `${currentDateTime.getFullYear()}年${
    currentDateTime.getMonth() + 1
  }月${currentDateTime.getDate()}日${getJapaneseWeekday(currentDateTime)}`
  const formattedTime = currentDateTime.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      <Typography variant="h5" gutterBottom>
        {formattedDate}
      </Typography>
      <Typography variant="h6" color="textSecondary">
        {formattedTime}
      </Typography>
    </div>
  )
}

export default DateTimeDisplay
