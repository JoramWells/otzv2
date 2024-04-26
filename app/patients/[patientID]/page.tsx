/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import HomeVisitTab from '@/app/_components/home-visit/HomevisitTab'
import LabTab from '@/app/_components/lab/LabTab'
import AppointmentTab from '@/app/_components/patient/appointmentTab/AppointmentTab'
import CareGiverTab from '@/app/_components/patient/appointmentTab/CareGiverTab'
import CaseManagerTab from '@/app/_components/patient/appointmentTab/CaseManagerTab'
import Insights from '@/app/_components/patient/insights/Insights'
import Messages from '@/app/_components/patient/messages/Messages'
import PatientProfile from '@/app/_components/patient/patientProfileCard/PatientProfile'
import PatientTab from '@/app/_components/patient/tab/PatientTab'
import PharmacyTab from '@/app/_components/pharmacy/PharmacyTab'
import TreatmentPlanTab from '@/app/_components/treatement-plan/treatementPlanTab/TreatmentPlanTab'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const categoryList = [
  {
    id: 1,
    label: "Appointments",
  },
  {
    id: 2,
    label: "Care Giver",
  },
  {
    id: 3,
    label: "Case Manager",
  },
  {
    id: 4,
    label: "Home Visit",
  },
  {
    id: 5,
    label: "Lab",
  },
  {
    id: 6,
    label: "Pharmacy",
  },
  {
    id: 7,
    label: "Treatment Plan",
  },
  {
    id: 8,
    label: "Medical File",
  },
  {
    id: 9,
    label: "Messages",
  },
  {
    id: 10,
    label: "Insights",
  },
  {
    id: 11,
    label: "Settings",
  },
];

export interface InputTabProps {
  id: number
  params?: string
}

const PatientDetails = ({ params }: any) => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<string | null>(tab)
  const patientID = params.patientID

  return (
    <div className="flex flex-row space-x-4 mt-16 pt-2 items-start">
      <div className="flex flex-col space-y-4 items-start w-full">
        {/* body */}

        <PatientTab data={categoryList} value={value} setValue={setValue} />

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
        {tab === 'settings' && <PatientProfile
        patientID={patientID}
        />}

        {tab === 'messages' && <Messages
        patientID={patientID}
        /> }
      </div>
    </div>
  )
}

export default PatientDetails
