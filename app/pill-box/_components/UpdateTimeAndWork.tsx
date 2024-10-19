/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  useAddTimeAndWorkMutation
} from '@/api/treatmentplan/timeAndWork.api'
import { Loader2 } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

import TimeAndWork from '@/app/_components/treatement-plan/FormOne/TimeAndWork'
import ScheduleAndTime from '@/app/_components/treatement-plan/FormOne/ScheduleAndTime'
import Plan from '@/app/_components/treatement-plan/FormOne/Plan'
import { useAddPatientVisitMutation } from '@/api/patient/patientVisits.api'
import { useSession } from 'next-auth/react'

const UpdateTimeAndWork = ({ frequency, patientID }: { frequency: number, patientID: string }) => {
  const [morningPlace, setMorningPlace] = useState('')
  const [eveningPlace, setEveningPlace] = useState('')
  const [medicineStorage, setMedicineStorage] = useState('')
  const [toolAndCues, setToolAndCues] = useState('')
  const [goal, setGoal] = useState('')
  const [userID, setUserID] = useState<string>()
  const { data: session } = useSession()
  //
  const [morningTime, setMorningTime] = useState<string | undefined>()
  const [eveningTime, setEveningTime] = useState<string | undefined>()

  //
  const [morningTimeWeekend, setMorningTimeWeekend] = useState('00')
  const [eveningTimeWeekend, setEveningTimeWeekend] = useState('00')

  //
  const [wakeUpTime, setWakeUpTime] = useState('00')
  const [departureHomeTime, setDepartureHomeTime] = useState('00')

  //
  const [arrivalTime, setArrivalTime] = useState('00')
  // const [departureTime, setDepartureTime] = useState("");
  // const [arrivalHomeTime, setArrivalHomeTime] = useState("");

  const [departureTime, setDepartureTime] = useState('00')
  const [addPatientVisit, { isLoading: isLoadingPatientVisit, data: visitData }] =
    useAddPatientVisitMutation()

  const inputValues = useMemo(
    () => [
      {
        patientID,
        wakeUpTime,
        departureHomeTime,
        arrivalTime,
        // arrivalHomeTime,
        departureTime,
        morningPlace,
        morningMedicineTime: morningTime,
        eveningPlace,
        eveningMedicineTime: eveningTime,
        medicineStorage,
        toolAndCues,
        eveningTimeWeekend,
        goal
        // patientVisitID: appointmentID
      }
    ],
    [arrivalTime, departureHomeTime, departureTime, eveningPlace, eveningTime, eveningTimeWeekend, goal, medicineStorage, morningPlace, morningTime, patientID, toolAndCues, wakeUpTime]
  )[0]

  //   const { data: timeData } = useGetTimeAndWorkQuery(appointmentID)
  //   console.log(timeData, 'tData')

  //   const { data: patientTimeAndWorkData } =
  //     useGetTimeAndWorkByPatientIDQuery(patientID)

  //   console.log(patientTimeAndWorkData, 'latest time')

  const [addTimeAndWork, { isLoading, data: savedData }] =
    useAddTimeAndWorkMutation()

  const handleStartVisit = async () => {
    const newVisitID = uuidv4()
    const inputValues2 = {
      patientID,
      userID,
      id: newVisitID
    }
    await addPatientVisit(inputValues2).then(async (res) => {
      await addTimeAndWork({ ...inputValues, patientVisitID: res.data.id })
    })
  }

  useEffect(() => {
    if (session) {
      const { user } = session
      setUserID(user?.id)
    }
  }, [addTimeAndWork, inputValues, session, visitData])

  console.log(savedData, 'sdata')

  return (
    <>

        <div className="p-4 w-full flex-col flex space-y-2">
            {/* <CollapseButton2 label="Schedule"> */}
            <TimeAndWork
              wakeUpTime={wakeUpTime}
              setWakeUpTime={setWakeUpTime}
              //
              departureHomeTime={departureHomeTime}
              setDepartureHomeTime={setDepartureHomeTime}
              //
              arrivalTime={arrivalTime}
              setArrivalTime={setArrivalTime}
              //
              departureTime={departureTime}
              setDepartureTime={setDepartureTime}
            />

            {/* <ListCounter text={2} /> */}

            {/* <CollapseButton2 label="Time"> */}
            <ScheduleAndTime
            //   appointmentID={appointmentID}
            frequency={frequency}
              morningPlace={morningPlace}
              setMorningPlace={setMorningPlace}
              eveningPlace={eveningPlace}
              setEveningPlace={setEveningPlace}
              // time
              morningTime={morningTime}
              setMorningTime={setMorningTime}
              //
              eveningTime={eveningTime}
              setEveningTime={setEveningTime}
              //
              morningTimeWeekend={morningTimeWeekend}
              setMorningTimeWeekend={setMorningTimeWeekend}
              //
              eveningTimeWeekend={eveningTimeWeekend}
              setEveningTimeWeekend={setEveningTimeWeekend}
              //
              eveningWeekendPlace=""
              morningWeekendPlace=""
              setEveningPlaceWeekend={() => {}}
              setMorningPlaceWeekend={() => {}}
            />

          {/*  */}
            {/* <CollapseButton2 label="Goal for this plan"> */}
            <Plan
              medicineStorage={medicineStorage}
              setMedicineStorage={setMedicineStorage}
              toolsAndCues={toolAndCues}
              setToolsAndCues={setToolAndCues}
              goal={goal}
              setGoal={setGoal}
            />
        </div>

        <div className="flex justify-end p-4 pt-0 space-x-4">
            <Button
              className="bg-teal-600 shadow-none hover:bg-teal-500 text-white"
              onClick={async () => { await handleStartVisit() }}
              disabled={isLoading || isLoadingPatientVisit}
              size={'sm'}
            >
              {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
              Save
            </Button>
        </div>

      {/* recent time and work */}
    </>
  )
}

export default UpdateTimeAndWork
