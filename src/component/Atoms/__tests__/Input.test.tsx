import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import Input from '../Input'

describe('Input Component', () => {
  it('ラベルが正しく表示される', () => {
    render(<Input label="パスワード" />)
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument()
  })

  it('`type="password"`の場合、初期状態で入力値が隠されており、目のアイコンボタンがOFFの状態で表示されている', () => {
    render(<Input label="パスワード" type="password" />)

    const input = screen.getByLabelText('パスワード') as HTMLInputElement
    expect(input.type).toBe('password')

    const toggleButton = screen.getByRole('button')
    expect(toggleButton).toBeInTheDocument()
    expect(toggleButton).toContainHTML('svg') // アイコンが含まれているか確認
    expect(toggleButton).toHaveAccessibleName('非表示') // ボタンのアクセシブルネームを確認
  })

  it('目のアイコンをクリックすると入力値が表示される', () => {
    render(<Input label="パスワード" type="password" />)
    const toggleButton = screen.getByRole('button')
    fireEvent.click(toggleButton)
    const input = screen.getByLabelText('パスワード') as HTMLInputElement
    expect(input.type).toBe('text')
  })

  it('`type="text"`の場合、目のアイコンが表示されない', () => {
    render(<Input label="名前" type="text" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('`maxLength`が正しく適用される', () => {
    render(<Input label="パスワード" type="password" maxLength={10} />)
    const input = screen.getByLabelText('パスワード') as HTMLInputElement
    expect(input.maxLength).toBe(10)
  })

  it('`onChange`が正しく呼び出される', () => {
    const handleChange = jest.fn()
    render(<Input label="パスワード" type="password" onChange={handleChange} />)
    const input = screen.getByLabelText('パスワード')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
