/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { useState } from 'react'

import { useAddPatientMutation } from '@/api/patient/patients.api'
import TimeAndWork from './TimeAndWork'
import ScheduleAndTime from './ScheduleAndTime'

const FormOne = () => {
  const [activeStep, setActiveStep] = useState(1)

  const [wakeUpTime, setWakeUpTime] = useState('')
  const [departureHomeTime, setDepartureHomeTime] = useState('')
  const [arrivalTime, setArrivalTime] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [arrivalHomeTime, setArrivalHomeTime] = useState('')
  const [morningPlace, setMorningPlace] = useState('')
  const [morningTime, setMorningTime] = useState('')
  const [eveningPlace, setEveningPlace] = useState('')
  const [eveningTime, setEveningTime] = useState('')
  const [medicineStorage, setMedicineStorage] = useState('')
  const [toolAndCues, setToolAndCues] = useState('')
  const [goal, setGoal] = useState('')

  //
  const [morningHours, setMorningHours] = useState('')
  const [morningMinutes, setMorningMinutes] = useState('')
  const [eveningHours, setEveningHours] = useState('')
  const [eveningMinutes, setEveningMinutes] = useState('')

  //
  const [morningHoursWeekend, setMorningHoursWeekend] = useState('')
  const [morningMinutesWeekend, setMorningMinutesWeekend] = useState('')
  const [eveningHoursWeekend, setEveningHoursWeekend] = useState('')
  const [eveningMinutesWeekend, setEveningMinutesWeekend] = useState('')

  //
  const [wakeUpTimeHours, setWakeUpTimeHours] = useState('')
  const [wakeUpTimeMinutes, setWakeUpTimeMinutes] = useState('')
  const [departureHomeTimeHours, setDepartureHomeTimeHours] = useState('')
  const [departureHomeTimeMinutes, setDepartureHomeTimeMinutes] = useState('')

  //
  const [arrivalTimeHours, setArrivalTimeHours] = useState('')
  const [arrivalTimeMinutes, setArrivalTimeMinutes] = useState('')
  // const [departureTime, setDepartureTime] = useState("");
  // const [arrivalHomeTime, setArrivalHomeTime] = useState("");

  const [departureTimeHours, setDepartureTimeHours] = useState('')
  const [departureTimeMinutes, setDepartureTimeMinutes] = useState('')

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
    goal
  }

  // const { activeStep } = useSteps({
  //   index: 1,
  //   count: steps.length
  // })

  const handleNext = async () => {
    if (activeStep === 3) {
      await addPatient(inputValues)
    } else {
      setActiveStep((prevStep) => prevStep + 1)
    }
    // navigate({
    //   pathname: '/add-invoice',
    //   search: `?id=${invoiceId}`,
    // });
    // setSearchParams(activeStep);
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const [addPatient, { isLoading }] = useAddPatientMutation()

  return (
    <div
      style={{
        width: '100%'
      }}
    >

        <TimeAndWork
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
          morningPlace={morningPlace}
          setMorningPlace={setMorningPlace}
          morningTime={morningTime}
          setMorningTime={setMorningTime}
          eveningPlace={eveningPlace}
          setEveningPlace={setEveningPlace}
          eveningTime={eveningTime}
          setEveningTime={setEveningTime}
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
        />

    </div>
  )
}

export default FormOne
