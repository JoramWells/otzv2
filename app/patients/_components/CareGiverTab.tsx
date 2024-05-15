/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useGetCaregiverQuery } from '@/api/caregiver/caregiver.api'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CustomInput from '../../../components/forms/CustomInput'
import CustomSelect from '../../../components/forms/CustomSelect'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { caregiverColumns } from './columns'

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
    <div className="flex flex-row items-center mb-4 space-x-4 justify-between">
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

interface DataProps {
  patientID: string
}

const CareGiverTab = ({ patientID }: DataProps) => {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const router = useRouter()
  const { data } = useGetCaregiverQuery(patientID)
  console.log(data, 'drt')

  return (
    <div className="w-full flex flex-col justify-center align-center items-center">
      <div className="flex flex-row justify-between mb-4 mt-4 p-2 items-center w-full bg-white">
        <p className="font-bold text-xl">Cares Givers</p>

        <Button
          className="transition ease-in-out bg-teal-600 hover:bg-teal-700
      shadow-none transform font-bold hover:scale-105
      "
          // size={'sm'}
          onClick={() => router.push(`/users/add-care-giver/${patientID}`)}
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
        <>
          <div className="w-1/2 space-y-4 flex flex-col bg-white rounded-lg p-4">
            <AppointmentHeader
              query={query}
              setQuery={setQuery}
              status={status}
              setStatus={setStatus}
            />
            <CustomTable
              data={data || []}
              columns={caregiverColumns}
              isSearch={false}
            />
          </div>
        </>
          )}
    </div>
  )
}

export default CareGiverTab
