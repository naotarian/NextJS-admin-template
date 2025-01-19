import type { Metadata } from 'next'


import Form from '@/app/employee/(auth)/login/Form'

export const generateMetadata = (): Metadata => {
  return {
    title: '従業員ログイン'
  }
}
export default function LoginPage() {
  console.log('LoginPage')
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="overMobile:max-w-[400px] mobile:max-w-[95%] mx-auto text-center">
        {/* クライアントコンポーネントを使用 */}
        <div className="my-2">
          <Form />
        </div>
      </div>
    </div>
  )
}
