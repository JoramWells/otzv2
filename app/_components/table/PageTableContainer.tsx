import { Badge } from '@/components/ui/badge'
import React, { type Dispatch, type SetStateAction, type ReactNode } from 'react'
import { CustomTable } from './CustomTable'
import { type ColumnDef } from '@tanstack/react-table'

interface PageContainerInputProps<TData, TValue> {
  title: string
  total: number
  rightLabel?: ReactNode
  columns: Array<ColumnDef<TData, TValue>>
  data: TData[]
  filter: ReactNode
  search: string
  setSearch: Dispatch<SetStateAction<string>> | undefined
  isLoading: boolean
}

function PageTableContainer<TData, Tvalue> ({ rightLabel, title, total, columns, data, filter, search, setSearch, isLoading }: PageContainerInputProps<TData, Tvalue>) {
  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div
        className="p-2 pb-1 pt-1 flex
           flex-row space-x-2 items-center bg-slate-50 border-b rounded-t-lg justify-between"
      >
        <div className="flex flex-row space-x-2 items-center">
          <p className="text-slate-700 text-[16px] ">{title}</p>
          <Badge className="bg-slate-200 hover:bg-slate-100 text-slate-700 shadow-none">
            {total}
          </Badge>
        </div>
        <div className="flex flex-row items-center space-x-2">
 {rightLabel}
        </div>
      </div>
      <CustomTable
        columns={columns}
        data={data ?? []}
        total={total}
        isLoading={isLoading}
        search={search}
        setSearch={setSearch}
        filter={filter}

        // isSearch
      />
    </div>
  )
}

export default PageTableContainer
