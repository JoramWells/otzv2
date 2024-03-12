import { type ColumnDef } from '@tanstack/react-table'
import { View } from 'lucide-react'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
  artRegimenPhase: any
  artCategory: any
  header: string
  accessorKey?: keyof UserProps
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
      <p>{row.original.artRegimenPhase?.artPhaseDescription}</p>
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
