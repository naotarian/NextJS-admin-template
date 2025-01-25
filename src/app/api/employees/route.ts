import { NextResponse } from 'next/server'

import { fetcher } from '@/lib/fetcher'
import { getAllCookies } from '@/lib/getAllCookies'
export async function GET(request: Request) {
  const cookie = await getAllCookies()
  const { searchParams } = new URL(request.url)
  const dentalOfficeId = searchParams.get('dentalOfficeId')
  const serverUrl = process.env.NEXT_PUBLIC_CONTAINER_ROOT

  const apiURL = serverUrl + `/api/employees/${dentalOfficeId}`

  const employees = await fetcher({ url: apiURL, headers: { cookie } })
  return NextResponse.json(employees, { status: 200 })
}

export async function POST() {
  return NextResponse.json(
    { message: 'POST method not implemented' },
    { status: 501 }
  )
}
