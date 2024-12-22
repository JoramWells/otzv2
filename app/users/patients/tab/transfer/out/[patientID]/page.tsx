/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetAppointmentByPatientIDQuery } from '@/api/appointment/appointment.api.'
import { useGetAllHospitalsQuery } from '@/api/hospital/hospital.api'
import { useAddTransferOutMutation } from '@/api/users/transfer/transferOut.api'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/UserContext'
import { Loader2 } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'

const TransferOutPage = ({ params }: any) => {
  const { patientID } = params
  const { authUser } = useUserContext()
  const [transferOutDate, setTransferOutDate] = useState('')
  const [transferredTo, setTransferredTo] = useState('')
  const [lastVisitDate, setLastVisitDate] = useState<Date | string | undefined>('')
  const [lastAppointmentVisitDate, setLastAppointmentVisitDate] = useState<string | undefined>('')
  const { data } = useGetAppointmentByPatientIDQuery(patientID as string)

  const { data: hospitalsData } = useGetAllHospitalsQuery()

  const hospitalOptions = useCallback(() => {
    return hospitalsData?.map((item: any) => ({
      id: item?.id,
      label: item?.hospitalName
    }))
  }, [hospitalsData])

  const inputValues = {
    patientID,
    transferOutDate,
    transferredTo,
    transferredFrom: authUser?.hospitalID,
    userID: authUser?.id,
    lastVisitDate,
    lastAppointmentVisitDate
  }
  useEffect(() => {
    if (data) {
      setLastVisitDate(data?.PatientVisits?.createdAt)
      setLastAppointmentVisitDate(data?.appointmentDate)
    }
  }, [data])

  const [addTransferOut, { isLoading }] = useAddTransferOutMutation()

  console.log(data, 'datx')

  return (
    <div className="p-2">
      <div className="w-1/2 bg-white p-4 rounded-lg border flex flex-col space-y-4">
        <CustomInput label="Transfer Out Date" type="date"
        onChange={setTransferOutDate}
        value={transferOutDate}
        />
        {/* <CustomInput label="Transfer Out Effective Date" type="date" /> */}
        <CustomSelect
          label="Hospital name"
          onChange={setTransferredTo}
          value={transferredTo}
          placeholder="Select hospital"
          data={hospitalOptions() ?? []}
        />
        <Button
        size={'sm'}
        className='shadow-none'
        disabled={isLoading}
        onClick={async () => await addTransferOut(inputValues)}
        >
          {isLoading && <Loader2 size={14} className='mr-2' />}
          Transfer
        </Button>
      </div>
    </div>
  )
}

export default TransferOutPage
