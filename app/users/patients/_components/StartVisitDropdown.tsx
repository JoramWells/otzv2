/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import {
  ChevronDownIcon
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface InputProps {
  id: string
  AppointmentAgenda: {
    agendaDescription: string
  }
}

export function StartVisitDropdown ({ appointmentList = [], patientID }: { appointmentList: InputProps[], patientID: string }) {
  // const [] = useState()
  const router = useRouter()
  // const { data: session } = useSession()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-transparent border-l-2 rounded-none hover:bg-teal-700 shadow-none rounded-r-lg "
          size={'sm'}
        >
          <ChevronDownIcon className="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Upcoming Appointments</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {appointmentList.map((column: InputProps) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize w-full"
              onClick={() => {
                router.push(
                  `/users/patients/tab/steps/${patientID}?appointmentID=${column.id}&type=${column.AppointmentAgenda?.agendaDescription}`
                )
              }}
            >
              <div className='w-full' >{column.AppointmentAgenda?.agendaDescription}</div>
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
