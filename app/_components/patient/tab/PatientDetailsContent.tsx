import { Suspense, useState } from 'react'
import PatientTab, { type CategoryListProps } from './PatientTab'
import AppointmentTab from '../appointmentTab/AppointmentTab'
import HomeVisitTab from '../../home-visit/HomevisitTab'
import { Button } from '@/components/ui/button'
import LabTab from '../../lab/LabTab'
import TreatmentPlanTab from '../../treatement-plan/treatementPlanTab/TreatmentPlanTab'
import PatientProfileCard, { type UserDataProps } from '../patientProfileCard/PatientProfileCard'
import CareGiverTab from '../appointmentTab/CareGiverTab'
import { Skeleton } from '@/components/ui/skeleton'

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
      <Suspense fallback={<Skeleton className="w-full h-12" />}>
        <PatientTab data={listData} value={value} setValue={setValue} />
      </Suspense>

      {/*  */}
      {/* profile card */}
      <div className="flex flex-row space-x-4 items-start">
        {/* body */}
        <PatientProfileCard patientID={patientID} userData={userData} />

        {/* tabs */}
        <div className="w-full">
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

          {value === 6 && <TreatmentPlanTab patientID={patientID} />}
        </div>
      </div>
    </>
  )
}

export default PatientDetailsContent
