import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  // `pathname` のみを取得
  const { pathname } = new URL(request.url)

  // 現在のヘッダーを取得し、`x-pathname` を設定
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders
    }
  })
}
