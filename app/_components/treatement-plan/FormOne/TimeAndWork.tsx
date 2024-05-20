/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import CustomTimeInput from '../../../../components/forms/CustomTimeInput'

export interface TimeAndWorkProps {
  wakeUpTimeHours: string
  setWakeUpTimeHours: (wakeUp: string) => void
  wakeUpTimeMinutes: string
  setWakeUpTimeMinutes: (wakeUp: string) => void
  //
  departureHomeTimeHours: string
  setDepartureHomeTimeHours: (departure: string) => void
  departureHomeTimeMinutes: string
  setDepartureHomeTimeMinutes: (departure: string) => void

  //
  arrivalTimeHours: string
  setArrivalTimeHours: (arrival: string) => void
  arrivalTimeMinutes: string
  setArrivalTimeMinutes: (arrival: string) => void

  //
  // departureTime: string
  // setDepartureTime: (depTime: string) => void
  // arrivalHomeTime: string
  // setArrivalHomeTime: (arr: string) => void

  //
  //
  departureTimeHours: string
  setDepartureTimeHours: (depTime: string) => void
  departureTimeMinutes: string
  setDepartureTimeMinutes: (arr: string) => void
}

const TimeAndWork = ({
  wakeUpTimeHours,
  setWakeUpTimeHours,
  wakeUpTimeMinutes,
  setWakeUpTimeMinutes,
  departureHomeTimeHours,
  setDepartureHomeTimeHours,
  departureHomeTimeMinutes,
  setDepartureHomeTimeMinutes,

  //
  arrivalTimeHours,
  setArrivalTimeHours,
  arrivalTimeMinutes,
  setArrivalTimeMinutes,

  //
  departureTimeHours,
  setDepartureTimeHours,
  departureTimeMinutes,
  setDepartureTimeMinutes
}: TimeAndWorkProps) => (
  <div className="flex flex-col gap-y-6 border p-4 rounded-lg">
    <CustomTimeInput
      label="What time do you wake up mostly?"
      hours={wakeUpTimeHours}
      setHours={setWakeUpTimeHours}
      minutes={wakeUpTimeMinutes}
      setMinutes={setWakeUpTimeMinutes}
    />
    <CustomTimeInput
      label="What time do you leave for school or work?"
      hours={departureHomeTimeHours}
      setHours={setDepartureHomeTimeHours}
      minutes={departureHomeTimeMinutes}
      setMinutes={setDepartureHomeTimeMinutes}
    />
    <CustomTimeInput
      label="What time do you leave from work or school?"
      hours={arrivalTimeHours}
      setHours={setArrivalTimeHours}
      minutes={arrivalTimeMinutes}
      setMinutes={setArrivalTimeMinutes}
    />
    <CustomTimeInput
      label="What time do you get home from work or school?"
      hours={departureTimeHours}
      setHours={setDepartureTimeHours}
      minutes={departureTimeMinutes}
      setMinutes={setDepartureTimeMinutes}
    />
  </div>
)

export default TimeAndWork
