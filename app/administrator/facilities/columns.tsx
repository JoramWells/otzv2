/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type ExtendedHospitalInterface, useUpdateHospitalMutation } from '@/api/hospital/hospital.api'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomInput from '@/components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import { type ColumnDef } from '@tanstack/react-table'
import { Loader2, Pencil } from 'lucide-react'
import { useState } from 'react'
// import { FaEdit } from 'react-icons/fa'

export const columns: Array<ColumnDef<ExtendedHospitalInterface>> = [
  {
    accessorKey: 'hospitalName',
    header: 'Name',
    cell: ({ row }) => (
      <div
        className="flex flex-row gap-x-3 items-center
      pt-1.5 pb-1.5 text-[12px]
      "
      >
        {row.original?.hospitalName}
      </div>
    )
  },
  {
    accessorKey: 'mflCode',
    header: 'MFL Code.',
    cell: ({ row }) => <p className="text-[12px]">{row.original?.mflCode}</p>
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => (
      <p className="text-[12px]">{row.original?.location?.county}</p>
    )
  },
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => {
      const [hospitalName, setHospitalName] = useState(row.original.hospitalName)
      const [mflCode, setMFLCode] = useState(row.original.mflCode)
      const [updateHospital, { isLoading }] = useUpdateHospitalMutation()
      return (
        <CaseManagerDialog
          label={<Pencil size={16} className="text-slate-500" />}
        >
          <div className="p-4 flex-col space-y-2">
            <p>Edit Facility Name</p>
            <CustomInput
              label="Facility name"
              value={hospitalName}
              onChange={setHospitalName}
            />
            {/*  */}
            <CustomInput
              label="MFL Code"
              value={mflCode}
              onChange={setMFLCode}
            />
            <Button
              onClick={async () =>
                await updateHospital({
                  id: row.original.id,
                  hospitalName,
                  mflCode
                })
              }
              size={'sm'}
            >
              {isLoading && <Loader2 className="animate-spin mr-2" size={16} />}
              Update
            </Button>
          </div>
        </CaseManagerDialog>
      )
    }
  }
]
