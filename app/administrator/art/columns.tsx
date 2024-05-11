import { type ColumnDef } from '@tanstack/react-table'
import { View } from 'lucide-react'
import EditMeasuringUnit from './_components/measuringUnit/EditMeasuringUnit'
import moment, { type MomentInput } from 'moment'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
  measuringUnit: any
  artRegimenPhase: any
  artCategory: any
  header: string
  accessorKey?: keyof UserProps
  expiryDate: MomentInput
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
    accessorKey: 'artCategory',
    header: 'ART Phase',
    cell: ({ row }) => (
      <p>{row.original.artCategory?.artCategoryDescription}</p>
    )
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

export const artColumns: Array<ColumnDef<ColumnProps>> = [
  {
    accessorKey: 'artName',
    header: 'Art Name'
  },
  {
    accessorKey: 'artRegimenPhase',
    header: 'ART Phase',
    cell: ({ row }) => (
      <p>{row.original.artCategory.artRegimenPhase?.artPhaseDescription}</p>
    )
  },
  {
    accessorKey: 'measuringUnit',
    header: 'Art Name',
    cell: ({ row }) => <p>{row.original.measuringUnit?.description}</p>
  },
  {
    accessorKey: 'quantity',
    header: 'Initial Quantity'
  },

  {
    accessorKey: 'expiryDate',
    header: 'Expiry Date',
    cell: ({ row }) => (<div>{moment(row.original.expiryDate).format('ll')} </div>)
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

//
interface MeasuringUnitProps {
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
    header: 'Updated'
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <EditMeasuringUnit value={row.original.description} id={row.original.id} />
  }
]
