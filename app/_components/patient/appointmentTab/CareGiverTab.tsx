/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useGetCaregiverQuery } from '@/api/caregiver/caregiver.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { calculateAge } from '@/utils/calculateAge'
import { Avatar, Tag } from '@chakra-ui/react'
import { Check, Copy, Dot } from 'lucide-react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SelectActive = () => (
  <Select>
    <SelectTrigger className="w-[100px]">
      <SelectValue placeholder="Type" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Select Types</SelectLabel>
        <SelectItem value="apple">Active</SelectItem>
        <SelectItem value="banana">Inactive</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
)

interface DataProps {
  patientID: string
}

const CareGiverTab = ({ patientID }: DataProps) => {
  const router = useRouter()
  const { data } = useGetCaregiverQuery(patientID)
  const [delay, setDelay] = useState<boolean>(false)
  const handleCheck = async (text: string) => {
    setDelay(true)
    setTimeout(() => {
      setDelay(false)
    }, 1500)
    await navigator.clipboard.writeText(text)
  }
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-between mb-4 items-center w-3/4">
        <p className="font-bold text-lg">Cares Givers</p>

        <Button
          className="transition ease-in-out bg-teal-600 hover:bg-teal-700
      shadow-none transform font-bold hover:scale-105
      "
          // size={'sm'}
          onClick={() => router.push(`/caregiver/add-care-giver/${patientID}`)}
        >
          New
        </Button>
      </div>

      {/* ceck if ter is cariver */}
      {data?.length === 0 && (
        <p className="text-xl font-bold text-slate-500">
          This Patient has No Caregiver
        </p>
      )}

      <div className="w-3/4 mb-2 flex flex-row items-center justify-between">
        <div className="w-1/2">
          <Input placeholder="Search..." />
        </div>

        <SelectActive />
      </div>

      {/* iterate over te creivers */}
      {data?.map((item: any) => (
        <div
          key={item.id}
          className="border border-slate-200 p-4
                rounded-lg w-3/4"
        >
          <div className="flex flex-row space-x-4">
            <Avatar name={item?.firstName} size={'sm'} />
            <div className="flex flex-col">
              <div className="flex flex-row items-center space-x-4">
                <p className="text-lg font-bold">
                  {' '}
                  {item?.firstName} {item?.middleName}{' '}
                </p>
                <Tag
                  variant={'outline'}
                  rounded={'full'}
                  size={'sm'}
                  colorScheme="green"
                >
                  ACTIVE
                </Tag>
              </div>

              <p className="text-sm text-slate-500">
                {item?.gender === '2' ? 'FEMALE' : 'MALE'}
              </p>
              <div
                className="flex flex-row space-x-2
              text-slate-500 text-sm
              "
              >
                {moment(item?.dob).format('ll')} <Dot />{' '}
                {calculateAge(item?.dob)} yrs{' '}
              </div>

              <div
                onClick={async () => await handleCheck(item?.phoneNo)}
                className="flex flex-row space-x-2"
              >
                <p className="text-slate-500 text-sm font-bold">
                  {item?.phoneNo}
                </p>

                {!delay
                  ? (
                  <Copy
                    size={18}
                    className="text-slate-500 hover:cursor-pointer"
                  />
                    )
                  : (
                  <Check size={18} className="text-teal-600" />
                    )}
              </div>
            </div>
          </div>
          {/* <div>
            <MapPin size={20} />
          </div> */}
        </div>
      ))}
    </div>
  )
}

export default CareGiverTab
