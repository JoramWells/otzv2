/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
// import { Button } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'

import CustomSelect from '@/app/_components/forms/CustomSelect'
import { useAddAppointmentMutation, useGetAppointmentDetailQuery } from '@/api/appointment/appointment.api.'
import moment from 'moment'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { useGetAllAppointmentAgendaQuery, useGetAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import CustomTimeInput from '@/app/_components/forms/CustomTimeInput'
import CustomInput from '@/app/_components/forms/CustomInput'
import { Button } from '@/components/ui/button'
import CustomCheckbox from '@/app/_components/forms/CustomCheckbox'
import { Textarea } from '@/components/ui/textarea'
import { useAddSMSMutation } from '@/api/sms/sms.api'
import { Loader2 } from 'lucide-react'
import { Avatar, Divider } from '@chakra-ui/react'

interface PhaseProps {
  id: string
  artPhaseDescription: string
}

interface CategoryProps {
  id: string
  artCategoryDescription: string
  artPhaseID: string
}

const EditAppointment = ({ params }: any) => {
  const appointmentID = params.appointmentID
  const [userID, setUserID] = useState('')
  const [agenda, setAppointmentAgenda] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [status, setStatus] = useState('')
  const [minutes, setMinutes] = useState('')
  const [notificationType, setNotificationType] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [messageText, setMessageText] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [isNotification, setIsNotification] = useState<boolean>(true)
  const [isSMS, setIsSMS] = useState<boolean>(true)
  const [isWhatsapp, setIsWhatsapp] = useState<boolean>(false)
  const [isVoiceCall, setIsVoiceCall] = useState<boolean>(false)

  const [addAppointment, { isLoading }] = useAddAppointmentMutation()

  const { data: usersData } = useGetAllUsersQuery()

  const { data: appointmentData } = useGetAppointmentDetailQuery(appointmentID)
  const [hours, setHours] = useState('')

  useEffect(() => {
    if (appointmentData) {
      setUserID(appointmentData[0]?.userID)
      setAppointmentDate(appointmentData[0]?.appointmentDate)
      setHours(moment(appointmentData[0].appointmentTime, 'HH:mm:ss').hours().toString())
      setMinutes(moment(appointmentData[0].appointmentTime, 'HH:mm:ss').minutes().toString())
      setAppointmentAgenda(appointmentData[0]?.appointmentAgendaID)
      setStatus(appointmentData[0]?.appointmentStatusID)
    }
  }, [appointmentData, appointmentData?.userID])

  console.log(appointmentData, 'gt')

  const { data: appointmentAgendaData } = useGetAllAppointmentAgendaQuery()
  const { data: appointmentStatusData } = useGetAllAppointmentStatusQuery()

  const [addSMS, { isLoading: isSMSLoading }] = useAddSMSMutation()

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
    }))
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
    appointmentID,
    userID,
    appointmentDate,
    appointmentTime: moment().hour(parseInt(hours, 10)).minute((parseInt(minutes, 10))).format('HH:mm'),
    appointmentStatusID: status
  }

  const inputValues2 = {
    appointmentID,
    notificationType: isSMS ? 'SMS' : '',
    phoneNo,
    messageText,
    bufferTime: '10',
    scheduledDate: appointmentDate,
    scheduledTime: moment().hour(parseInt(hours, 10)).minute((parseInt(minutes, 10))).format('HH:mm')
  }

  return (
    <div className='mt-12 p-4 w-full flex flex-col space-y-2'>
      <Avatar
      name={'Lucas B'}
      />
      <Divider className=''/>
      <div className="flex flex-row space-x-4 mt-4">
        <div
          className="w-1/3 flex flex-col
      rounded-lg p-5 gap-y-6 border border-slate-200"
          style={{
            width: '40%'
          }}
        >
          <CustomSelect
            label="Requested By"
            data={usersOption()}
            value={userID}
            onChange={setUserID}
          />

          {/* date-picker input */}

          <CustomInput
            label="Appointment Date"
            type="date"
            value={appointmentDate}
            onChange={setAppointmentDate}
          />

          <CustomTimeInput
            label="Appointment Time"
            hours={hours}
            setHours={setHours}
            minutes={minutes}
            setMinutes={setMinutes}
          />

          {/*  */}
          <CustomSelect
            label="Agenda/Reason"
            data={appointmentOptions()}
            value={agenda}
            onChange={setAppointmentAgenda}
          />

          {/*  */}
          <CustomSelect
            label="Status"
            data={appointmentStatusOptions()}
            value={status}
            onChange={setStatus}
          />

          {/* <div>
          <p className="font-bold">Choose time buffer</p>
        </div> */}

          <div className="w-full flex flex-row justify-end space-x-4">
            <Button
              // colorScheme="teal"
              className="bg-red-50 shadow-none
            text-red-500 font-bold hover:bg-red-100
            "
              // width={'full'}
              // onClick={() => addAppointment(inputValues)}
              // isLoading={isLoading}
            >
              Delete
            </Button>
            <Button
              // colorScheme="teal"
              className="bg-teal-600 shadow-none hover:bg-teal-600
            font-bold
            "
              // width={'full'}
              onClick={() => addAppointment(inputValues)}
              // isLoading={isLoading}
            >
              Edit
            </Button>
          </div>
        </div>
        <div
          className="w-[40%] border border-slate-200 rounded-lg p-5
      flex flex-col space-y-4
      "
        >
          <CustomCheckbox
            label="Allow Multi-Channel Access"
            description="Choose Client Notification Type"
            value={isNotification}
            onChange={setIsNotification}
          />
          {isNotification && (
            <div className="bg-slate-50 p-2 border border-slate-200 rounded-lg">
              <CustomCheckbox
                label="SMS"
                description="Use SMS"
                value={isSMS}
                onChange={setIsSMS}
              />
              {isSMS && (
                <div
                  className="bg-white p-4 rounded-lg mt-1 ml-6
              flex flex-col space-y-4
              "
                >
                  <CustomInput
                    label="Phone No."
                    description="Use this phone number"
                    value={phoneNo}
                    onChange={setPhoneNo}
                  />
                  <div>
                    <p className="font-bold mb-1">Message</p>
                    <Textarea
                      placeholder="Enter Message"
                      value={messageText}
                      onChange={(val) => {
                        setMessageText(val.target.value)
                      }}
                    />
                  </div>
                  <Button
                    size={'sm'}
                    className="font-bold"
                    onClick={() => addSMS(inputValues2)}
                    disabled={isSMSLoading}
                  >
                    {isSMSLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    SAVE
                  </Button>
                </div>
              )}
              <CustomCheckbox
                label="Whatsapp"
                description="Use Whatsapp"
                value={isWhatsapp}
                onChange={setIsWhatsapp}
              />
              <CustomCheckbox
                label="Voice Calls"
                description="Allow Voice Calls"
                value={isVoiceCall}
                onChange={setIsVoiceCall}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditAppointment
