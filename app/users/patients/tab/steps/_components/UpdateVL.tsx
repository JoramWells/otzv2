/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { useAddViralLoadTestMutation, useGetViralLoadTestQuery } from '@/api/enrollment/viralLoadTests.api'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'

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
  patientVisitID: string | null
}

const UpdateVL = ({ handleBack, handleNext, patientID, patientVisitID }: InputProps) => {
  const { data: statusData } = useGetAllAppointmentStatusQuery()
  const { data: agendaData } = useGetAllAppointmentAgendaQuery()

  const [addViralLoadTest, { isLoading }] = useAddViralLoadTestMutation()
  const statusOptions = useCallback(() => {
    return statusData?.filter((item: any) => (item.statusDescription.toLowerCase() === 'upcoming')) || []
  }, [statusData])

  //
  const agendaDataOptions = useCallback(() => {
    return agendaData?.filter(
      (item: any) => item.agendaDescription.toLowerCase() === 'viral load'
    ) || []
  }, [agendaData])

  //
  const { data: vlData } = useGetViralLoadTestQuery(patientID)
  const { data } = useGetAllUsersQuery()
  const userOptions = useCallback(() => {
    return data?.map((item: any) => ({
      id: item.id, label: item.firstName
    })) || []
  }, [data])

  console.log(vlData, 'juki')

  const [dateOfVL, setDateOfVL] = useState('')
  const [dateOfNextVL, setDateOfNextVL] = useState('')
  const [vlResults, setVLResults] = useState('')
  const [vlJustification, setVLJustification] = useState('')

  const currentDate = moment('YYYY-MM-DD')

  // const calculateValidity = () => {
  //   const validDate = currentDate.add(6, 'months')
  // }

  const inputValues = {
    patientID,
    dateOfVL,
    dateOfNextVL,
    vlResults,
    vlJustification,
    userID: userOptions()?.length > 0 && userOptions()[0]?.id,
    patientVisitID,
    appointmentAgendaID: agendaDataOptions()?.length > 0 && agendaDataOptions()[0]?.id,
    appointmentStatusID: statusOptions()?.length > 0 && statusOptions()[0]?.id,
    appointmentDate: dateOfNextVL
  }

  useEffect(() => {
    if (vlData) {
      const formatDateOfNextVl = moment(vlData.dateOfNextVL, 'YYYY-MM-DD')
      const validNextVL = formatDateOfNextVl.add(6, 'months').format('YYYY-MM-DD')
      setDateOfVL(vlData.dateOfNextVL as string)
      setDateOfNextVL(validNextVL)
    }
  }, [vlData])

  return (
    <div className="w-full flex space-x-4 items-start">
      <div className="w-3/4">
        <div className="flex justify-between items-center w-full border-b border-slate-200 pr-4 p-2 bg-slate-200 rounded-t-lg">
          <p className="text-lg  font-bold">Viral Load</p>
          <Badge className="shadow-none">LDL</Badge>
        </div>
        <div className="flex flex-col space-y-4 p-4 bg-white">
          <CustomInput
            label="Results"
            placeholder="Enter VL Results"
            type="number"
            value={vlResults}
            onChange={setVLResults}
          />

          <div>
            <div>
              <p>Date</p>
              {}
            </div>
            <div className="flex space-x-2 justify-between items-center relative border p-4 bg-slate-50">
              <div className="absolute top-4 right-4 left-8">
                {currentDate.isSame(dateOfVL, 'month')
                  ? (
                  <Badge>Valid</Badge>
                    )
                  : (
                  <Badge>Invalid</Badge>
                    )}
              </div>
              <CustomInput
                label="Current Date"
                type="date"
                value={dateOfVL}
                onChange={setDateOfVL}
              />
              <span className="mt-8">-</span>

              <CustomInput
                label="Next Date"
                type="date"
                value={dateOfNextVL}
                onChange={setDateOfNextVL}
              />
              <div>
                <p>Duration</p>
              </div>
            </div>
          </div>
          <CustomSelect
            label="Reason"
            data={justificationOptions}
            value={vlJustification}
            onChange={setVLJustification}
          />
          <div className="flex justify-end space-x-4">
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
      </div>
      {/* recent viral load */}
      <div className="w-1/3 bg-white rounded-lg">
        <div className="p-2 pl-4">
          <p className="font-bold text-[14px] ">Recent viral load</p>
        </div>

        {/*  */}
        <div className="p-4 flex flex-col space-y-2">
          <div className="flex justify-between items-center w-full text-[14px] ">
            <p className="text-slate-500 ">Results</p>
            <p className="font-bold">
              {vlData?.vlResults}
              <span>Copies/ml</span>
            </p>
          </div>
          <hr />

          {/*  */}
          <div className="flex justify-between items-center w-full text-[14px] ">
            <p className="text-slate-500 ">Justification</p>
            <p className="font-bold">{vlData?.vlJustification}</p>
          </div>
          <hr />
        </div>
      </div>
    </div>
  )
}

export default UpdateVL
