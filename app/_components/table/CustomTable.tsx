import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useReactTable, type ColumnDef, getCoreRowModel, flexRender } from '@tanstack/react-table'

interface CustomTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: TData[]

}
export function CustomTable<TData, TValue> ({
  data,
  columns
}: CustomTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <TableContainer className="bg-white">
      <Table
      size={'md'}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <Thead key={headerGroup.id}
          bgColor={'gray.50'}
          >
            <Tr>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} style={{
                  fontSize: '14px'
                }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </Th>
              ))}
            </Tr>
          </Thead>
        ))}
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id} >
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id} fontSize="14px">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
