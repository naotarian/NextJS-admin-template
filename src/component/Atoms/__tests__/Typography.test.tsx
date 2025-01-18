import React from 'react'

import { render, screen } from '@testing-library/react'

import { CustomTypography } from '../Typography' // テスト対象のコンポーネント
import '@testing-library/jest-dom'

describe('CustomTypography', () => {
  test('renders with default variant (body1)', () => {
    render(<CustomTypography>Default Body</CustomTypography>)

    const typographyElement = screen.getByText('Default Body')
    expect(typographyElement).toBeInTheDocument()
    expect(typographyElement.tagName).toBe('P') // デフォルトの body1 は <p> タグになる
  })

  test('renders with specified variant (h1)', () => {
    render(<CustomTypography variant="h1">Heading 1</CustomTypography>)

    const typographyElement = screen.getByText('Heading 1')
    expect(typographyElement).toBeInTheDocument()
    expect(typographyElement.tagName).toBe('H1') // h1 は <h1> タグになる
  })

  test('renders with custom variant (body3)', () => {
    render(<CustomTypography variant="body3">Custom Body3</CustomTypography>)

    const typographyElement = screen.getByText('Custom Body3')
    expect(typographyElement).toBeInTheDocument()
    // タグ名が <p> かどうかはテーマ設定に依存するため柔軟に確認
    expect(typographyElement).toHaveClass('MuiTypography-body3') // className を確認
  })

  test('applies additional props (className and sx)', () => {
    render(
      <CustomTypography
        variant="h2"
        className="custom-class"
        sx={{ color: 'red' }}
      >
        Custom Styled Heading
      </CustomTypography>
    )

    const typographyElement = screen.getByText('Custom Styled Heading')
    expect(typographyElement).toBeInTheDocument()
    expect(typographyElement.tagName).toBe('H2') // h2 は <h2> タグになる
    expect(typographyElement).toHaveClass('custom-class') // className を確認
  })

  test('renders children correctly', () => {
    render(<CustomTypography variant="caption">Caption Text</CustomTypography>)

    const typographyElement = screen.getByText('Caption Text')
    expect(typographyElement).toBeInTheDocument()
  })
})
