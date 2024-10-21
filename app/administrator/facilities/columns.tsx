/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useUpdateHospitalMutation } from '@/api/hospital/hospital.api'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import { type ColumnDef } from '@tanstack/react-table'
import { Loader2, Pencil } from 'lucide-react'
import { useState } from 'react'
// import { FaEdit } from 'react-icons/fa'

export interface LocationProps {
  id?: string
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
    cell: ({ row }) => (
      <p className="text-[14px]">{row.original?.location?.county}</p>
    )
  },
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => {
      const [hospitalName, setHospitalName] = useState(row.original.hospitalName)
      const [updateHospital, { isLoading }] = useUpdateHospitalMutation()
      return (
        <CaseManagerDialog
        label={<Pencil size={18} />}
        >
<div
className='p-4 flex-col space-y-2'
>
<CustomInput
  label='Facility name'
  value={hospitalName}
  onChange={setHospitalName}
  />
  <Button
  onClick={async () => await updateHospital({
    id: row.original.id,
    hospitalName
  })}
  >
    {isLoading && <Loader2 className='animate-spin mr-2' size={16} />}
    Update
    </Button>
</div>
        </CaseManagerDialog>
      )
    }
  }
]
