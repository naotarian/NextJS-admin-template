import React from 'react'
import {
  TableContainer as MuiTableContainer,
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  TableContainerProps,
  TableProps,
  TableBodyProps,
  TableCellProps,
  TableHeadProps,
  TableRowProps
} from '@mui/material'

// 汎用 Table コンポーネント
export const TableContainer: React.FC<TableContainerProps> = (props) => <MuiTableContainer {...props} />

// 汎用 Table コンポーネント
export const Table: React.FC<TableProps> = (props) => <MuiTable {...props} />

// 汎用 TableHead コンポーネント
export const TableHead: React.FC<TableHeadProps> = (props) => <MuiTableHead {...props} />

// 汎用 TableBody コンポーネント
export const TableBody: React.FC<TableBodyProps> = (props) => <MuiTableBody {...props} />

// 汎用 TableRow コンポーネント
export const TableRow: React.FC<TableRowProps> = (props) => <MuiTableRow {...props} />

// 汎用 TableCell コンポーネント
export const TableCell: React.FC<TableCellProps> = (props) => <MuiTableCell {...props} />
