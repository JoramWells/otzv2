/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'
import { useAddUserAvailabilityMutation } from '@/api/users/userAvailability.api'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { type CheckedState } from '@radix-ui/react-checkbox'
import { Loader2 } from 'lucide-react'
import { useCallback, useState } from 'react'

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

  const { data } = useGetAllUsersQuery()
  const userOptions = useCallback(() => {
    return (data?.map((item: any) => ({
      id: item.id,
      label: item.firstName
    })) || []
    )
  }, [data])

  const [addUserAvailability, { isLoading }] = useAddUserAvailabilityMutation()

  const handleChange = async () => {
    const inputValues = {
      userID: userOptions()?.length > 0 && userOptions()[0]?.id,
      daysAvailable,
      startTime,
      endTime
    }
    await addUserAvailability(inputValues)
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
                value={startTime}
                />
              </div>
              <div>
                <label htmlFor="" className="mb-1">
                  End Time
                </label>

                <Input type="time" className="shadow-none"
                onChange={e => { setEndTime(e.target.value) }}
                value={endTime}
                />
              </div>
            </div>
          </div>
          <Button
          className='mt-4'
          onClick={async () => { await handleChange() }}
          >
            {isLoading && <Loader2 className='mr-2 animate-spin' size={15} />}
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Availability
