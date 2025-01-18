import React from 'react'
import { render, screen } from '@testing-library/react'
import CustomTable from '@/component/Molecules/Table'
import { TableCell } from '@/component/Atoms/TableAtoms'
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
        headerStyles={(header) => ({
          fontWeight: header === 'Name' ? 'bold' : 'normal',
          backgroundColor: header === 'Age' ? '#f0f0f0' : 'transparent'
        })}
      />
    )

    const nameHeader = screen.getByText('Name')
    const ageHeader = screen.getByText('Age')

    // 修正: フォントウェイトを 700 に変更
    expect(nameHeader).toHaveStyle('font-weight: 700')
    expect(ageHeader).toHaveStyle('background-color: #f0f0f0')
  })
})
