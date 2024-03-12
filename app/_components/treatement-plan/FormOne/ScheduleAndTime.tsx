/* eslint-disable import/no-extraneous-dependencies */

export interface ScheduleAndTimeProps {
  morningPlace: string
  setMorningPlace: (val: string) => void
  morningTime: string
  setMorningTime: (val: string) => void
  eveningPlace: string
  setEveningPlace: (val: string) => void
  eveningTime: string
  setEveningTime: (val: string) => void
  medicineStorage: string
  setMedicineStorage: (val: string) => void
  toolsAndCues: string
  setToolsAndCues: (val: string) => void
  goal: string
  setGoal: (val: string) => void
}
const ScheduleAndTime = ({
  morningPlace,
  setMorningPlace,
  morningTime,
  setMorningTime,
  eveningPlace,
  setEveningPlace,
  eveningTime,
  setEveningTime,
  medicineStorage,
  setMedicineStorage,
  toolsAndCues,
  setToolsAndCues,
  goal,
  setGoal
}: ScheduleAndTimeProps) => (
  <div className="flex flex-col gap-y-6 border p-4 rounded-lg mt-4">
    <div>
      <div>Hours</div>
      <div>Minutes</div>
    </div>
  </div>
)

export default ScheduleAndTime
