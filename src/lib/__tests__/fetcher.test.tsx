import { HttpError } from '@/component/common/Exception/HttpError'

import { fetcher } from '@/lib/fetcher'
describe('fetcher 関数', () => {
  const mockFetch = jest.fn()

  beforeEach(() => {
    global.fetch = mockFetch
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Get', async () => {
    const mockResponse = { success: true }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    })

    const result = await fetcher<{ success: boolean }>({ url: '/test-url' })
    expect(result).toEqual(mockResponse)
    expect(mockFetch).toHaveBeenCalledWith('/test-url', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Referer: process.env.NEXT_PUBLIC_FRONTEND_URL!
      },
      cache: 'default'
    })
  })

  test('POST', async () => {
    const mockResponse = { success: true }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    })

    const result = await fetcher<{ success: boolean }>({
      url: '/test-url',
      method: 'POST',
      body: { key: 'value' }
    })

    expect(result).toEqual(mockResponse)
    expect(mockFetch).toHaveBeenCalledWith('/test-url', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Referer: process.env.NEXT_PUBLIC_FRONTEND_URL!
      },
      body: JSON.stringify({ key: 'value' }),
      cache: 'default'
    })
  })

  test('サーバーエラー時に HttpError をスローすること', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    })

    await expect(fetcher({ url: '/test-url' })).rejects.toThrowError(
      new HttpError('Internal Server Error', 500)
    )
  })

  test('クライアントエラー時に HttpError をスローすること', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400
    })

    await expect(fetcher({ url: '/test-url' })).rejects.toThrowError(
      new HttpError('An error occurred', 400)
    )
  })

  test('body が null の場合に適切に処理されること', async () => {
    const mockResponse = { success: true }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    })

    const result = await fetcher<{ success: boolean }>({
      url: '/test-url',
      method: 'POST',
      body: null
    })

    expect(result).toEqual(mockResponse)
    expect(mockFetch).toHaveBeenCalledWith('/test-url', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Referer: process.env.NEXT_PUBLIC_FRONTEND_URL!
      },
      cache: 'default'
    })
  })

  test('カスタムヘッダーが正しく適用されること', async () => {
    const mockResponse = { success: true }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    })

    const result = await fetcher<{ success: boolean }>({
      url: '/test-url',
      headers: {
        Authorization: 'Bearer token'
      }
    })

    expect(result).toEqual(mockResponse)
    expect(mockFetch).toHaveBeenCalledWith('/test-url', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
        'X-Requested-With': 'XMLHttpRequest',
        Referer: process.env.NEXT_PUBLIC_FRONTEND_URL!
      },
      cache: 'default'
    })
  })
})
