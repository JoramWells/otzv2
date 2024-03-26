/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'

import AppointmentTab from '@/app/_components/patient/appointmentTab/AppointmentTab'
import HomeVisitTab from '@/app/_components/home-visit/HomevisitTab'
import TreatmentPlanTab from '@/app/_components/treatement-plan/treatementPlanTab/TreatmentPlanTab'
import { useGetPatientQuery } from '@/api/patient/patients.api'
import LabTab from '@/app/_components/lab/LabTab'
import PatientProfileCard from '@/app/_components/patient/patientProfileCard/PatientProfileCard'
import EnrollmentTab from '@/app/_components/enrollments/EnrollmentTab'
import { Button } from '@/components/ui/button'
import { CaseManagerDialog } from '@/app/_components/patient/casemanager/CaseManagerDialog'
import { MessageSquareText } from 'lucide-react'

const PatientDetails = ({ params }: any) => {
  const [value, setValue] = useState(1)

  const patientID = params.patientID

  const { data: userData } = useGetPatientQuery(patientID)
  console.log(userData, 'usd')

  return (
    <div className="flex flex-row space-x-4 p-3">
      <PatientProfileCard
        value={value}
        setValue={setValue}
        userData={userData}
      />
      {/* body */}
      <div className="w-full">
        <div
          className="mb-4
        "
        >
          <div className="flex flex-row space-x-4 justify-between">
            <p>Patient Profile</p>
            <div className="flex flex-row space-x-4">
              <CaseManagerDialog />
              <Button>Care Giver</Button>
              <Button
                className="bg-slate-100 text-slate-600
            shadow-none font-bold hover:bg-slate-200
            "
              >
                <MessageSquareText size={18} className="mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>

        {/* appointments */}
        {value === 1 && <AppointmentTab patientID={patientID} />}

        {value === 2 && <EnrollmentTab />}

        {/* home visit */}
        {value === 3 && <HomeVisitTab patientID={patientID} />}

        {value === 4 && (
          <div>
            Requests
            <ul>
              <li>Lab</li>
              <li>Pharmacy</li>
              <li>Viral Load</li>
              <li>Vital Signs</li>
            </ul>
            <Button>Add prescription</Button>
          </div>
        )}

        {value === 5 && <LabTab patientID={patientID} />}

        {value === 6 && <TreatmentPlanTab patientID={patientID} />}
      </div>
    </div>
  )
}

export default PatientDetails
