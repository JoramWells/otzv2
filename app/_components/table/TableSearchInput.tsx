/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { type ReactNode, type Dispatch, type SetStateAction, type ChangeEvent } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu'
import { CSVLink } from 'react-csv'

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { FileDown, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type ColumnDef, type Table } from '@tanstack/react-table'

interface TableSearchInputProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  search?: string
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
  setSearch: Dispatch<SetStateAction<string>> | undefined
  filter?: ReactNode
  data: TData[]
  table: Table<TData>
}

function TableSearchInput<TData, TValue> ({ search, handleSearch, setSearch, filter, data, table }: TableSearchInputProps<TData, TValue>) {
  return (
    <div
      className="flex flex-row justify-between items-center
        p-4 pl-0 pr-0
        "
    >
      <div className="flex flex-row space-x-2 items-center pl-2 pr-2">
        <div className="flex items-center flex-row  border border-slate-200 rounded-lg focus-within:ring focus-within:border focus-within:ring-slate-50">
          <Search size={16} className="ml-2 text-slate-500" />
          <input
            placeholder="Search.."
            className="border-none outline-none h-8 rounded-lg p-2
            text-[12px] flex-1 ml-2
            "
            value={search}
            onChange={handleSearch}
          />
          {search && search?.length > 0 && (
            <X
              size={16}
              className="text-slate-500 mr-2"
              onClick={() => setSearch?.('')}
            />
          )}
        </div>
        {filter && filter}
      </div>

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-auto shadow-none" size={'sm'}>
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
  )
}

export default TableSearchInput
