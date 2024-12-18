/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type ChangeEvent, type Dispatch, type ReactNode, type SetStateAction, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import TableSkeleton from './TableSkeleton'
import TableSearchInput from './TableSearchInput'
import TableFooter from './TableFooter'
export interface CustomTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: TData[]
  isSearch?: boolean
  isLoading?: boolean
  total?: number
  filter?: ReactNode
  search?: string
  setSearch?: Dispatch<SetStateAction<string>>
  debounceSearch?: (value: string) => void
}
export function CustomTable<TData, TValue> ({
  data,
  columns,
  isSearch = true,
  isLoading = false,
  filter,
  total,
  search,
  setSearch,
  debounceSearch
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

  const pageParams = useSearchParams()
  const page = pageParams.get('page')

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch && setSearch(value)
    // debounceSearch && debounceSearch(value)
  }

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    pageCount: total && Math.ceil(total / 10),
    columnResizeDirection: 'rtl',
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    enableSorting: true,
    manualSorting: true,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: { pageIndex: page as unknown as number - 1, pageSize: 10 }
    }
  })

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
      updateQueryParams(1)
    }
    setPageNo(pageIndex + 1)
    table.setPageIndex(Number(page) - 1)
  }, [page, table, updateQueryParams])

  return (
    <Suspense fallback={<TableSkeleton isSearch={true} />}>
      {isSearch && (
        <TableSearchInput
          columns={columns}
          data={data}
          handleSearch={handleSearch}
          setSearch={setSearch}
          table={table}
          filter={filter}
          search={search}
        />
      )}

      {/*  */}
      <div
        className="bg-white
    rounded-md
    "
      >
        {isLoading ? (
          <TableSkeleton />
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
                        onClick={header.column.getToggleSortingHandler()}
                        {...{
                          colSpan: header.colSpan,
                          style: {
                            width: header.getSize()
                          }
                        }}
                        className="text-[12px] text-slate-700 capitalize overflow-hidden whitespace-nowrap overflow-ellipsis "
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽'
                        }[header.column.getIsSorted() as string] ?? null}
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
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === 'asc'
                                ? 'Sort ascending'
                                : header.column.getNextSortingOrder() === 'desc'
                                  ? 'Sort descending'
                                  : 'Clear sort'
                              : undefined
                          }
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
            <TableFooter
              pageNo={pageNo}
              table={table}
              updateQueryParams={updateQueryParams}
            />
          </>
        )}
      </div>
    </Suspense>
  )
}
