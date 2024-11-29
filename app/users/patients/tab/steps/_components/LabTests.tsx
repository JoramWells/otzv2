/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { useAddViralLoadTestMutation, useGetAllViralLoadByPatientIDQuery, useGetViralLoadTestQuery } from '@/api/enrollment/viralLoadTests.api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ViralLoad from './LabTests/ViralLoad'
import RecentViralLoadCard from './LabTests/RecentViralLoadCard'
import { ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react'
import CardHeader from './CardHeader'
import { useToast } from '@/components/ui/use-toast'
import { useUserContext } from '@/context/UserContext'

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

  // const { data: currentVLData } =
  //   useGetViralLoadTestByPatientVisitIDQuery(patientVisitID)

  const [addViralLoadTest, { isLoading, data: recentVLData }] = useAddViralLoadTestMutation()
  const statusOptions = useCallback(() => {
    return statusData?.filter((item: any) => (item.statusDescription.toLowerCase() === 'upcoming')) || []
  }, [statusData])

  //
  const agendaDataOptions = useCallback(() => {
    return agendaData?.filter(
      (item: any) => item.agendaDescription.toLowerCase() === 'viral load'
    ) || []
  }, [agendaData])

  console.log(agendaDataOptions(), 'agData')

  //
  const { data: vlData } = useGetViralLoadTestQuery(patientID)
  const { authUser } = useUserContext()

  const [dateOfVL, setDateOfVL] = useState('')
  const [dateOfNextVL, setDateOfNextVL] = useState('')
  const [vlResults, setVLResults] = useState('')
  const [vlJustification, setVLJustification] = useState('')

  // const calculateValidity = () => {
  //   const validDate = currentDate.add(6, 'months')
  // }

  const inputValues = useMemo(
    () => [
      {
        patientID,
        dateOfVL,
        dateOfNextVL,
        vlResults,
        vlJustification,
        userID: authUser?.id,
        patientVisitID,
        appointmentAgendaID:
          agendaDataOptions()?.length > 0 && agendaDataOptions()[0]?.id,
        appointmentStatusID:
          statusOptions()?.length > 0 && statusOptions()[0]?.id,
        appointmentDate: dateOfNextVL
      }
    ],
    [agendaDataOptions, authUser?.id, dateOfNextVL, dateOfVL, patientID, patientVisitID, statusOptions, vlJustification, vlResults]
  )

  useEffect(() => {
    if (vlData) {
      const formatDateOfNextVl = moment(vlData.dateOfNextVL, 'YYYY-MM-DD')
      const validNextVL = formatDateOfNextVl.add(6, 'months').format('YYYY-MM-DD')
      setDateOfVL(vlData.dateOfNextVL as string)
      setDateOfNextVL(validNextVL)
    }
  }, [vlData])

  const { toast } = useToast()

  // Toast method
  const send = useCallback(
    () =>
      toast({
        // variant:'success',
        title: 'Completed',
        description: 'New Viral Load Created Successfully!!'
        // action: <ToastAction altText="Saved">Undo</ToastAction>
      }),
    [toast]
  )

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
      setAverage(calculateAverage(allPatientVLData))
    }
  }, [allPatientVLData])

  useEffect(() => {
    if (recentVLData) {
      // console.log(recentVLData, 'recentVLdata')
      handleNext()
      send()
    }
  }, [handleNext, recentVLData, send])

  return (
    <>
      <div className="w-2/3 border border-slate-200 rounded-lg ">
        <CardHeader
          header="Viral Load"
          rightContent={<Badge className="shadow-none">LDL</Badge>}
        />

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
              variant="outline"
              className=" shadow-none text-black hover:bg-slate-100"
              size={'sm'}
            >
              <ChevronsLeft size={15} className="mr-2" /> Prev
            </Button>
            {recentVLData
              ? (
              <Button
                className=" shadow-none hover:bg-slate-100 text-black"
                disabled={isLoading}
                variant={'outline'}
                onClick={() => {
                  handleNext()
                }}
                size={'sm'}
              >
                Next <ChevronsRight className="ml-2" size={15} />
              </Button>
                )
              : (
              <Button
                className="bg-teal-600 hover:bg-teal-500 shadow-none text-white"
                disabled={isLoading}
                onClick={() => {
                  addViralLoadTest(inputValues[0])
                }}
                size={'sm'}
              >
                {isLoading && <Loader2 className='mr-2 animate-spin' size={18} />}
                Save
              </Button>
                )}
          </div>
        </div>

        {/*  */}
      </div>
      {/* recent viral load */}

      <RecentViralLoadCard average={average} data={vlData} />
    </>
  )
}

export default LabTests
