import React from 'react'

import { render, screen } from '@testing-library/react'

import theme from '@/component/common/theme'

import { TableCell } from '@/component/Atoms/TableAtoms'
import CustomTable from '@/component/Molecules/Table'
interface TestData {
  name: string
  age: number
}

const headers = ['Name', 'Age']
const rows: TestData[] = [
  { name: 'John Doe', age: 28 },
  { name: 'Jane Smith', age: 34 }
]

describe('CustomTable', () => {
  test('TableHeaderにカスタムスタイルが適用されること', () => {
    render(
      <CustomTable
        headers={['Name', 'Age']}
        rows={[{ name: 'John', age: 25 }]}
        renderRow={(row) => (
          <>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.age}</TableCell>
          </>
        )}
        headerStyles={() => ({
          fontWeight: 'bold',
          color: theme.palette.txGray.main, // ヘッダーの文字色
          backgroundColor: theme.palette.bgGray.main // ヘッダーの背景色
        })}
      />
    )

    const nameHeader = screen.getByText('Name')
    const ageHeader = screen.getByText('Age')

    // 修正: フォントウェイトを 700 に変更
    expect(nameHeader).toHaveStyle('font-weight: 700')
    expect(ageHeader).toHaveStyle(
      `background-color: ${theme.palette.bgGray.main}`
    )
  })
})
