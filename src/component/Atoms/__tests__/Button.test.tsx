import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import CustomButton from '../Button'

describe('CustomButtonコンポーネント', () => {
  it('ボタンが正しいラベルでレンダリングされることを確認', () => {
    render(<CustomButton label="Click Me" />)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('デフォルトのvariantが "contained" として適用されることを確認', () => {
    render(<CustomButton label="Click Me" />)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveClass('MuiButton-contained') // MUIのクラス名で検証
  })

  it('`isLoading` が true の場合にボタンが無効化されることを確認', () => {
    render(<CustomButton label="Click Me" isLoading />)
    const button = screen.getByRole('button') // 名前ではなく、role だけで検索
    expect(button).toBeDisabled() // ボタンが無効化されていることを確認
    expect(screen.getByRole('progressbar')).toBeInTheDocument() // CircularProgress が表示されていることを確認
  })

  it('`isLoading` が true の場合に CircularProgress が表示されることを確認', () => {
    render(<CustomButton label="Click Me" isLoading />)
    const spinner = screen.getByRole('progressbar') // CircularProgressのroleはprogressbar
    expect(spinner).toBeInTheDocument()
  })

  it('`isLoading` が false の場合に CircularProgress が表示されないことを確認', () => {
    render(<CustomButton label="Click Me" isLoading={false} />)
    const spinner = screen.queryByRole('progressbar')
    expect(spinner).not.toBeInTheDocument()
  })

  it('ボタンがクリックされたときに `onClick` ハンドラがトリガーされることを確認', () => {
    const handleClick = jest.fn()
    render(<CustomButton label="Click Me" onClick={handleClick} />)
    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('`sx` プロップで指定したカスタムスタイルが適用されることを確認', () => {
    render(<CustomButton label="Click Me" sx={{ backgroundColor: 'red' }} />)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveStyle('background-color: red')
  })
})
