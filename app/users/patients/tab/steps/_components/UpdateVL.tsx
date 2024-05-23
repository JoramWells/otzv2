/* eslint-disable @typescript-eslint/no-floating-promises */
import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { useAddViralLoadTestMutation } from '@/api/enrollment/viralLoadTests.api'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { useCallback, useState } from 'react'

const justificationOptions = [
  {
    id: 'Routine',
    label: 'Routine'
  },
  {
    id: 'Suspected Treatment Failure',
    label: 'Suspected Treatment Failure'
  }
]

interface InputProps {
  handleNext: () => void
  handleBack: () => void
  patientID: string
  patientVisitID: string
}

const UpdateVL = ({ handleBack, handleNext, patientID, patientVisitID }: InputProps) => {
  const { data: statusData } = useGetAllAppointmentStatusQuery()
  const { data: agendaData } = useGetAllAppointmentAgendaQuery()

  const [addViralLoadTest, { isLoading }] = useAddViralLoadTestMutation()
  const statusOptions = useCallback(() => {
    return statusData?.filter((item: any) => (item.statusDescription.toLowerCase() === 'upcoming'))
  }, [statusData])

  //
  const agendaDataOptions = useCallback(() => {
    return agendaData?.filter(
      (item: any) => item.agendaDescription.toLowerCase() === 'viral load'
    )
  }, [agendaData])

  //
  // const { data: vlData } = useGetViralLoadTestQuery(patientID)
  const { data } = useGetAllUsersQuery()
  const userOptions = useCallback(() => {
    return data?.map((item: any) => ({
      id: item.id, label: item.firstName
    }))
  }, [data])

  const [dateOfVL, setDateOfVL] = useState('')
  const [dateOfNextVL, setDateOfNextVL] = useState('')
  const [vlResults, setVLResults] = useState('')
  const [vlJustification, setVLJustification] = useState('')
  const [userID, setUserID] = useState('')

  // const appointmentInputValues = {
  //   userID,
  //   patientID,
  //   patientVisitID,
  //   appointmentAgendaID: agendaDataOptions()?.id,
  //   appointmentStatusID: statusOptions()?.id,
  //   appointmentDate: dateOfNextVL
  // }
  const inputValues = {
    userID,
    dateOfVL,
    dateOfNextVL,
    vlResults,
    vlJustification,
    patientID,
    patientVisitID,
    appointmentAgendaID: agendaDataOptions()[0]?.id,
    appointmentStatusID: statusOptions()[0]?.id,
    appointmentDate: dateOfNextVL
  }
  return (
    <div className="p-2">
      <div className="border rounded-lg border-slate-200 flex flex-col space-y-4 p-4">
        <CustomSelect label="Select User" value={userID} onChange={setUserID}
        data={userOptions()}
        />
        <CustomInput
          label="VL results"
          placeholder="Enter VL Results"
          type="number"
          value={vlResults}
          onChange={setVLResults}
        />
        <CustomInput
          label="Enter date of current VL"
          type="date"
          value={dateOfVL}
          onChange={setDateOfVL}
        />
        <CustomInput
          label="Enter date of next VL"
          type="date"
          value={dateOfNextVL}
          onChange={setDateOfNextVL}
        />

        <CustomSelect
          label="Reason"
          data={justificationOptions}
          value={vlJustification}
          onChange={setVLJustification}
        />
      </div>

      <div className="flex justify-end mt-4 space-x-4">
        <Button
          onClick={() => {
            handleBack()
          }}
          className="bg-slate-200 shadow-none text-black hover:bg-slate-100"
        >
          Prev
        </Button>
        <Button
          className="bg-slate-200 shadow-none hover:bg-slate-100 text-black"
          disabled={isLoading}
          onClick={() => {
            addViralLoadTest(inputValues)
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default UpdateVL
