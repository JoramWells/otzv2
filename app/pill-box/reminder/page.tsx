/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useGetAllPillDailyUptakeQuery } from '@/api/treatmentplan/uptake.api'

const AppointmentPage = () => {
  const { data } = useGetAllPillDailyUptakeQuery({
    patientsDueMorning: false
  })
  const { data: patientsDueMorning } = useGetAllPillDailyUptakeQuery({
    patientsDueMorning: true
  })

  console.log(patientsDueMorning, 'yu')

  return (
    <div className="p-5 mt-12">

      <div className="flex flex-row mb-4 justify-between ">
        <h1 className="text-lg font-semibold">Appointments</h1>

        <Button
          className="bg-teal-600 hover:bg-teal-700 shadow-none
          font-bold
          "
        >
          <PlusCircle size={18} className="mr-2" />
          New Appointment
        </Button>
      </div>

     <CustomTable columns={columns} data={data || []} />

    </div>
  )
}

export default AppointmentPage
