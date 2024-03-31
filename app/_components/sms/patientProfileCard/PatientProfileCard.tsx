/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useGetViralLoadTestQuery } from '@/api/enrollment/viralLoadTests.api'
import { Button } from '@/components/ui/button'
import { Avatar, Divider, Tag } from '@chakra-ui/react'
import { MessageSquareText, Pencil } from 'lucide-react'
import moment, { type MomentInput } from 'moment'

export interface PatientProfileCardProps {
  userData: UserDataProps
  patientID: string
}

export interface UserDataProps {
  id: string
  firstName?: string
  middleName?: string
  dob?: string
  sex?: string
  dateOfCurrentVL: MomentInput
  dateOfNextVL: MomentInput
}

const PatientProfileCard = ({ userData, patientID }: PatientProfileCardProps) => {
  const { data: vlData } = useGetViralLoadTestQuery(patientID)

  return (
    <div
      className="flex flex-col justify-center w-full md:w-full lg:w-[35%] pr-2 border border-slate-200 rounded-lg p-2"
      // style={{
      //   height: '455px'
      // }}
    >
      <div
        className="flex flex-col gap-x-4
        items-center
        "
      >
        <div className="bg-white p-[3px] rounded-full border-2 border-red-500">
          <Avatar
            // size={'sm'}
            name={`${userData?.firstName} ${userData?.middleName}`}
          />
        </div>
        <p
          className="capitalize font-bold
        text-lg
        "
        >{`${userData?.firstName} ${userData?.middleName}`}</p>

        <p className="text-slate-500 text-sm">
          {moment().diff(moment(userData?.dob), 'years')} yrs
        </p>
        <p className="text-slate-500 text-sm">Gender: {userData?.sex}</p>
        <div className="flex flex-row items-center gap-x-2 text-blue-500 font-bold text-sm">
          <Pencil size={15} /> <p>Edit Profile</p>
        </div>
      </div>

      <Divider className="mt-4" />

      {/* list items */}
      <div className="flex flex-col mt-2 w-full p-2">
        <h1 className="font-bold">CALHIV</h1>
        <div className="flex flex-row space-x-2 mt-2">
          {['OTZ', 'OVC', 'PMTCT', 'PAMA'].map((item, idx) => (
            <Tag
              key={idx}
              rounded={'full'}
              variant={'outline'}
              size={'sm'}
              colorScheme="green"
            >
              {item}
            </Tag>
          ))}
        </div>

        <div
          className="mt-4 flex flex-col space-y-2 bg-slate-50
        p-3 border border-slate-200 rounded-lg
        "
        >
          <h1 className="font-bold ">VL Status</h1>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Results</p>{' '}
            <Tag variant={'outline'} rounded={'full'} size={'sm'}>
              {vlData?.vlResults}
            </Tag>
          </div>

          {/*  */}
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Date Taken</p>{' '}
            <p className="text-sm">
              {moment(vlData?.dateOfCurrentVL).format('ll')}
            </p>
          </div>

          {/*  */}
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Next VL Test</p>{' '}
            <p className="text-sm">
              {moment(vlData?.dateOfNextVL).format('ll')}
            </p>
          </div>
        </div>

        <div className="mt-4 w-full flex flex-col space-y-2">
          <Button
            className="w-full bg-slate-50 text-slate-600 font-bold shadow-none border border-slate-200 hover:bg-slate-100"

            // variant={'link'}
          >
            <MessageSquareText size={20}
            className='mr-2'
            />
            SMS
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PatientProfileCard
