import { HttpError } from '@/component/common/Exception/HttpError'

/**
 * FetcherOptions型定義
 * - URL: リクエスト先のURL
 * - method: HTTPメソッド（デフォルトはGET）
 * - headers: リクエストヘッダー
 * - body: リクエストボディ（JSON形式）
 * - cache: キャッシュポリシー
 */
type FetcherOptions = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: HeadersInit
  body?: Record<string, any> | null
  cache?: RequestCache
}

/**
 * 汎用的なHTTPリクエスト関数
 * @template T レスポンスの型
 * @param url リクエスト先のURL
 * @param method HTTPメソッド（デフォルト: GET）
 * @param headers カスタムヘッダー（デフォルト: JSON形式）
 * @param body リクエストボディ（オプション）
 * @param cache キャッシュポリシー（デフォルト: default）
 * @returns レスポンスのJSONを指定された型として返却
 * @throws HttpError サーバーエラーやクライアントエラー時
 */
export async function fetcher<T>({ url, method = 'GET', headers = {}, body = null, cache = 'default' }: FetcherOptions): Promise<T> {
  // デフォルトヘッダー設定
  const defaultHeaders = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers
  }

  // リクエストオプションの構築
  const options: RequestInit = {
    method,
    headers: defaultHeaders,
    cache
  }

  // bodyが指定されている場合はJSON文字列に変換して設定
  if (body) {
    options.body = JSON.stringify(body)
  }

  // リクエスト実行
  const response = await fetch(url, options)

  // レスポンスのステータスコードに基づくエラーハンドリング
  if (!response.ok) {
    if (response.status === 500) {
      throw new HttpError('Internal Server Error', response.status) // サーバーエラー時
    }
    throw new HttpError('An error occurred', response.status) // その他のエラー時
  }

  // レスポンスをJSON形式で返却
  return response.json()
}
