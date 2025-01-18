import type { Metadata } from 'next'

import { authCheckServer } from '@/lib/authCheckServer'

import DateTimeDisplay from '@/app/employee/attendance/DateTimeDisplay'
import Operation from '@/app/employee/attendance/Operation'

export const generateMetadata = (): Metadata => {
  return {
    title: '勤怠管理'
  }
}
export default async function Page() {
  await authCheckServer()
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      {/* クライアントコンポーネントを使用 */}
      <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
        <DateTimeDisplay />
        <Operation />
      </div>
    </div>
  )
}
