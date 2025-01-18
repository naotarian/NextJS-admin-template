import type { Metadata } from 'next'

import LoadingComponent from '@/component/Atoms/LoadingComponent'

import Form from '@/app/employee/(auth)/login/Form'

export const generateMetadata = (): Metadata => {
  return {
    title: '従業員ログイン'
  }
}
export default function LoginPage() {
  console.log('LoginPage')
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h1>従業員ログイン</h1>
      {/* クライアントコンポーネントを使用 */}
      <div className="my-2">
        <LoadingComponent type="circular" message="データを読み込み中です..." />
        {/* <LoadingComponent type="circular" message="読み込み中..." withOverlay /> */}
        <Form />
      </div>
    </div>
  )
}
