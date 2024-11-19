/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
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
  getFilteredRowModel,
  type SortingState,
  type ColumnResizeMode
} from '@tanstack/react-table'
import { BookOpen, ChevronsLeft, ChevronsRight, FileDown } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type ReactNode, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { CSVLink } from 'react-csv'

export interface CustomTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: TData[]
  isSearch?: boolean
  isLoading?: boolean
  filter?: ReactNode
}
export function CustomTable<TData, TValue> ({
  data,
  columns,
  isSearch = true,
  isLoading = false,
  filter
}: CustomTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onChange')

  const [pageNo, setPageNo] = useState(0)

  const defaultColumn = useMemo(() => ({
    minWidth: 30,
    width: 150,
    maxWidth: 400
  }), [])

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    columnResizeDirection: 'rtl',
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    enableSorting: true,
    manualSorting: true,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    }
  })
  const pageParams = useSearchParams()
  const page = pageParams.get('page')
  const pathname = usePathname()
  const router = useRouter()

  const updateQueryParams = useCallback(
    (newStep: number) => {
      const newPageParams = new URLSearchParams(pageParams)
      newPageParams.set('page', newStep as unknown as string)
      router.replace(`${pathname}?${newPageParams.toString()}`)
    },
    [pathname, router, pageParams]
  )
  useEffect(() => {
    const { pageIndex } = table.getState().pagination
    if (page === null) {
      updateQueryParams(pageIndex + 1)
    }
    setPageNo(pageIndex + 1)
    table.setPageIndex(Number(page) - 1)
  }, [page, table, updateQueryParams])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isSearch && !isLoading && (
        <div
          className="flex flex-row justify-between items-center
        p-4
        "
        >
          <input
            placeholder="Search.."
            className="border border-slate-200 h-8 rounded-lg p-2 pl-4
            text-[12px]
            "
            value={
              (table.getColumn('firstName')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('firstName')?.setFilterValue(event.target.value)
            }
          />

          <div className="flex flex-row space-x-4 items-center">
            <CSVLink data={data as object[]}>
              <Button
                className="bg-slate-100 text-slate-600 hover:bg-slate-200
                shadow-none font-bold
                "
                size={'sm'}
              >
                <FileDown size={15} className="mr-2" />
                Export
              </Button>
            </CSVLink>

            {filter && filter}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="ml-auto shadow-none"
                  size={'sm'}
                >
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
        {isLoading ? (
          <Table>
            <TableHeader>
              <TableRow>
                <Skeleton className='p-4 rounded-full mb-2' />
              </TableRow>
            </TableHeader>
            {Array.from({ length: 10 }).map((item, i) => (
              <TableRow
              key={i}
              >
                {Array.from({ length: 10 }).map((item, i) => (
                  <TableCell key={i}>
                    <Skeleton className="p-2" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </Table>
        ) : (
          <>
            <Table>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableHeader
                  key={headerGroup.id}
                  className="bg-gray-50 relative"
                >
                  <TableRow>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        {...{
                          colSpan: header.colSpan,
                          style: {
                            width: header.getSize()
                          }
                        }}
                        className="text-[12px] text-slate-700 capitalize overflow-hidden whitespace-nowrap overflow-ellipsis "
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        <div
                          className={` absolute right-0 bg-black cursor-col-resize select-none touch-none ${
                            header.column.getIsResizing() ? 'bg-blue-500' : ''
                          } ${
                            header.column.getCanSort() ? 'cursor-pointer' : ''
                          } `}
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          onClick={() =>
                            header.column.getToggleSortingHandler()
                          }
                          style={{
                            transform:
                              columnResizeMode === 'onEnd' &&
                              header.column.getIsResizing()
                                ? `translateX(${
                                    table.getState().columnSizingInfo
                                      .deltaOffset
                                  }px)`
                                : ''
                          }}
                        />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
              ))}

              {/* {isLoading
            ? <div>Loadin..</div>
            :  */}
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-[14px] overflow-hidden whitespace-nowrap overflow-ellipsis "
                        style={{
                          width: cell.column.getSize()
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
              {/* } */}
            </Table>
            <div className="flex gap-x-4 justify-between p-4 ">
              <div
                className="flex flex-row items-center text-slate-500
          gap-x-2
          "
              >
                <BookOpen size={15} />
                <p className="text-[12px]">
                  Page {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
                </p>
              </div>
              <div className="flex flex-row items-center space-x-4">
                <Button
                  onClick={() => {
                    table.previousPage()
                    updateQueryParams(pageNo - 1)
                  }}
                  disabled={!table.getCanPreviousPage()}
                  size={'sm'}
                  className="bg-slate-100 text-slate-500 hover:bg-slate-50 shadow-none"
                >
                  <ChevronsLeft size={15} />
                  Prev
                </Button>
                <Button
                  className="bg-slate-100 text-slate-500 hover:bg-slate-50 shadow-none"
                  onClick={() => {
                    table.nextPage()
                    updateQueryParams(pageNo + 1)
                  }}
                  disabled={!table.getCanNextPage()}
                  size={'sm'}
                >
                  Next
                  <ChevronsRight size={15} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Suspense>
  )
}
