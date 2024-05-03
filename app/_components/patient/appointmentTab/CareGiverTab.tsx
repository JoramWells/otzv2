/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useGetCaregiverQuery } from '@/api/caregiver/caregiver.api'
import { Button } from '@/components/ui/button'

import { calculateAge } from '@/utils/calculateAge'
import { Avatar, Tag } from '@chakra-ui/react'
import { Check, Copy, Dot } from 'lucide-react'
import moment from 'moment'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import CustomInput from '../../../../components/forms/CustomInput'
import CustomSelect from '../../../../components/forms/CustomSelect'
import { Skeleton } from '@/components/ui/skeleton'

interface AppointmentHeaderProps {
  query: string
  setQuery: (val: string) => void
  status: string
  setStatus: (val: string) => void
}

const AppointmentHeader = ({
  query,
  setQuery,
  status,
  setStatus

}: AppointmentHeaderProps) => {
  return (
    <div className="flex flex-row items-center w-1/2 mb-4 space-x-4 justify-between">
      <div className="w-1/4">
        <CustomInput placeholder="Search" value={query} onChange={setQuery} />
      </div>
      <div className="flex flex-row items-center space-x-2">
        <CustomSelect
          placeholder="Completed"
          value={status}
          onChange={setStatus}
          data={[
            { id: 'Completed', label: 'Completed' },
            { id: 'Pending', label: 'Pending' },
            { id: 'Upcoming', label: 'Upcoming' }
          ]}
        />
      </div>
    </div>
  )
}

interface CareGiverCardProps {
  item: {
    id: string
    firstName: string
    middleName: string
    gender: string
    dob: string
    phoneNo: string

  }

}

const CareGiverCard = ({ item }: CareGiverCardProps) => {
  const [delay, setDelay] = useState<boolean>(false)
  const handleCheck = async (text: string) => {
    setDelay(true)
    setTimeout(() => {
      setDelay(false)
    }, 1500)
    await navigator.clipboard.writeText(text)
  }

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams).get('tab')

  return (
    <Suspense fallback={<Skeleton className="w-full h-[500px]" />}
    key={params}
    >
      <div
        key={item.id}
        className="border border-slate-200 p-4
                rounded-lg w-full"
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
              {moment(item?.dob).format('ll')} <Dot /> {calculateAge(item?.dob)}{' '}
              yrs{' '}
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
    </Suspense>
  )
}

interface DataProps {
  patientID: string
}

const CareGiverTab = ({ patientID }: DataProps) => {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const router = useRouter()
  const { data } = useGetCaregiverQuery(patientID)

  return (
    <div className="w-full flex flex-col justify-center align-center items-center">
      <div className="flex flex-row justify-between mb-4 items-center w-1/2">
        <p className="font-bold text-lg">Cares Givers</p>

        <Button
          className="transition ease-in-out bg-teal-600 hover:bg-teal-700
      shadow-none transform font-bold hover:scale-105
      "
          // size={'sm'}
          onClick={() => router.push(`/patients/add-care-giver/${patientID}`)}
        >
          New
        </Button>
      </div>

      {/* ceck if ter is cariver */}
      {data?.length === 0
        ? (
        <div
          className="border border-slate-200
        rounded-lg p-4 w-1/2 bg-slate-50
        "
        >
          <p className="text-lg font-semibold ">
            This Patient has No Caregiver
          </p>
          <p className="text-slate-500 text-sm">
            Environment variables allow you to change site behavior across
            different deploy contexts and scopes. For example, use variables to
            set different configuration options for builds or to store secret
            API keys for use in your functions.
          </p>
        </div>
          )
        : (
        <AppointmentHeader

        query={query}
        setQuery={setQuery}
        status={status}
        setStatus={setStatus}
        />
          )}

      {/* iterate over te creivers */}
      <div className="w-1/2 space-y-4 flex flex-col">
        {data?.map((item: any) => (
          <CareGiverCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default CareGiverTab
