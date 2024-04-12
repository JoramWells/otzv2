/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Avatar } from '@chakra-ui/react'
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
        <Skeleton className="w-full md:w-full lg:w-[35%]
        flex-shrink-0 flex-grow-0" />
      }
    >
      <div
        className="flex flex-col justify-center w-full
        space-y-6 border border-slate-200 p-4
        md:w-full lg:w-[35%] rounded-lg mt-8"
        // style={{
        //   height: '455px'
        // }}
      >
        <div
          className="flex flex-col gap-x-4
        items-center
        "
        >
            <Avatar
              // size={'l'}
              name={`${userData?.firstName} ${userData?.middleName}`}
            />
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

        <div className="border-b border-slate-200" />

        {/* list items */}
          <EnrollmentStatus
            sex={userData?.sex}
            dob={userData?.dob}
            id={patientID}
          />
          {/* VL status */}

          <div className="border-b border-slate-200" />

          <ViralLoadStatus patientID={patientID} />

          <div className="border-b border-slate-200" />

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
    </Suspense>
  )
}

export default PatientProfileCard
