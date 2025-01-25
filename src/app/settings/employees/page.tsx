import type { Metadata } from 'next'

import theme from '@/component/common/theme'

import AvatarWithInitials from '@/component/Atoms/AvatarWithInitials'
import { TableCell } from '@/component/Atoms/TableAtoms'
import { CustomTypography } from '@/component/Atoms/Typography'
import Table from '@/component/Molecules/Table'

import { authCheckServer } from '@/lib/authCheckServer'
import { fetcher } from '@/lib/fetcher'
import { getAllCookies } from '@/lib/getAllCookies'

import type { Employee } from '@/types/EmployeeType'
export const generateMetadata = (): Metadata => {
  return {
    title: '従業員管理'
  }
}

export default async function Home() {
  const user = await authCheckServer()
  const cookie = await getAllCookies()
  const apiRoute =
    process.env.NEXT_PUBLIC_FRONTEND_URL +
    `/api/employees?dentalOfficeId=${user.dental_office_id}`
  const employees: Employee[] = await fetcher({
    url: apiRoute,
    headers: { cookie }
  })
  console.log(Array.isArray(employees))
  const headers = ['Name', 'Email', 'Location', 'Phone', 'Signed Up']

  return (
    <div className="container mx-auto xl:max-w-screen-xl">
      <div className="mb-4">
        <CustomTypography
          variant="h5"
          sx={{
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            paddingBottom: '4px',
            width: 'fit-content'
          }}
        >
          従業員一覧
        </CustomTypography>
      </div>

      <Table
        headers={headers}
        rows={employees}
        renderRow={(row) => (
          <>
            <TableCell
              sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <AvatarWithInitials name={row.name} size={40} />
              {row.name}
            </TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>{row.name}</TableCell>
          </>
        )}
        headerStyles={() => ({
          fontWeight: 'bold',
          color: theme.palette.txGray.main, // ヘッダーの文字色
          backgroundColor: theme.palette.bgGray.main // ヘッダーの背景色
        })}
      />
    </div>
  )
}
