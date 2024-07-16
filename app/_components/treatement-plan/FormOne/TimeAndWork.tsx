/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import CustomTimeInput2 from '@/components/forms/CustomTimeInput2'

export interface TimeAndWorkProps {
  wakeUpTime: string
  setWakeUpTime: (wakeUp: string) => void
  //
  departureHomeTime: string
  setDepartureHomeTime: (departure: string) => void
  //
  arrivalTime: string
  setArrivalTime: (arrival: string) => void

  departureTime: string
  setDepartureTime: (depTime: string) => void
}

const TimeAndWork = ({
  wakeUpTime,
  setWakeUpTime,

  departureHomeTime,
  setDepartureHomeTime,

  //
  arrivalTime,
  setArrivalTime,

  //
  departureTime,
  setDepartureTime

}: TimeAndWorkProps) => {
  return (
    <div className="flex-1 flex flex-col space-y-2 border p-4 rounded-lg bg-white">
      <CustomTimeInput2
        label="What time do you wake up mostly?"
        onChange={setWakeUpTime}
        value={wakeUpTime}
      />

      <CustomTimeInput2
        label="What time do you leave for school or work?"
        onChange={setDepartureHomeTime}
        value={departureHomeTime}
      />

      <CustomTimeInput2
        label="What time do you leave from work or school?"
        onChange={setArrivalTime}
        value={arrivalTime}
      />

      <CustomTimeInput2
        label="What time do you get home from work or school?"
        onChange={setDepartureTime}
        value={departureTime}
      />

    </div>
  )
}

export default TimeAndWork
