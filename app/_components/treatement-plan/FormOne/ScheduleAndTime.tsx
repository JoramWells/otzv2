/* eslint-disable import/no-extraneous-dependencies */

import { useGetPrescriptionQuery } from '@/api/pillbox/prescription.api'
import CustomInput from '@/components/forms/CustomInput'
import CustomTimeInput from '@/components/forms/CustomTimeInput'

export interface ScheduleAndTimeProps {
  morningPlace: string
  morningWeekendPlace: string
  setMorningPlace: (val: string) => void
  setMorningPlaceWeekend: (val: string) => void
  eveningPlace: string
  eveningWeekendPlace: string
  setEveningPlace: (val: string) => void
  setEveningPlaceWeekend: (val: string) => void
  morningHours: string
  setMorningHours: (val: string) => void
  morningMinutes: string
  setMorningMinutes: (val: string) => void
  eveningHours: string
  setEveningHours: (val: string) => void
  eveningMinutes: string
  setEveningMinutes: (val: string) => void
  morningHoursWeekend: string
  setMorningHoursWeekend: (val: string) => void
  morningMinutesWeekend: string
  setMorningMinutesWeekend: (val: string) => void
  eveningHoursWeekend: string
  setEveningHoursWeekend: (val: string) => void
  eveningMinutesWeekend: string
  appointmentID: string | null
  setEveningMinutesWeekend: (val: string) => void
}
const ScheduleAndTime = ({
  appointmentID,
  morningPlace,
  morningWeekendPlace,
  setMorningPlace,
  setMorningPlaceWeekend,
  eveningPlace,
  eveningWeekendPlace,
  setEveningPlace,
  setEveningPlaceWeekend,

  morningHours,
  setMorningHours,
  morningMinutes,
  setMorningMinutes,
  eveningHours,
  setEveningHours,
  eveningMinutes,
  setEveningMinutes,
  morningHoursWeekend,
  setMorningHoursWeekend,
  morningMinutesWeekend,
  setMorningMinutesWeekend,
  eveningHoursWeekend,
  setEveningHoursWeekend,
  eveningMinutesWeekend,
  setEveningMinutesWeekend
}: ScheduleAndTimeProps) => {
  const { data: prescriptionDatam } = useGetPrescriptionQuery(appointmentID)
  return (
      <div className='flex-1 border p-4 rounded-lg'>
        <div>
          <p className="mb-2 text-slate-500">
            Based on your schedule, what is the best time and place to take
            medicine?
          </p>
          <div className="flex flex-row gap-x-6">
            <CustomTimeInput
              label="Morning Time"
              hours={morningHours}
              setHours={setMorningHours}
              minutes={morningMinutes}
              setMinutes={setMorningMinutes}
            />
            <CustomInput
              label="Enter Place"
              value={morningPlace}
              onChange={setMorningPlace}
            />
          </div>
        </div>

        {/*  */}
        {prescriptionDatam?.frequency === 2 && (
          <div className="flex flex-row gap-x-6">
            <CustomTimeInput
              label="Evening Time"
              hours={eveningHours}
              setHours={setEveningHours}
              minutes={eveningMinutes}
              setMinutes={setEveningMinutes}
            />
            <CustomInput
              label="Enter Place"
              value={eveningPlace}
              onChange={setEveningPlace}
            />
          </div>
        )}

        <div>
          <p className="mb-2 text-slate-500">
            If these routine changes during weekend (other days) how can this
            modified?
          </p>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row gap-x-6">
              <CustomTimeInput
                label="Morning Time"
                hours={morningHoursWeekend}
                setHours={setMorningHoursWeekend}
                minutes={morningMinutesWeekend}
                setMinutes={setMorningMinutesWeekend}
              />
              <CustomInput
                label="Enter Place"
                value={morningWeekendPlace}
                onChange={setMorningPlaceWeekend}
              />
            </div>

            {prescriptionDatam?.frequency === 2 && (
              <div className="flex flex-row gap-x-6">
                <CustomTimeInput
                  label="Evening Time"
                  hours={eveningHoursWeekend}
                  setHours={setEveningHoursWeekend}
                  minutes={eveningMinutesWeekend}
                  setMinutes={setEveningMinutesWeekend}
                />
                <CustomInput
                  label="Enter Place"
                  value={eveningWeekendPlace}
                  onChange={setEveningPlaceWeekend}
                />
              </div>
            )}
          </div>
        </div>

      </div>
  )
}

export default ScheduleAndTime
