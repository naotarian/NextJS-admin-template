'use client'
import { useState, useEffect } from 'react'

export type DeviceType = 'desktop' | 'tablet' | 'mobile' | ''

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>('')

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width >= 1024) {
        setDeviceType('desktop')
      } else if (width >= 768) {
        setDeviceType('tablet')
      } else {
        setDeviceType('mobile')
      }
    }

    // 初回判定
    handleResize()

    // リサイズ時に判定
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return deviceType
}
