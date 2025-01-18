import { authCheckServer } from '@/lib/authCheckServer'
import Table from '@/component/Molecules/Table'
import { TableCell } from '@/component/Atoms/TableAtoms'
import AvatarWithInitials from '@/component/Atoms/AvatarWithInitials'
import theme from '@/component/(admin)/theme'
export default async function Home() {
  const headers = ['Name', 'Email', 'Location', 'Phone', 'Signed Up']
  const rows = [
    { name: 'John Doe', email: 'john@example.com', location: 'USA', phone: '123-456-7890', signedUp: '2023-01-01' },
    { name: 'Jane Smith', email: 'jane@example.com', location: 'Canada', phone: '987-654-3210', signedUp: '2023-02-15' },
    { name: 'Juan Pérez', email: 'juan@example.com', location: 'Mexico', phone: '555-555-5555', signedUp: '2023-03-10' }
  ]

  await authCheckServer()
  return (
    <div className="container mx-auto xl:max-w-screen-xl">
      <Table
        headers={headers}
        rows={rows}
        renderRow={(row) => (
          <>
            <TableCell sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AvatarWithInitials name={row.name} size={40} />
              {row.name}
            </TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.location}</TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell>{row.signedUp}</TableCell>
          </>
        )}
        headerStyles={(_, __) => ({
          fontWeight: 'bold',
          color: theme.palette.txGray.main, // ヘッダーの文字色
          backgroundColor: theme.palette.bgGray.main // ヘッダーの背景色
        })}
      />
    </div>
  )
}
