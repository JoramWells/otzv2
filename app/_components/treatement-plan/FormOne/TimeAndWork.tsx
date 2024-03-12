/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import CustomTimeInput from '../../forms/CustomTimeInput'

export interface TimeAndWorkProps {
  wakeUpTime: string
  setWakeUpTime: (wakeUp: string) => void
  departureHomeTime: string
  setDepartureHomeTime: (departure: string) => void
  arrivalTime: string
  setArrivalTime: (arrival: string) => void
  departureTime: string
  setDepartureTime: (depTime: string) => void
  arrivalHomeTime: string
  setArrivalHomeTime: (arr: string) => void
}

const TimeAndWork = ({
  wakeUpTime,
  setWakeUpTime,
  departureHomeTime,
  setDepartureHomeTime,
  arrivalTime,
  setArrivalTime,
  departureTime,
  setDepartureTime,
  arrivalHomeTime,
  setArrivalHomeTime
}: TimeAndWorkProps) => (
  <div className="flex flex-col gap-y-6 border p-4 rounded-lg mt-4">
    <CustomTimeInput label="What time do you wake up mostly?" />
    <CustomTimeInput label="What time do you leave for school or work?" />
    <CustomTimeInput label="What time do you leave from work or school?" />
    <CustomTimeInput label="What time do you get home from work or school?" />
  </div>
)

export default TimeAndWork
