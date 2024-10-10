/* eslint-disable multiline-ternary */
/* eslint-disable import/no-extraneous-dependencies */

import { useGetPrescriptionQuery } from '@/api/pillbox/prescription.api'
import CustomInput from '@/components/forms/CustomInput'
import CustomTimeInput2 from '@/components/forms/CustomTimeInput2'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export interface ScheduleAndTimeProps {
  morningPlace: string
  morningWeekendPlace: string
  setMorningPlace: (val: string) => void
  setMorningPlaceWeekend: (val: string) => void
  eveningPlace: string
  eveningWeekendPlace: string
  setEveningPlace: (val: string) => void
  setEveningPlaceWeekend: (val: string) => void
  morningTime: string | undefined
  setMorningTime: (val: string | undefined) => void
  eveningTime: string | undefined
  setEveningTime: (val: string | undefined) => void
  morningTimeWeekend: string
  setMorningTimeWeekend: (val: string) => void
  eveningTimeWeekend: string
  setEveningTimeWeekend: (val: string) => void
  appointmentID: string | null
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

  morningTime,
  setMorningTime,
  eveningTime,
  setEveningTime,
  morningTimeWeekend,
  setMorningTimeWeekend,
  eveningTimeWeekend,
  setEveningTimeWeekend
}: ScheduleAndTimeProps) => {
  const { data: prescriptionDatam } = useGetPrescriptionQuery(appointmentID)
  const [tabValue, setTabValue] = useState('Morning')

  return (
    <div className="flex-1 border p-4 rounded-lg">
      <div>
        <p className="mb-2 text-slate-500">
          Based on your schedule, what is the best time and place to take
          medicine?
        </p>
        {/*  */}
        {prescriptionDatam?.frequency === 1 ? (
          <div>
            <div className="pb-2 flex space-x-2">
              {['Morning', 'Evening'].map((item) => (
                <Button
                  key={item}
                  onClick={() => {
                    setTabValue(item)
                  }}
                  className="rounded-full bg-slate-50 text-slate-500 hover:bg-slate-200"
                  size={'sm'}
                >
                  {item}
                </Button>
              ))}
            </div>

            {/*  */}
            {tabValue === 'Morning' ? (
              <div className="flex flex-row gap-x-6">
                <div className="w-1/4">
                  <CustomTimeInput2
                    label="Morning Time"
                    onChange={setMorningTime}
                    value={morningTime}
                  />
                </div>
                {/* <CustomTimeInput
              label="Morning Time"
              Time={morningTime}
              setTime={setMorningTime}
              minutes={morningMinutes}
              setMinutes={setMorningMinutes}
            /> */}
                <CustomInput
                  label="Enter Place"
                  value={morningPlace}
                  onChange={setMorningPlace}
                />
              </div>
            ) : (
              <div className="flex flex-row gap-x-6">
                <div className="w-1/4">
                  <CustomTimeInput2
                    label="Evening Time"
                    onChange={setEveningTime}
                    value={eveningTime}
                  />
                </div>
                {/* <CustomTimeInput
            label="Evening Time"
            Time={eveningTime}
            setTime={setEveningTime}
            minutes={eveningMinutes}
            setMinutes={setEveningMinutes}
          /> */}
                <CustomInput
                  label="Enter Place"
                  value={eveningPlace}
                  onChange={setEveningPlace}
                />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-row gap-x-6">
              <div className="w-1/4">
                <CustomTimeInput2
                  label="Morning Time"
                  onChange={setMorningTime}
                  value={morningTime}
                />
              </div>
              {/* <CustomTimeInput
              label="Morning Time"
              Time={morningTime}
              setTime={setMorningTime}
              minutes={morningMinutes}
              setMinutes={setMorningMinutes}
            /> */}
              <CustomInput
                label="Enter Place"
                value={morningPlace}
                onChange={setMorningPlace}
              />
            </div>
          </>
        )}
      </div>

      {/*  */}
      {/* <div className="flex flex-row gap-x-6">
        <div className="w-1/4">
          <CustomTimeInput2
            label="Evening Time"
            onChange={setEveningTime}
            value={eveningTime}
          />
        </div> */}
        {/* <CustomTimeInput
            label="Evening Time"
            Time={eveningTime}
            setTime={setEveningTime}
            minutes={eveningMinutes}
            setMinutes={setEveningMinutes}
          /> */}
        {/* <CustomInput
          label="Enter Place"
          value={eveningPlace}
          onChange={setEveningPlace}
        />
      </div> */}

      <div>
        <p className="mb-2 text-slate-500">
          If these routine changes during weekend (other days) how can this
          modified?
        </p>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row gap-x-6">
            <div className="w-1/4">
              <CustomTimeInput2
                label="Morning Time"
                onChange={setMorningTimeWeekend}
                value={morningTimeWeekend}
              />
            </div>

            {/* <CustomTimeInput
              label="Morning Time"
              Time={morningTimeWeekend}
              setTime={setMorningTimeWeekend}
              minutes={morningMinutesWeekend}
              setMinutes={setMorningMinutesWeekend}
            /> */}
            <CustomInput
              label="Enter Place"
              value={morningWeekendPlace}
              onChange={setMorningPlaceWeekend}
            />
          </div>

          {prescriptionDatam?.frequency === 2 && (
            <div className="flex flex-row gap-x-6">
              <div className="w-1/4">
                <CustomTimeInput2
                  label="Morning Time"
                  onChange={setEveningTimeWeekend}
                  value={eveningTimeWeekend}
                />
              </div>
              {/* <CustomTimeInput
                label="Evening Time"
                Time={eveningTimeWeekend}
                setTime={setEveningTimeWeekend}
                minutes={eveningMinutesWeekend}
                setMinutes={setEveningMinutesWeekend}
              /> */}
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
