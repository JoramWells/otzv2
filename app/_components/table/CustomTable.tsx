/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Table, TableContainer, Tbody, Td, Th, Thead, Tr,
  Button, Menu, MenuButton, MenuList, MenuDivider, Checkbox
} from '@chakra-ui/react'
import {
  useReactTable, type ColumnDef, getCoreRowModel,
  getSortedRowModel, flexRender, type VisibilityState
} from '@tanstack/react-table'
import { ChevronDownIcon, Trash2, ArrowDownToLine } from 'lucide-react'
import { useState } from 'react'
import { CSVLink } from 'react-csv'

interface CustomTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: TData[]

}
export function CustomTable<TData, TValue> ({
  data,
  columns
}: CustomTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})

  const [columnVisibility, setColumnVisibility] =
      useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div>
      <div
        className="flex flex-row justify-between items-center
        mb-4
        "
      >
        <input
          placeholder="Search patient name"
          className="border h-10 rounded-md p-1"
        />

        <div className="flex flex-row space-x-2 items-center">
          <CSVLink data={data}>
            <ArrowDownToLine className="bg-slate-50 p-1 h-8 rounded-md w-8 hover:cursor-pointer hover:bg-slate-100" />
          </CSVLink>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon size={15} />}
              size={'sm'}
              // colorScheme="teal"
              bgColor={'white'}
              borderColor={'black'}
              variant={'outline'}
            >
              Columns
            </MenuButton>
            <MenuList className="flex flex-col p-2 gap-y-3">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <Checkbox
                    className="text-black capitalize"
                    colorScheme="teal"
                    key={column.id}
                    checked={column.getIsVisible()}
                    onChange={(value: any) => {
                      column.toggleVisibility(!value)
                    }}
                  >
                    {column.id}
                  </Checkbox>
                ))}
              <MenuDivider />
              <div className="text-center m-0 p-0 flex flex-row items-center text-gray-500  hover:cursor-pointer">
                <Trash2 size={18} className="mr-2" />
                Clear
              </div>
            </MenuList>
          </Menu>
        </div>
      </div>

      {/*  */}
      <TableContainer
        className="bg-white border
    rounded-md
    "
      >
        <Table size={'md'}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Thead key={headerGroup.id} bgColor={'gray.50'}>
              <Tr>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    style={{
                      fontSize: '14px'
                    }}
                  >
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
              <Tr key={row.id}>
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
    </div>
  )
}
