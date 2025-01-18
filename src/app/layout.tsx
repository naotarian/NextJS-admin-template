import { Suspense } from 'react'

import type { Metadata } from 'next'

import { Geist, Geist_Mono } from 'next/font/google'

import '@/app/globals.css'

import SidebarDesktop from '@/component/common/SidebarDesktop'
import SidebarMobile from '@/component/common/SidebarMobile'

import { ThemeProvider } from '@/component/common/ThemeProvider'
import LoadingComponent from '@/component/Atoms/LoadingComponent'

export const metadata: Metadata = {
  title: 'Dental Management',
  description: '管理画面'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <ThemeProvider>
        <body>
          <div className="xl:mt-[60px]">
            <Suspense fallback={<LoadingComponent type="circular" message="読み込み中..." />}>
              <SidebarDesktop />
              <SidebarMobile />
              {/* メインコンテンツ */}
              <main className="flex-1 xl:mt-[60px]">{children}</main>
            </Suspense>
          </div>
        </body>
      </ThemeProvider>
    </html>
  )
}
