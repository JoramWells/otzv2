/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { useAddViralLoadTestMutation, useGetAllViralLoadByPatientIDQuery, useGetViralLoadTestByPatientVisitIDQuery, useGetViralLoadTestQuery } from '@/api/enrollment/viralLoadTests.api'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import ViralLoad from './LabTests/ViralLoad'
import RecentViralLoadCard from './LabTests/RecentViralLoadCard'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

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

const LabTests = ({ handleBack, handleNext, patientID, patientVisitID }: InputProps) => {
  const { data: statusData } = useGetAllAppointmentStatusQuery()
  const { data: agendaData } = useGetAllAppointmentAgendaQuery()

  const { data: currentVLData } =
    useGetViralLoadTestByPatientVisitIDQuery(patientVisitID)

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

  const [dateOfVL, setDateOfVL] = useState('')
  const [dateOfNextVL, setDateOfNextVL] = useState('')
  const [vlResults, setVLResults] = useState('')
  const [vlJustification, setVLJustification] = useState('')

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

  //
  const { data: allPatientVLData } = useGetAllViralLoadByPatientIDQuery(patientID)
  const [average, setAverage] = useState('')

  const calculateAverage = (data: ViralLoadInterface[]) => {
    const tempData = [...data]
    let total = 0
    if (tempData.length >= 3) {
      total = tempData.slice(0, 3).reduce((sum, viralLoad) => {
        return sum + viralLoad.vlResults
      }, 0)
    }

    const average = total / 3

    return average.toFixed(2)
  }

  useEffect(() => {
    if (allPatientVLData) {
      console.log(allPatientVLData)
      setAverage(calculateAverage(allPatientVLData))
    }
  }, [allPatientVLData])

  console.log(currentVLData, 'currentVLData')

  return (
    <div className="w-full flex space-x-4 items-start">
      <div className="w-3/4">
        <div className="flex justify-between items-center w-full border-b border-slate-200 pr-4 p-2 bg-slate-200 rounded-t-lg">
          <p className="text-lg  font-bold">Viral Load</p>
          <Badge className="shadow-none">LDL</Badge>
        </div>

        {/*  */}
        <div className="bg-white p-4">
          <ViralLoad
            dateOfNextVL={dateOfNextVL}
            dateOfVL={dateOfVL}
            justificationOptions={justificationOptions}
            setDateOfNextVL={setDateOfNextVL}
            setDateOfVL={setDateOfVL}
            setVLJustification={setVLJustification}
            setVLResults={setVLResults}
            vlJustification={vlJustification}
            vlResults={vlResults}
          />

          <div className="flex justify-end space-x-4 mt-4">
            <Button
              onClick={() => {
                handleBack()
              }}
              variant='outline'
              className=" shadow-none text-black hover:bg-slate-100"
            >
              <ChevronsLeft size={15} className='mr-2' /> Prev
            </Button>
            {currentVLData
              ? (
              <Button
                className=" shadow-none hover:bg-slate-100 text-black"
                disabled={isLoading}
                variant={'outline'}
                onClick={() => {
                  handleNext()
                }}
              >
                Next <ChevronsRight className='ml-2' size={15} />
              </Button>
                )
              : (
              <Button
                className="bg-slate-200 shadow-none hover:bg-slate-100 text-black"
                disabled={isLoading}
                onClick={() => {
                  addViralLoadTest(inputValues)
                }}
              >
                Save
              </Button>
                )}
          </div>
        </div>

        {/*  */}
      </div>
      {/* recent viral load */}

      <RecentViralLoadCard average={average} data={vlData} />
    </div>
  )
}

export default LabTests
