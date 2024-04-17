import { Suspense, useState } from 'react'
import PatientTab, { type CategoryListProps } from './PatientTab'
import AppointmentTab from '../appointmentTab/AppointmentTab'
import HomeVisitTab from '../../home-visit/HomevisitTab'
import { Button } from '@/components/ui/button'
import LabTab from '../../lab/LabTab'
import TreatmentPlanTab from '../../treatement-plan/treatementPlanTab/TreatmentPlanTab'
import { type UserDataProps } from '../patientProfileCard/PatientProfileCard'
import CareGiverTab from '../appointmentTab/CareGiverTab'
import { Skeleton } from '@/components/ui/skeleton'
import PharmacyTab from '../../pharmacy/PharmacyTab'
import { Avatar } from '@chakra-ui/react'

interface DataProps {
  patientID: string
  listData: CategoryListProps[]
  userData: UserDataProps
}

// interface UserDataProps {
//   id: string
// }

const PatientDetailsContent = ({ listData, patientID, userData }: DataProps) => {
  const [value, setValue] = useState<number>(1)

  return (
    <>
      {/*  */}
      {/* <PatientProfileCard patientID={patientID} userData={userData} /> */}

      {/* profile card */}
      <div className="flex flex-col space-y-4 items-start w-full">
        {/* body */}
        <Suspense fallback={<Skeleton className="w-full h-14" />}>
          <div className="w-full flex space-x-4">
            <div
            className='items-center flex flex-grow-0 flex-shrink-0 space-x-2
            '
            >
              <Avatar
                name={`${userData?.firstName} ${userData?.middleName}`}
                size={'sm'}
              />
              <p
              className='font-bold'
              >
                {userData?.firstName}
              </p>
            </div>
            <PatientTab data={listData} value={value} setValue={setValue} />
          </div>
        </Suspense>
        {/* tabs */}
        {/* appointments */}
        {value === 1 && <AppointmentTab patientID={patientID} />}

        {value === 2 && <CareGiverTab patientID={patientID} />}

        {/* home visit */}
        {value === 3 && <HomeVisitTab patientID={patientID} />}

        {value === 4 && (
          <div>
            Requests
            <ol>
              <li>Lab</li>
              <li>Pharmacy</li>
              <li>Viral Load</li>
              <li>Vital Signs</li>
            </ol>
            <Button>Add prescription</Button>
          </div>
        )}

        {value === 5 && <LabTab patientID={patientID} />}

        {value === 6 && <PharmacyTab />}
        {value === 7 && <TreatmentPlanTab patientID={patientID} />}
      </div>
    </>
  )
}

export default PatientDetailsContent
