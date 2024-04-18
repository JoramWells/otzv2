/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { Button } from '@/components/ui/button'

import { calculateAge } from '@/utils/calculateAge'
import { Avatar, Tag } from '@chakra-ui/react'
import { Check, Copy, Dot, Loader2 } from 'lucide-react'
import moment from 'moment'
import { useCallback, useState } from 'react'
import CustomInput from '../../forms/CustomInput'
import CustomSelect from '../../forms/CustomSelect'
import { useAddCaseManagerMutation, useGetCaseManagerQuery } from '@/api/caregiver/casemanager.api'
import { CaseManagerDialog } from '../casemanager/CaseManagerDialog'
import CustomCheckbox from '../../forms/CustomCheckbox'
import { useGetAllUsersQuery } from '@/api/users/users.api'

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

interface CaseManagerCardProps {
  item: {
    id: string
    firstName: string
    middleName: string
    gender: string
    dob: string
    phoneNo: string
  }
}

const CaseManagerCard = ({ item }: CaseManagerCardProps) => {
  const [delay, setDelay] = useState<boolean>(false)
  const handleCheck = async (text: string) => {
    setDelay(true)
    setTimeout(() => {
      setDelay(false)
    }, 1500)
    await navigator.clipboard.writeText(text)
  }
  return (
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
            <p className="text-slate-500 text-sm font-bold">{item?.phoneNo}</p>

            {!delay
              ? (
              <Copy size={18} className="text-slate-500 hover:cursor-pointer" />
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
  )
}

interface DataProps {
  patientID: string
}

const CaseManager = ({ patientID }: DataProps) => {
  const [userID, setUser] = useState('')
  const [isNotifications, setNotifications] = useState<boolean>(false)

  const [addCaseManager, { isLoading }] = useAddCaseManagerMutation()

  const inputValues = {
    userID,
    patientID,
    isNotifications

  }

  const { data } = useGetAllUsersQuery()
  const userOptions = useCallback(() => {
    return data?.map((item: any) => ({
      id: item.id, label: `${item.firstName} ${item.middleName} `
    }))
  }, [data])

  return (
    <div
      className="flex flex-col space-y-4
      "
    >
      <CustomSelect
        label="Select Case Manager"
        data={userOptions()}
        value={userID}
        onChange={setUser}
      />
      <CustomCheckbox
        label="Allow Notifications"
        description="Notify case manager wit every action"
        value={isNotifications}
        onChange={setNotifications}
      />

      <Button
        size={'lg'}
        className="shadow-none bg-teal-600 hover:bg-teal-700"
        onClick={() => addCaseManager(inputValues)}
      >
        {isLoading && <Loader2 className='mr-2 animate-spin' size={18} />}
        Add Case Manager
      </Button>
    </div>
  )
}

const CaseManagerTab = ({ patientID }: DataProps) => {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const { data } = useGetCaseManagerQuery(patientID)

  return (
    <div className="w-full flex flex-col justify-center align-center items-center">
      <div className="flex flex-row justify-between mb-4 items-center w-1/2">
        <p className="font-bold text-lg">Cares Givers</p>

<CaseManagerDialog label='NEW' >
  <CaseManager patientID={patientID} />
</CaseManagerDialog>
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
            This Patient has No Case Manager
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
          <CaseManagerCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default CaseManagerTab
