import { cookies } from 'next/headers'

export const getAllCookies = async (): Promise<string> => {
  const cookieStore = await cookies() // 非同期で解決
  const cookie = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join(';')
  return cookie
}
