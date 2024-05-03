/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import CustomInput from '../../../components/forms/CustomInput'
import CustomSelect from '../../../components/forms/CustomSelect'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { useCallback, useEffect, useState } from 'react'
import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { useDeleteAppointmentMutation, useUpdateAppointmentMutation } from '@/api/appointment/appointment.api.'
import { Loader2 } from 'lucide-react'
import CustomCheckbox from '../../../components/forms/CustomCheckbox'

interface DataProps {
  data: {
    original: {
      id: string
      user: UserProps
      appointmentAgenda: AgendaProps
      appointmentStatus: StatusProps
    }
  }
}

interface StatusProps {
  id: string
  agendaStatus: string
}

interface AgendaProps {
  id: string
  agendaDescription: string
}

interface UserProps {
  id: string
  firstName: string
  middleName: string
}

const CustomSheet = ({ data }: DataProps) => {
  const [userName, setUsername] = useState('')
  const [appointmentAgenda, setAppointmentAgenda] = useState('')
  const [appointmentStatus, setAppointmentStatus] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')

  const [updateAppointment, { isLoading: loadingUpdate }] = useUpdateAppointmentMutation()
  const [deleteAppointment, { isLoading: loadingDelete }] = useDeleteAppointmentMutation()

  const inputValues = {
    id: data.original.id,
    userID: userName,
    appointmentAgendaID: appointmentAgenda,
    appointmentStatusID: appointmentStatus

  }

  const [isNotified, setIsNotified] = useState<boolean>(false)

  const { data: caseManager } = useGetAllUsersQuery()
  const caseManagerOptions = useCallback(() => {
    return caseManager?.map((item: any) => ({
      id: item.id,
      label: `${item.firstName} ${item.middleName}`
    }))
  }, [caseManager])

  //
  const { data: appointmentAgendaData } = useGetAllAppointmentAgendaQuery()
  const appointmentAgendaOptions = useCallback(() => {
    return appointmentAgendaData?.map((item: any) => ({
      id: item.id,
      label: item.agendaDescription
    }))
  }, [appointmentAgendaData])

  //
  const { data: appointmentStatusData } = useGetAllAppointmentStatusQuery()
  const appointmentStatusOptions = useCallback(() => {
    return appointmentStatusData?.map((item: any) => ({
      id: item.id,
      label: item.statusDescription
    }))
  }, [appointmentStatusData])

  //   effect
  useEffect(() => {
    setUsername(data.original.user.id)
    setAppointmentAgenda(data.original.appointmentAgenda.id)
    setAppointmentStatus(data.original.appointmentStatus.id)
  }, [
    data.original.user.id,
    data.original.appointmentAgenda.id,
    data.original.appointmentStatus.id
  ])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Appointment</SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when youre done.
          </SheetDescription> */}
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-6">
          <CustomSelect
            label="Case Manager"
            data={caseManagerOptions()}
            value={userName}
            onChange={setUsername}
          />
          <CustomSelect
            label="Agenda"
            data={appointmentAgendaOptions()}
            value={appointmentAgenda}
            onChange={setAppointmentAgenda}
          />
          <CustomSelect
            label="Status"
            data={appointmentStatusOptions()}
            value={appointmentStatus}
            onChange={setAppointmentStatus}
          />
          <CustomInput
            label="Date"
            type="date"
            value={appointmentDate}
            onChange={setAppointmentDate}
          />

          {/*  */}
          <div>
            <CustomCheckbox
            label='Allow Notification'
            value={isNotified}
            onChange={setIsNotified}
            />
          </div>
          <div>
            <p>Choose Notification Type</p>
          </div>
        </div>
        <div className="mt-4 flex flex-row gap-x-4 justify-end">
          <Button
            type="submit"
            variant={'outline'}
            className="text-red-500 border-red-500 hover:bg-red-50
            hover:text-red-600
            "
            disabled={loadingDelete}
            onClick={() => deleteAppointment(data.original.id)}
          >
            {loadingDelete && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Delete
          </Button>
          <Button
            type="submit"
            disabled={loadingUpdate}
            className="bg-teal-600 border-none hover:bg-teal-700"
            onClick={() => updateAppointment(inputValues)}
          >
            {loadingUpdate && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Edit
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CustomSheet
