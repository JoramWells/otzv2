/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { type CheckedState } from '@radix-ui/react-checkbox'
import { useState } from 'react'

const days = [
  {
    day: 'Sunday'
  },
  {
    day: 'Monday'
  },
  {
    day: 'Tuesday'
  },
  {
    day: 'Wednesday'
  },
  {
    day: 'Thursday'
  },
  {
    day: 'Friday'
  },
  {
    day: 'Saturday'
  }
]

interface DaysAvailableProps {
  Monday: boolean
  Tuesday: boolean
  Wednesday: boolean
  Thursday: boolean
  Friday: boolean
  Saturday: boolean
  Sunday: boolean
}

const Availability = () => {
  const [daysAvailable, setDaysAvailable] = useState<DaysAvailableProps>({
    Friday: false,
    Monday: false,
    Saturday: false,
    Sunday: false,
    Thursday: false,
    Tuesday: false,
    Wednesday: false

  })
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const onHandleChange = (day: number, value: CheckedState) => {
    setDaysAvailable({
      ...daysAvailable,
      [day]: value
    })
    console.log(daysAvailable)
  }

  const handleChange = () => {
    console.log({
      daysAvailable,
      startTime,
      endTime
    })
  }

  return (
    <div>
      <div className="p-4">
        <div className="bg-white rounded-lg p-4">
          <p className="font-bold">Availability Days</p>
          <div
            className="grid w-3/4 grid-cols-1 gap-4 lg:grid-cols-4  md:grid-cols-2
       bg-white rounded-lg
      "
          >
            {days.map((item: any) => (
              <div key={item.day} className="flex space-x-2 items-center  ">
                <Checkbox
                  onCheckedChange={(e: CheckedState) => {
                    onHandleChange(item.day, e)
                  }}
                />
                <label htmlFor="" className="text-slate-500">
                  {item.day}
                </label>
              </div>
            ))}
          </div>

          {/*  */}
          <hr className='mt-4 mb-4 ' />

          {/*  */}
          <div className="">
            <p
            className='font-bold '
            >Select Availability Time</p>

            <div className="flex space-x-2 w-1/4">
              <div className="flex flex-col">
                <label htmlFor="" className="mb-1">
                  Start Time
                </label>
                <Input type="time" className="shadow-none"
                onChange={e => { setStartTime(e.target.value) }}
                />
              </div>
              <div>
                <label htmlFor="" className="mb-1">
                  End Time
                </label>

                <Input type="time" className="shadow-none"
                onChange={e => { setEndTime(e.target.value) }}
                />
              </div>
            </div>
          </div>
          <Button
          className='mt-4'
          onClick={() => { handleChange() }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Availability
