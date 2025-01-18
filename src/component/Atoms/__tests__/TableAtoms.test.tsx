import React from 'react'

import { render, screen } from '@testing-library/react'

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '../TableAtoms'

describe('TableAtoms', () => {
  test('TableContainerが正常にレンダリングされること', () => {
    render(
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Header 1</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Data 1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )

    // コンポーネントがレンダリングされることを確認
    expect(screen.getByText('Header 1')).toBeInTheDocument()
    expect(screen.getByText('Data 1')).toBeInTheDocument()
  })

  test('テーブルの子要素が正しくレンダリングされること', () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Header 1</TableCell>
            <TableCell>Header 2</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    )

    // ヘッダーのセルが正しくレンダリングされることを確認
    expect(screen.getByText('Header 1')).toBeInTheDocument()
    expect(screen.getByText('Header 2')).toBeInTheDocument()
  })

  test('レンダリングが正しいこと', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Row 1 Cell 1</TableCell>
            <TableCell>Row 1 Cell 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    // 行とセルの内容を確認
    expect(screen.getByText('Row 1 Cell 1')).toBeInTheDocument()
    expect(screen.getByText('Row 1 Cell 2')).toBeInTheDocument()
  })

  test('右寄せスタイルが適用されること', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align="right">Aligned Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    // スタイルで右寄せを確認
    const cell = screen.getByText('Aligned Cell')
    expect(window.getComputedStyle(cell).textAlign).toBe('right')
  })
})
