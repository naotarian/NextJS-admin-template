import { Suspense } from 'react'

import type { Metadata } from 'next'

import { headers } from 'next/headers'
import '@/app/globals.css'

import SidebarDesktop from '@/component/common/SidebarDesktop'
import SidebarMobile from '@/component/common/SidebarMobile'
import { ThemeProvider } from '@/component/common/ThemeProvider'

import LoadingComponent from '@/component/Atoms/LoadingComponent'

export const metadata: Metadata = {
  title: 'Dental Management',
  description: '管理画面'
}

const ignorePaths = ['/employee/login', '/employee/register']
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()
  // read the custom x-url header
  const header_url = headersList.get('x-pathname') || ''
  return (
    <html lang="ja">
      <ThemeProvider>
        <body>
          <div className="xl:mt-[60px]">
            <Suspense
              fallback={
                <LoadingComponent type="circular" message="読み込み中..." />
              }
            >
              {!ignorePaths.includes(header_url) && (
                <>
                  <SidebarDesktop />
                  <SidebarMobile />
                </>
              )}
              {/* メインコンテンツ */}
              <main className="flex-1 xl:mt-[60px]">{children}</main>
            </Suspense>
          </div>
        </body>
      </ThemeProvider>
    </html>
  )
}
