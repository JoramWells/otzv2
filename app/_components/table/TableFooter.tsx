import { Button } from '@/components/ui/button'
import { type Table } from '@tanstack/react-table'
import { BookOpen, ChevronsLeft, ChevronsRight } from 'lucide-react'
import React from 'react'

interface TableFooterInputProps<TData> {
  table: Table<TData>
  pageNo: number
  updateQueryParams: (pageNo: number) => void
}

function TableFooter<TData> ({ table, pageNo, updateQueryParams }: TableFooterInputProps<TData>) {
  return (
    <div className="flex gap-x-4 justify-between p-4 pt-2 pb-2 border-t border-slate-100 ">
      <div
        className="flex flex-row items-center text-slate-500
          gap-x-2
          "
      >
        <BookOpen size={14} />
        <p className="text-[12px]">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </p>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <Button
          onClick={() => {
            table.previousPage()
            updateQueryParams(pageNo - 1)
          }}
          disabled={!table.getCanPreviousPage()}
          size={'sm'}
          // className="bg-slate-100 text-slate-500 hover:bg-slate-50 shadow-none"
          variant={'outline'}
        >
          <ChevronsLeft size={14} />
          Prev
        </Button>
        <Button
          // className="bg-slate-100 text-slate-500 hover:bg-slate-50 shadow-none"
          variant={'outline'}
          onClick={() => {
            table.nextPage()
            updateQueryParams(pageNo + 1)
          }}
          disabled={!table.getCanNextPage()}
          size={'sm'}
        >
          Next
          <ChevronsRight size={14} />
        </Button>
      </div>
    </div>
  )
}

export default TableFooter
