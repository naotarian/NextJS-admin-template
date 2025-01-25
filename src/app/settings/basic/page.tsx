import type { Metadata } from 'next'

import { CustomTypography } from '@/component/Atoms/Typography'

import { authCheckServer } from '@/lib/authCheckServer'


export const generateMetadata = (): Metadata => {
  return {
    title: '基本設定'
  }
}
export default async function Page() {
  await authCheckServer()
  return (
    <div
      style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}
    >
      <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
        <CustomTypography variant="body1">基本設定</CustomTypography>
      </div>
    </div>
  )
}
