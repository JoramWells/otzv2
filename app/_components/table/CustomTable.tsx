/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import {
  useReactTable,
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type VisibilityState,
  getPaginationRowModel,
  type ColumnFiltersState,
  getFilteredRowModel
} from '@tanstack/react-table'
import { BookOpen, Download } from 'lucide-react'
import { useState } from 'react'
import { CSVLink } from 'react-csv'

interface CustomTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: TData[]
  isSearch?: boolean

}
export function CustomTable<TData, TValue> ({
  data,
  columns,
  isSearch = true
}: CustomTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})

  const [columnVisibility, setColumnVisibility] =
      useState<VisibilityState>({})

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility,
      rowSelection,
      columnFilters
    }
  })

  return (
    <div>
      {isSearch && (
        <div
          className="flex flex-row justify-between items-center
        mb-4
        "
        >
          <input
            placeholder="Search patient name"
            className="border h-10 rounded-md p-1"
            value={
              (table.getColumn('patient_name')?.getFilterValue() as string) ??
              ''
            }
            onChange={(event) =>
              table
                .getColumn('patient_name')
                ?.setFilterValue(event.target.value)
            }
          />

          <div className="flex flex-row space-x-4 items-center">
            <CSVLink data={data as object[]}>
              <Button
                // size={'sm'}
                className="bg-slate-100 text-slate-600 hover:bg-slate-200
                shadow-none font-bold
                "
                // rounded={'full'}
                // color={'gray.500'}
                // leftIcon={<ArrowDownToLine size={20} />}
              >
                <Download size={18} className='mr-2' />
                Download
              </Button>
            </CSVLink>
            {/* <Button
              size={'sm'}
              // rounded={'full'}
              // color={'gray.500'}
              // leftIcon={<Printer size={20} />}
            >
              Print
            </Button> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => {
                          column.toggleVisibility(!!value)
                        }}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {/*  */}
      <div
        className="bg-white
    rounded-md
    "
      >
        <Table>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeader key={headerGroup.id} className="bg-gray-50">
              <TableRow>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      fontSize: '12px'
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          ))}
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-[14px]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex gap-x-4 mt-4 justify-between">
          <div
            className="flex flex-row items-center text-slate-500
          gap-x-2
          "
          >
            <BookOpen size={20} />
            <p className="text-sm">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </p>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <Button
              onClick={() => {
                table.previousPage()
              }}
              // isDisabled={!table.getCanPreviousPage()}
              size={'sm'}
            >
              Prev
            </Button>
            <Button
              onClick={() => {
                table.nextPage()
              }}
              // isDisabled={!table.getCanNextPage()}
              size={'sm'}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
