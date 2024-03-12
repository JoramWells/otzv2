/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

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
    <div>
      <div>Hours</div>
      <div>Minutes</div>
    </div>

  </div>
)

export default TimeAndWork
