/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { useState } from 'react'

import { useAddPatientMutation } from '@/api/patient/patients.api'
import TimeAndWork from './TimeAndWork'
import ScheduleAndTime from './ScheduleAndTime'
import { Button } from '@/components/ui/button'
import { useAddTimeAndWorkMutation, useGetTimeAndWorkQuery } from '@/api/treatmentplan/timeAndWork.api'
import { Loader2 } from 'lucide-react'

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
  const [morningHours, setMorningHours] = useState('00')
  const [morningMinutes, setMorningMinutes] = useState('00')
  const [eveningHours, setEveningHours] = useState('00')
  const [eveningMinutes, setEveningMinutes] = useState('00')

  //
  const [morningHoursWeekend, setMorningHoursWeekend] = useState('00')
  const [morningMinutesWeekend, setMorningMinutesWeekend] = useState('00')
  const [eveningHoursWeekend, setEveningHoursWeekend] = useState('00')
  const [eveningMinutesWeekend, setEveningMinutesWeekend] = useState('00')

  //
  const [wakeUpTimeHours, setWakeUpTimeHours] = useState('00')
  const [wakeUpTimeMinutes, setWakeUpTimeMinutes] = useState('00')
  const [departureHomeTimeHours, setDepartureHomeTimeHours] = useState('00')
  const [departureHomeTimeMinutes, setDepartureHomeTimeMinutes] = useState('00')

  //
  const [arrivalTimeHours, setArrivalTimeHours] = useState('00')
  const [arrivalTimeMinutes, setArrivalTimeMinutes] = useState('00')
  // const [departureTime, setDepartureTime] = useState("");
  // const [arrivalHomeTime, setArrivalHomeTime] = useState("");

  const [departureTimeHours, setDepartureTimeHours] = useState('00')
  const [departureTimeMinutes, setDepartureTimeMinutes] = useState('00')

  const morningTime = `${morningHours}:${morningMinutes}`
  const arrivalHomeTime = `${arrivalTimeHours}:${arrivalTimeMinutes}`
  const eveningTime = `${eveningHours}:${eveningMinutes}`
  const eveningTimeWeekend = `${eveningHoursWeekend}:${eveningMinutesWeekend}`
  const wakeUpTime = `${wakeUpTimeHours}:${wakeUpTimeMinutes}`
  const arrivalTime = `${arrivalTimeHours}:${arrivalTimeMinutes}`
  const departureHomeTime = `${departureHomeTimeHours}:${departureHomeTimeMinutes}`
  const departureTime = `${departureTimeHours}:${departureTimeMinutes}`
  // console.log(morningTime, morningHours, 'uty')

  const inputValues = {
    wakeUpTime,
    departureHomeTime,
    arrivalTime,
    arrivalHomeTime,
    departureTime,
    morningPlace,
    morningTime,
    eveningPlace,
    eveningTime,
    medicineStorage,
    toolAndCues,
    eveningTimeWeekend,
    goal,
    patientVisitID: appointmentID
  }

  const { data: timeData } = useGetTimeAndWorkQuery(appointmentID)
  console.log(timeData, 'tData')

  const [addTimeAndWork, { isLoading, data: savedData }] = useAddTimeAndWorkMutation()

  // const { activeStep } = useSteps({
  //   index: 1,
  //   count: steps.length
  // })

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="flex justify-between items-center w-full border-b border-slate-200 p-4 bg-slate-100 rounded-t-lg">
        <p className="text-lg  font-bold">Time & Work Schedule</p>
        <p>Last Updated:</p>
      </div>
      <div className='w-full  p-4'>
        <TimeAndWork
          appointmentID={appointmentID}
          wakeUpTimeHours={wakeUpTimeHours}
          setWakeUpTimeHours={setWakeUpTimeHours}
          wakeUpTimeMinutes={wakeUpTimeMinutes}
          setWakeUpTimeMinutes={setWakeUpTimeMinutes}
          //
          departureHomeTimeHours={departureHomeTimeHours}
          setDepartureHomeTimeHours={setDepartureHomeTimeHours}
          departureHomeTimeMinutes={departureHomeTimeMinutes}
          setDepartureHomeTimeMinutes={setDepartureHomeTimeMinutes}
          //
          arrivalTimeHours={arrivalTimeHours}
          setArrivalTimeHours={setArrivalTimeHours}
          arrivalTimeMinutes={arrivalTimeMinutes}
          setArrivalTimeMinutes={setArrivalTimeMinutes}
          //
          departureTimeHours={departureTimeHours}
          setDepartureTimeHours={setDepartureTimeHours}
          departureTimeMinutes={departureTimeMinutes}
          setDepartureTimeMinutes={setDepartureTimeMinutes}
          // arrivalHomeTime={arrivalHomeTime}
          // setArrivalHomeTime={setArrivalHomeTime}
        />
        <ScheduleAndTime
          appointmentID={appointmentID}
          morningPlace={morningPlace}
          setMorningPlace={setMorningPlace}
          eveningPlace={eveningPlace}
          setEveningPlace={setEveningPlace}
          medicineStorage={medicineStorage}
          setMedicineStorage={setMedicineStorage}
          toolsAndCues={toolAndCues}
          setToolsAndCues={setToolAndCues}
          goal={goal}
          setGoal={setGoal}
          // time
          morningHours={morningHours}
          setMorningHours={setMorningHours}
          morningMinutes={morningMinutes}
          setMorningMinutes={setMorningMinutes}
          //
          eveningHours={eveningHours}
          setEveningHours={setEveningHours}
          eveningMinutes={eveningMinutes}
          setEveningMinutes={setEveningMinutes}
          //
          morningHoursWeekend={morningHoursWeekend}
          setMorningMinutesWeekend={setMorningMinutesWeekend}
          morningMinutesWeekend={morningMinutesWeekend}
          setMorningHoursWeekend={setMorningHoursWeekend}
          //
          eveningHoursWeekend={eveningHoursWeekend}
          setEveningHoursWeekend={setEveningHoursWeekend}
          eveningMinutesWeekend={eveningMinutesWeekend}
          setEveningMinutesWeekend={setEveningMinutesWeekend}
          //
          eveningWeekendPlace=""
          morningWeekendPlace=""
          setEveningPlaceWeekend={() => {}}
          setMorningPlaceWeekend={() => {}}
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
        {timeData || savedData
          ? (
          <Button
            className="bg-slate-200 shadow-none hover:bg-slate-100 text-black"
            onClick={() => {
              handleNext()
            }}
          >
            Next
          </Button>
            )
          : (
          <Button
            className="bg-slate-200 shadow-none hover:bg-slate-100 text-black"
            onClick={async () => await addTimeAndWork(inputValues)}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="animate-spin mr-2" size={18} />}
            Save
          </Button>
            )}
      </div>
    </div>
  )
}

export default FormOne
