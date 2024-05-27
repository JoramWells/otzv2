import { type ColumnDef } from '@tanstack/react-table'
import { View } from 'lucide-react'
import EditMeasuringUnit from './_components/measuringUnit/EditMeasuringUnit'
import moment, { type MomentInput } from 'moment'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
  updatedAt: MomentInput
  measuringUnit: any
  artRegimenPhase: any
  artCategory: any
  header: string
  accessorKey?: keyof UserProps
  expiryDate: MomentInput
  ArtCategory: {
    artCategoryDescription: string
    artPhase: string
  }
  MeasuringUnit: {
    description: string
  }
  // render?: (props: any) => React.ReactNode
}

export interface UserProps {
  id?: string
  patient_name?: FullNameProps
  age?: number
  dob?: string
  gender?: string
  email?: string
  phone_no?: string
  // action?: React.ReactNode
}

export const columns: Array<ColumnDef<ColumnProps>> = [

  {
    accessorKey: 'artPhaseDescription',
    header: 'Phase Description'
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated'
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: () => (
      <div>
        <View className="hover:cursor-pointer" size={20} />
      </div>
    )
  }
]

export const artCategoryColumns: Array<ColumnDef<ColumnProps>> = [
  {
    accessorKey: 'artCategoryDescription',
    header: 'Category Description'
  },
  {
    accessorKey: 'ageLine',
    header: 'age Category'
  },
  {
    accessorKey: 'artPhase',
    header: 'ageLine'
    // cell: ({ row }) => (
    //   <div>{row.original?.artRegimenPhase?.artPhaseDescription}</div>
    // )
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ row }) => <div>{moment(row.original.updatedAt).format('ll')}</div>
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: () => (
      <div>
        <View className="hover:cursor-pointer" size={20} />
      </div>
    )
  }
]

export const artColumns: Array<ColumnDef<ColumnProps>> = [
  {
    accessorKey: 'artName',
    header: 'Art Name'
  },
  {
    accessorKey: 'artRegimenPhase',
    header: 'ART Phase',
    cell: ({ row }) => (
      <p>{row.original?.ArtCategory?.artCategoryDescription}</p>
    )
  },
  {
    accessorKey: 'age',
    header: 'Age',
    cell: ({ row }) => (
      <p className="capitalize">{row.original?.ArtCategory?.artPhase}</p>
    )
  },
  {
    accessorKey: 'measuringUnit',
    header: 'MU',
    cell: ({ row }) => (
      <p className="capitalize">{row.original?.MeasuringUnit?.description}</p>
    )
  },
  {
    accessorKey: 'quantity',
    header: 'Initial Quantity'
  },

  {
    accessorKey: 'expiryDate',
    header: 'Expiry Date',
    cell: ({ row }) => (
      <div>{moment(row.original.expiryDate).format('ll')} </div>
    )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: () => (
      <div>
        <View className="hover:cursor-pointer" size={20} />
      </div>
    )
  }
]

//

export const artSwitchReasonColumns: Array<ColumnDef<ColumnProps>> = [
  {
    accessorKey: 'reason',
    header: 'Reason'
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ row }) => (<div>{moment(row.original.updatedAt).format('ll')} </div>)
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: () => (
      <div>
        <View className="hover:cursor-pointer" size={20} />
      </div>
    )
  }
]

//
interface MeasuringUnitProps {
  updatedAt: MomentInput
  id: string
  description: string
  header: string
  accessorKey?: keyof UserProps
  // render?: (props: any) => React.ReactNode
}

export const artMeasuringUnit: Array<ColumnDef<MeasuringUnitProps>> = [
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ row }) => (<div>
      {moment(row.original.updatedAt).format('ll')}
    </div>)
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <EditMeasuringUnit value={row.original.description} id={row.original.id} />
  }
]
