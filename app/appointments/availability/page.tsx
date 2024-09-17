/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'
import {
  useAddUserAvailabilityMutation,
  useGetUserAvailabilityQuery,
  useUpdateUserAvailabilityMutation
} from '@/api/users/userAvailability.api'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { type CheckedState } from '@radix-ui/react-checkbox'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useState, useEffect, useCallback } from 'react'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Dashboard',
    link: '/'
  }
]

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

interface AvailabilityProps {
  day: string
  available: boolean
  startTime: string
  endTime: string
}

const Availability = () => {
  const { data: session } = useSession()
  const userID = session?.user?.id

  const { data: availabilityData } = useGetUserAvailabilityQuery(userID!)
  const [updateUserAvailability, { isLoading: isLoadingUpdate }] = useUpdateUserAvailabilityMutation()

  const [availability, setAvailability] = useState<AvailabilityProps[]>(
    days.map((day) => ({
      day: day.day,
      available: false,
      startTime: '09:00',
      endTime: '17:00'
    }))
  )

  const onHandleChange = (index: number, checked: CheckedState) => {
    const newAvailability = [...availability]
    newAvailability[index].available = !!checked
    setAvailability(newAvailability)
  }

  const onHandleTimeChange = (
    index: number,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    const newAvailability = [...availability]
    newAvailability[index][field] = value
    setAvailability(newAvailability)
    console.log(availability)
  }

  const [addUserAvailability, { isLoading }] = useAddUserAvailabilityMutation()
  const [availabilityID, setAvailabilityID] = useState()

  const handleChange = useCallback(async () => {
    const inputValues = {
      userID,
      availability
    }
    if (availabilityID) {
      await updateUserAvailability({
        ...inputValues,
        id: availabilityID
      })

      console.log({ ...inputValues, id: availabilityID }, 'gyu')
    } else {
      await addUserAvailability(inputValues)
    }
  }, [addUserAvailability, availability, availabilityID, updateUserAvailability, userID])

  useEffect(() => {
    if (availabilityData) {
      const copyData = availabilityData.availability.map((item: AvailabilityProps) => ({ ...item }))
      setAvailabilityID(availabilityData.id)

      setAvailability(copyData)
    }
  }, [availabilityData])

  console.log(availabilityData, 'availableDataset')

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-4">
        <div className="bg-white rounded-lg p-4">
          <p className="font-bold text-lg">Working Hours</p>
          <div className="bg-white rounded-lg flex space-x-4 ">
            <div className="flex flex-col space-y-4 w-1/2 border border-slate-200 rounded-lg p-4 ">
              {availability.map((item: any, index) => (
                <div
                  key={item.day}
                  className="flex space-x-4 items-center justify-between"
                >
                  <div className="flex space-x-2 items-center">
                    <Checkbox
                      checked={item.available}
                      onCheckedChange={(e: CheckedState) => {
                        onHandleChange(index, e)
                      }}
                    />
                    <label htmlFor="" className="text-slate-500">
                      {item.day}
                    </label>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <Input
                      type="time"
                      // defaultValue={'09:00'}
                      className="shadow-none p-2 "
                      onChange={(e) => {
                        onHandleTimeChange(index, 'startTime', e.target.value)
                      }}
                      value={item.startTime}
                    />
                    <div className="text-slate-500">-</div>
                    <Input
                      type="time"
                      className="shadow-none p-2"
                      onChange={(e) => {
                        onHandleTimeChange(index, 'endTime', e.target.value)
                      }}
                      value={item.endTime}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p>Timezone</p>
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </div>
          </div>

          {/*  */}
          <hr className="mt-4 mb-4 " />

          <Button
            className="mt-4"
            onClick={async () => {
              await handleChange()
            }}
          >
            {(isLoading || isLoadingUpdate) && <Loader2 className="mr-2 animate-spin" size={15} />}
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Availability
