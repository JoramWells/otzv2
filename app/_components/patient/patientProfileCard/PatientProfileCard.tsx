/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Avatar, Divider } from '@chakra-ui/react'
import { Pencil, Settings } from 'lucide-react'
import moment, { type MomentInput } from 'moment'
// import { CustomSMSSheet } from '../../sms/CustomSMSSheet'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import EnrollmentStatus from './EnrollmentStatus'
import { ViralLoadStatus } from './ViralLoadStatus'

export interface PatientProfileCardProps {
  userData: UserDataProps
  patientID: string
}

export interface UserDataProps {
  id?: string
  firstName?: string
  middleName?: string
  dob?: string
  sex?: string
  dateOfCurrentVL?: MomentInput
  dateOfNextVL?: MomentInput
}

const PatientProfileCard = ({ userData, patientID }: PatientProfileCardProps) => {
  const router = useRouter()

  return (
    <Suspense
      fallback={
        <Skeleton className="w-full md:w-full lg:w-[30%] flex-shrink-0 flex-grow-0" />
      }
    >
      <div
        className="flex flex-col justify-center w-full md:w-full lg:w-[30%] rounded-lg mt-12"
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
          <EnrollmentStatus
            sex={userData?.sex}
            dob={userData?.dob}
            id={patientID}
          />
          {/* VL status */}

          <ViralLoadStatus patientID={patientID} />
          <div className="mt-4 w-full flex flex-col space-y-2">
            <Button
              onClick={() => router.push(`/patients/settings/${patientID}`)}
            >
              <Settings className="mr-2" size={18} />
              Settings
            </Button>

            {/* <CustomSMSSheet/> */}
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default PatientProfileCard
