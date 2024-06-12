'use client'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
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

const Availability = () => {
  const [daysAvailable, setDaysAvailable] = useState([])
  const onHandleChange = (day, value) => {
    setDaysAvailable({
      ...daysAvailable,
      [day]: value
    })
    console.log(daysAvailable)
  }

  return (
    <div>Availability
{days.map(item =>
<div
key={item.day}
>
    <Checkbox
    onCheckedChange={e => { onHandleChange(item.day, e) }}
    />
    {item.day}
</div>

)}

<div>
  <Input type='time' />
</div>

    </div>
  )
}

export default Availability
