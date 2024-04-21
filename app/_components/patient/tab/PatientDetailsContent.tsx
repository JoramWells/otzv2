import { useState } from 'react'
import PatientTab, { type CategoryListProps } from './PatientTab'
import AppointmentTab from '../appointmentTab/AppointmentTab'
import HomeVisitTab from '../../home-visit/HomevisitTab'
import LabTab from '../../lab/LabTab'
import TreatmentPlanTab from '../../treatement-plan/treatementPlanTab/TreatmentPlanTab'
import { type UserDataProps } from '../patientProfileCard/PatientProfileCard'
import CareGiverTab from '../appointmentTab/CareGiverTab'
import PharmacyTab from '../../pharmacy/PharmacyTab'
import Insights from '../insights/Insights'
import CaseManagerTab from '../appointmentTab/CaseManagerTab'
import { useSearchParams } from 'next/navigation'

interface DataProps {
  patientID: string
  listData: CategoryListProps[]
  userData: UserDataProps
}

export interface InputTabProps {
  id: number
  params?: string
}

const PatientDetailsContent = ({ listData, patientID }: DataProps) => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<InputTabProps>({
    id: 0,
    params: tab
  })

  return (
    <>
      {/*  */}
      {/* <PatientProfileCard patientID={patientID} userData={userData} /> */}

      {/* profile card */}
      <div className="flex flex-col space-y-4 items-start w-full">
        {/* body */}
        {/* <Suspense fallback={<Skeleton className="w-full h-14" />}>
          <div className="w-full flex space-x-4">
            <div
              className="items-center flex flex-grow-0 flex-shrink-0 space-x-2
            "
            >
              <Avatar
                name={`${userData?.firstName} ${userData?.middleName}`}
                size={"sm"}
              />
              <p className="font-bold">{userData?.firstName}</p>
            </div>
            <PatientTab data={listData} value={value} setValue={setValue} />
          </div>
        </Suspense> */}
        <PatientTab data={listData} value={value} setValue={setValue} />

        {/* tabs */}
        {/* appointments */}
        {tab === 'appointments' && <AppointmentTab patientID={patientID} />}

        {tab === 'care giver' && <CareGiverTab patientID={patientID} />}

        {/* home visit */}
        {tab === 'case manager' && <CaseManagerTab patientID={patientID} />}

        {tab === 'Home Visit'.toLowerCase() && (
          <HomeVisitTab patientID={patientID} />
        )}

        {tab === 'lab' && <LabTab patientID={patientID} />}

        {tab === 'pharmacy' && <PharmacyTab />}
        {tab === 'treatment plan' && <TreatmentPlanTab patientID={patientID} />}
        {tab === 'insights' && <Insights />}
      </div>
    </>
  )
}

export default PatientDetailsContent
