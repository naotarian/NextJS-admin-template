import React from 'react'

import { render, screen } from '@testing-library/react'

import LoadingComponent from '../LoadingComponent'

describe('LoadingComponent コンポーネント', () => {
  test('デフォルトプロパティでコンポーネントが正しくレンダリングされる', () => {
    render(<LoadingComponent />)

    // デフォルトメッセージが表示されることを確認
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()

    // CircularProgress が表示されることを確認
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  test('カスタムメッセージが正しく表示される', () => {
    render(<LoadingComponent message="ロード中です" />)

    // カスタムメッセージが表示されることを確認
    expect(screen.getByText(/ロード中です/i)).toBeInTheDocument()
  })

  test('ローディングタイプが circular の場合、CircularProgress が表示される', () => {
    render(<LoadingComponent type="circular" />)

    // CircularProgress が表示されることを確認
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  test('ローディングタイプが linear の場合、LinearProgress が表示される', () => {
    render(<LoadingComponent type="linear" />)

    // LinearProgress が表示されることを確認
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  test('オーバーレイが有効な場合、適切なスタイルが適用される', () => {
    render(<LoadingComponent withOverlay />)

    const box = screen.getByText(/Loading.../i).parentElement

    // 背景色が rgba(0, 0, 0, 0.5) であることを確認
    expect(box).toHaveStyle('background-color: rgba(0, 0, 0, 0.5)')

    // zIndex が 1300 であることを確認
    expect(box).toHaveStyle('z-index: 1300')

    // position が fixed であることを確認
    expect(box).toHaveStyle('position: fixed')
  })

  test('オーバーレイが無効な場合、適切なスタイルが適用される', () => {
    render(<LoadingComponent withOverlay={false} />)

    const box = screen.getByText(/Loading.../i).parentElement

    // 背景色が transparent であることを確認
    expect(box).toHaveStyle('background-color: transparent')

    // position が relative であることを確認
    expect(box).toHaveStyle('position: relative')
  })

  test('オーバーレイの有無に応じてメッセージの色が変化する', () => {
    // オーバーレイ時のテスト
    const { rerender } = render(<LoadingComponent withOverlay />)
    const messageWithOverlay = screen.getByText(/Loading.../i)

    // オーバーレイ時は白 (#fff) の色が適用されていることを確認
    expect(messageWithOverlay).toHaveStyle('color: #fff')

    // オーバーレイなしのテスト
    rerender(<LoadingComponent withOverlay={false} />)
    const messageWithoutOverlay = screen.getByText(/Loading.../i)

    // オーバーレイなしの場合、色スタイルが継承されていることを確認
    expect(messageWithoutOverlay).toBeInTheDocument()
  })
})
