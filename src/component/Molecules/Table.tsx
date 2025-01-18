import React from 'react'

import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@/component/Atoms/TableAtoms'

interface CustomTableProps<T> {
  headers: string[]
  rows: T[]
  renderRow: (row: T) => React.ReactNode
  rowStyles?: (row: T, rowIndex: number) => object // sx を動的に指定できる関数
  headerStyles?: (header: string, index: number) => object // TableHead にスタイルを動的に適用
}

const CustomTable = <T,>({
  headers,
  rows,
  renderRow,
  rowStyles,
  headerStyles
}: CustomTableProps<T>) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell
                key={index}
                sx={headerStyles ? headerStyles(header, index) : {}}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              hover
              sx={rowStyles ? rowStyles(row, rowIndex) : {}}
            >
              {renderRow(row)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomTable
