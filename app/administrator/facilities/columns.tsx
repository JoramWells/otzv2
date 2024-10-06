/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type ColumnDef } from '@tanstack/react-table'
// import { FaEdit } from 'react-icons/fa'

export interface LocationProps {
  hospitalName: string

  mflCode: string
  location?: {
    county: string
    subCounty: string
    ward: string
  }
}

export const columns: Array<ColumnDef<LocationProps>> = [
  {
    accessorKey: 'hospitalName',
    header: 'Name',
    cell: ({ row }) => (
      <div
        className="flex flex-row gap-x-3 items-center
      pt-1.5 pb-1.5 text-[14px]
      "
      >
        {row.original?.hospitalName}
      </div>
    )
  },
  {
    accessorKey: 'mflCode',
    header: 'MFL Code.',
    cell: ({ row }) => <p className="text-[14px]">{row.original?.mflCode}</p>
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => <p className="text-[14px]">{row.original?.location?.county}</p>
  }
]
