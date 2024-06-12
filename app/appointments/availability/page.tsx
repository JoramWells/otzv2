/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'
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
  }
]

interface DaysAvailableProps {
  daysAvailable?: string[]
  day: number
}

const Availability = () => {
  const [daysAvailable, setDaysAvailable] = useState<DaysAvailableProps>({
    daysAvailable: [],
    day: 0
  })
  const onHandleChange = (day: number, value: CheckedState) => {
    setDaysAvailable({
      ...daysAvailable,
      [day]: value
    })
    console.log(daysAvailable)
  }

  return (
    <div>
      Availability
      {days.map((item: any) => (
        <div key={item.day}>
          <Checkbox
            onCheckedChange={(e: CheckedState) => { onHandleChange(item.day, e) }}
          />
          {item.day}
        </div>
      ))}
      <div>
        <Input type="time" />
      </div>
    </div>
  )
}

export default Availability
