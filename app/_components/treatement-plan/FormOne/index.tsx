/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { useState } from 'react'

import TimeAndWork from './TimeAndWork'
import ScheduleAndTime from './ScheduleAndTime'
import { Button } from '@/components/ui/button'
import { useAddTimeAndWorkMutation, useGetTimeAndWorkByPatientIDQuery, useGetTimeAndWorkQuery } from '@/api/treatmentplan/timeAndWork.api'
import { ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react'

import Plan from './Plan'
import RecentTimeWorkScheduleCard from './RecentTimeWorkScheduleCard'
import CardHeader from '@/app/users/patients/tab/steps/_components/CardHeader'
import { useGetPrescriptionQuery } from '@/api/pillbox/prescription.api'

interface AddTriageProps {
  handleNext: () => void
  handleBack: () => void
  patientID: string
  appointmentID: string | null
  // formData: []
};

const FormOne = ({
  patientID,
  handleNext,
  handleBack,
  appointmentID
  // formData
  // activeStep,
}: AddTriageProps) => {
  const [morningPlace, setMorningPlace] = useState('')
  const [eveningPlace, setEveningPlace] = useState('')
  const [medicineStorage, setMedicineStorage] = useState('')
  const [toolAndCues, setToolAndCues] = useState('')
  const [goal, setGoal] = useState('')

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

  const inputValues = {
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
    goal,
    patientVisitID: appointmentID
  }

  const { data: timeData } = useGetTimeAndWorkQuery(appointmentID)
  console.log(timeData, 'tData')

  const { data: patientTimeAndWorkData } = useGetTimeAndWorkByPatientIDQuery(patientID)

  console.log(patientTimeAndWorkData, 'latest time')

  const [addTimeAndWork, { isLoading, data: savedData }] = useAddTimeAndWorkMutation()
  const { data: prescriptionDatam } = useGetPrescriptionQuery(appointmentID as string)

  // const { activeStep } = useSteps({
  //   index: 1,
  //   count: steps.length
  // })

  return (
    <>
      <div className="w-3/4 flex flex-col bg-white border border-slate-200 rounded-lg">
        <CardHeader
          header="Time & Work Schedule"
          rightContent={
            <p className="text-slate-500 text-[14px] ">Last Updated:</p>
          }
        />

        <div className="p-4 w-full flex-col flex space-y-2">
          <div className="flex ">
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
          </div>

          <div className="flex">
            {/* <ListCounter text={2} /> */}

            {/* <CollapseButton2 label="Time"> */}
            <ScheduleAndTime
              frequency={prescriptionDatam?.id as unknown as number}
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
          </div>

          {/*  */}
          <div className="flex ">
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
        </div>

        <div className="flex justify-end p-4 pt-0 space-x-4">
          <Button
            onClick={() => {
              handleBack()
            }}
            className=" shadow-none text-slate-500 "
            variant={'outline'}
            size={'sm'}
          >
            <ChevronsLeft className="mr-2" size={18} />
            Back
          </Button>
          {timeData || savedData
            ? (
            <Button
              className=" shadow-none  text-slate-500"
              variant={'outline'}
              onClick={() => {
                handleNext()
              }}
              size={'sm'}
            >
              Next
              <ChevronsRight className="ml-2" size={18} />
            </Button>
              )
            : (
            <Button
              className="bg-teal-600 shadow-none hover:bg-teal-500 text-white"
              onClick={async () => await addTimeAndWork(inputValues)}
              disabled={isLoading}
              size={'sm'}
            >
              {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
              Save
            </Button>
              )}
        </div>
      </div>

      {/* recent time and work */}
      <RecentTimeWorkScheduleCard data={patientTimeAndWorkData} />
    </>
  )
}

export default FormOne
