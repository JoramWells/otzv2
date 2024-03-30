/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Checkbox } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import { Trash2, Pencil } from 'lucide-react'
// import { FaEdit } from 'react-icons/fa'

interface ColumnProps {
  schoolTerm: any
  schoolCategory: any
  schoolSubCategory: any
  header: string
  accessorKey?: keyof CurriculumProps
  render?: (props: CurriculumProps) => React.ReactNode
}

export interface CurriculumProps {
  id?: string
  categoryDescription?: string
  // action?: React.ReactNode
}

export const curriculumCategoryColumns: Array<ColumnDef<ColumnProps>> = [
  {
    id: 'useId()',
    header: ({ table }) => (
      <Checkbox
        // checked={
        //   table.getIsAllPageRowsSelected() ||
        //   (table.getIsSomePageRowsSelected() && 'indeterminate')
        // }
        onChange={(value) => {
          table.toggleAllPageRowsSelected(!value)
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={(value) => {
          row.toggleSelected(!value)
        }}
        aria-label="Select row"
      />
    )
  },
  {
    accessorKey: 'categoryDescription',
    header: 'Description',
    cell: ({ row }) => (
      <p className="font-bold text-slate-700">
        {row.getValue('categoryDescription')}
      </p>
    )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: () => (
      <div
      className='flex flex-row gap-x-2'
      >
        <Pencil className="bg-slate-100 text-slate-500 p-1 hover:cursor-pointer hover:text-slate-700 rounded-md" size={25} />
        <Trash2 className="bg-slate-100 text-slate-500 p-1 hover:cursor-pointer hover:text-slate-700 rounded-md" size={25} />
      </div>
    )
  }
]

export const curriculumSubCategoryColumns: Array<ColumnDef<ColumnProps>> = [
  {
    id: 'useId()',
    header: ({ table }) => (
      <Checkbox
        // checked={
        //   table.getIsAllPageRowsSelected() ||
        //   (table.getIsSomePageRowsSelected() && 'indeterminate')
        // }
        onChange={(value) => {
          table.toggleAllPageRowsSelected(!value)
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={(value) => {
          row.toggleSelected(!value)
        }}
        aria-label="Select row"
      />
    )
  },
  {
    accessorKey: 'subCategoryDescription',
    header: 'Description',
    cell: ({ row }) => (
      <p className="font-bold text-slate-700">
        {row.getValue('subCategoryDescription')}
      </p>
    )
  },
  {
    accessorKey: 'schoolCategory',
    header: 'sub-category',
    cell: ({ row }) => (
      <p className="font-bold text-slate-700">
        {row.original?.schoolCategory?.categoryDescription}
      </p>
    )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: () => (
      <div className="flex flex-row gap-x-2">
        <Pencil
          className="bg-slate-100 text-slate-500 p-1 hover:cursor-pointer hover:text-slate-700 rounded-md"
          size={25}
        />
        <Trash2
          className="bg-slate-100 text-slate-500 p-1 hover:cursor-pointer hover:text-slate-700 rounded-md"
          size={25}
        />
      </div>
    )
  }
]

export const classesColumn: Array<ColumnDef<ColumnProps>> = [
  {
    id: 'useId()',
    header: ({ table }) => (
      <Checkbox
        // checked={
        //   table.getIsAllPageRowsSelected() ||
        //   (table.getIsSomePageRowsSelected() && 'indeterminate')
        // }
        onChange={(value) => {
          table.toggleAllPageRowsSelected(!value)
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={(value) => {
          row.toggleSelected(!value)
        }}
        aria-label="Select row"
      />
    )
  },
  {
    accessorKey: 'classDescription',
    header: 'Description',
    cell: ({ row }) => (
      <p className="font-bold text-slate-700">
        {row.getValue('classDescription')}
      </p>
    )
  },
  {
    accessorKey: 'schoolSubCategory',
    header: 'sub-category',
    cell: ({ row }) => (
      <p className="font-bold text-slate-700">
        {row.original?.schoolSubCategory?.subCategoryDescription}
      </p>
    )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: () => (
      <div className="flex flex-row gap-x-2">
        <Pencil
          className="bg-slate-100 text-slate-500 p-1 hover:cursor-pointer hover:text-slate-700 rounded-md"
          size={25}
        />
        <Trash2
          className="bg-slate-100 text-slate-500 p-1 hover:cursor-pointer hover:text-slate-700 rounded-md"
          size={25}
        />
      </div>
    )
  }
]

export const holidaysColumn: Array<ColumnDef<ColumnProps>> = [
  {
    id: 'useId()',
    header: ({ table }) => (
      <Checkbox
        // checked={
        //   table.getIsAllPageRowsSelected() ||
        //   (table.getIsSomePageRowsSelected() && 'indeterminate')
        // }
        onChange={(value) => {
          table.toggleAllPageRowsSelected(!value)
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={(value) => {
          row.toggleSelected(!value)
        }}
        aria-label="Select row"
      />
    )
  },
  {
    accessorKey: 'schoolTerm',
    header: 'Term Description',
    cell: ({ row }) => (
      <p className="font-bold text-slate-700">
        {row.original.schoolTerm?.termDescription}
      </p>
    )
  },
  {
    accessorKey: 'termHolidayDescription',
    header: 'Holiday Description',
    cell: ({ row }) => (
      <p className="text-slate-700">{row.getValue('termHolidayDescription')}</p>
    )
  },
  {
    accessorKey: 'openingDate',
    header: 'Opening Date',
    cell: ({ row }) => (
      <p className="text-slate-700">{row.getValue('openingDate')}</p>
    )
  },
  {
    accessorKey: 'closingDate',
    header: 'Closing Date',
    cell: ({ row }) => (
      <p className="text-slate-700">{row.getValue('closingDate')}</p>
    )
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => (
      <p className="text-slate-700">{row.getValue('duration')}</p>
    )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: () => (
      <div className="flex flex-row gap-x-2">
        <Pencil
          className="bg-slate-100 text-slate-500 p-1 hover:cursor-pointer hover:text-slate-700 rounded-md"
          size={25}
        />
        <Trash2
          className="bg-slate-100 text-slate-500 p-1 hover:cursor-pointer hover:text-slate-700 rounded-md"
          size={25}
        />
      </div>
    )
  }
]
