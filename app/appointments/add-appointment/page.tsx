/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../components/forms/CustomInput'
import { useCallback, useEffect, useState } from 'react'
import CustomSelect from '@/components/forms/CustomSelect'
import { useAddAppointmentMutation } from '@/api/appointment/appointment.api.'
import moment from 'moment'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import CustomTimeInput from '@/components/forms/CustomTimeInput'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Calendar } from '@/components/ui/calendar'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)
const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Dashboard',
    link: '/'
  }
]

function TimeSlots ({ duration, setDuration }: { duration: number, setDuration: (interval: number) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-40" variant={'outline'}>
          {duration}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            setDuration(15)
          }}
        >
          15 Min
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setDuration(30) }}>
          30 Min
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setDuration(45) }}>
          45 Min
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setDuration(60) }}>
          60 Min
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function PreviewMeeting ({ duration }: { duration: number }) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeSlots, setTimeSlots] = useState<string[]>([])

  const createTimeSLot = (interval: number) => {
    const time = 8 * 60 // 8am
    const endTime = 22 * 60 // 10pmel

    const totalSlots = (endTime - time) / interval

    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = time + i * interval
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60
      const formattedHours = hours > 12 ? hours - 12 : hours
      const period = hours >= 12 ? 'PM' : 'AM'
      return `${String(formattedHours).padStart(2, '0')}:${String(
        minutes
      ).padStart(2, '0')} ${period}`
    })

    setTimeSlots(slots)

    console.log(slots)
  }

  useEffect(() => {
    createTimeSLot(duration)
    console.log(duration)
  }, [duration])

  return (
    <div className="flex w-full justify-between bg-white">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(date) => date <= new Date()}
        className="max-w-[900px] border rounded-lg"
      />
      <div className="h-[500px] overflow-y-auto flex flex-col w-1/2 space-y-2 relative ">
        <div
        className='  w-[50%] p-2 z-20 sticky top-0'
        >
          <p className="font-bold">Available Time Slots</p>
        </div>
        {timeSlots.map((item) => (
          <Button key={item} variant={'outline'}
          className=''
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  )
}

const AddArtCategory = ({ params }: any) => {
  const patientID = params.patientID
  const [userID, setUserID] = useState('')
  const [agenda, setAppointmentAgenda] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [status, setStatus] = useState('')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')

  const [duration, setDuration] = useState(30)

  const [addAppointment, { isLoading }] = useAddAppointmentMutation()

  const { data: usersData } = useGetAllUsersQuery()

  const { data: appointmentAgendaData } = useGetAllAppointmentAgendaQuery()
  const { data: appointmentStatusData } = useGetAllAppointmentStatusQuery()

  const usersOption = useCallback(() => {
    return usersData?.map((item: any) => ({
      id: item.id,
      label: item.firstName
    }))
  }, [usersData])

  //
  const appointmentOptions = useCallback(() => {
    return appointmentAgendaData?.map((item: any) => ({
      id: item.id,
      label: item.agendaDescription
    })) || []
  }, [appointmentAgendaData])

  //
  const appointmentStatusOptions = useCallback(() => {
    return appointmentStatusData?.map((item: any) => ({
      id: item.id,
      label: item.statusDescription
    }))
  }, [appointmentStatusData])

  const inputValues = {
    appointmentAgendaID: agenda,
    patientID,
    userID,
    appointmentDate,
    appointmentTime: moment().hour(parseInt(hours, 10)).minute(parseInt(minutes, 10)).format('HH:mm'),
    appointmentStatusID: status
  }

  const [date, setDate] = useState(new Date())

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />
      <div className="flex  w-full p-4 items-start space-x-4">
        <div
          className="border border-gray-200 bg-white
        w-1/3 flex flex-col
      rounded-lg p-5 gap-y-6"
          style={{
            width: '40%'
          }}
        >
          {/* <CustomSelect
            label="Requested By"
            data={usersOption()}
            value={userID}
            onChange={setUserID}
          /> */}

          {/* date-picker input */}
          <TimeSlots
          duration={duration}
          setDuration={setDuration}
          />
{/*
          <CustomInput
            label="Appointment Date"
            type="date"
            value={appointmentDate}
            onChange={setAppointmentDate}
          /> */}
{/*
          <CustomTimeInput
            label="Appointment Time"
            hours={hours}
            setHours={setHours}
            minutes={minutes}
            setMinutes={setMinutes}
          /> */}

          {/*  */}
          <CustomSelect
            label="Agenda/Reason"
            data={appointmentOptions()}
            value={agenda}
            onChange={setAppointmentAgenda}
          />

          {/*  */}
          {/* <CustomSelect
            label="Status"
            data={appointmentStatusOptions()}
            value={status}
            onChange={setStatus}
          /> */}

          <Button
            size={'lg'}
            className="bg-teal-600 hover:bg-teal-700 font-bold
          shadow-none
          "
            // colorScheme="teal"
            // width={'full'}
            onClick={() => addAppointment(inputValues)}
            // isLoading={isLoading}
          >
            Create Appointment
          </Button>
        </div>

         <PreviewMeeting
         duration={duration}
          />

      </div>
    </div>
  )
}

export default AddArtCategory
