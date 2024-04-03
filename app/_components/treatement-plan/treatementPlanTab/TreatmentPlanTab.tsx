/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useGetAllAppointmentsQuery } from '@/api/appointment/appointment.api.'
import { CustomTable } from '../../table/CustomTable'
import { columns } from './columns'
import { Printer } from 'lucide-react'
import SideMenuBar from '../SideMenuBar'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useGetTimeAndWorkQuery } from '@/api/treatmentplan/timeAndWork.api'

const itemList = [
  {
    id: 1,
    label: 'Forms'
  },
  {
    id: 2,
    label: 'Morisky Medication Adherence Scale'
  },
  {
    id: 3,
    label: 'Disclosure Checklist'
  },
  {
    id: 4,
    label: 'Follow Up Checklist'
  }
]

export interface TreatmentPlanProps {
  patientID: string
}

const TreatmentPlanTab = ({ patientID }: TreatmentPlanProps) => {
  const [selected, setSelected] = useState(0)

  const { data } = useGetTimeAndWorkQuery(patientID)
  console.log(data, 'dtc')

  const handleStepChange = useCallback((step: number) => {
    setSelected(step)
  }, [])

  return (
    <div className="w-full">
      {/* header */}
      <div className="flex flex-row justify-between items-center mb-4">
        <p className="text-lg font-bold">Treatment Plan</p>
        <div className="flex flex-row items-center gap-x-4">
          <div>
            <Printer className="hover:cursor-pointer" />
          </div>
          <Button size={'sm'} colorScheme="green" variant={'outline'}>
            <Link href={`/treatment-plan/add-treatment-plan/${patientID}`}>
              NEW
            </Link>
          </Button>
        </div>
      </div>

      {/* flex-1 */}
      <div className="flex flex-row gap-x-4 w-full">
        <div
          className="p-2 space-y-1 border border-gray-200 w-72
      rounded-md flex flex-col items-center justify-center gap-y-2
      "
          style={{
            height: '250px'
          }}
        >
          {itemList.map((item, idx) => (
            <SideMenuBar
              key={item.id}
              text={item.label}
              onClick={() => {
                handleStepChange(idx + 1)
              }}
              selected={item.id === 1}
            />
          ))}
        </div>
        <div
        className='w-full'
        >
          <CustomTable columns={columns} data={data || []} />
        </div>
      </div>
    </div>
  )
}

export default TreatmentPlanTab
