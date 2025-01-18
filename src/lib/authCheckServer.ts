import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getAllCookies } from '@/lib/getAllCookies'


export const authCheckServer = async () => {
  const serverUrl = process.env.NEXT_PUBLIC_CONTAINER_ROOT
  const cookie = await getAllCookies()
  const headersData = await headers() // headers() の結果を await で取得
  const pathname = headersData.get('x-pathname') || '' // 解決後に get を呼び出す

  const options: RequestInit = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      cookie,
      Referer: process.env.NEXT_PUBLIC_FRONTEND_URL!,
    },
    credentials: 'include',
    cache: 'no-store',
  }
  const res = await fetch(`${serverUrl}/api/user`, options)
  if (res.status !== 200) {
    if (pathname) {
      redirect(`/employee/login?redirect=${pathname}`)
    }
    redirect(`/employee/login`)
  }

  return await res.json()
}

export const getUserServer = async () => {
  const serverUrl = process.env.NEXT_PUBLIC_CONTAINER_ROOT
  const cookie = await getAllCookies()
  // const headersData = await headers() // headers() の結果を await で取得

  const options: RequestInit = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      cookie,
      Referer: process.env.NEXT_PUBLIC_FRONTEND_URL!,
    },
    credentials: 'include',
    cache: 'no-store',
  }
  const res = await fetch(`${serverUrl}/api/user`, options)
  if (res.status !== 200) {
    return null
  }
  return await res.json()
}
