/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useMemo, useState } from 'react'

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
import CustomSelect from '@/app/_components/forms/CustomSelect'
import CustomCheckbox from '@/app/_components/forms/CustomCheckbox'
import { useRouter } from 'next/navigation'
import CustomTab from '@/app/_components/tab/CustomTab'

const PatientDetails = ({ params }: any) => {
  const [value, setValue] = useState(1)

  const patientID = params.patientID

  const { data: userData } = useGetPatientQuery(patientID)
  console.log(userData, 'usd')
  const router = useRouter()

  const categoryList = useMemo(
    () => [
      {
        id: 1,
        label: 'Appointments'
      },
      {
        id: 2,
        label: 'Home Visit'
      },
      {
        id: 3,
        label: 'Medical File'
      },
      {
        id: 4,
        label: 'Treatment Plan'
      }
    ],
    []
  )

  return (
    <div className="flex flex-col space-x-4 p-3 mt-14">
      {/* tab naviation */}
      <CustomTab
        categoryList={categoryList}
        setValue={setValue}
        value={value}
      />
      <div className="flex flex-row space-x-4">
        <PatientProfileCard
          value={value}
          setValue={setValue}
          userData={userData}
          patientID={patientID}
        />
        {/* body */}
        <div className="w-full">
          {/* appointments */}
          {value === 1 && <AppointmentTab patientID={patientID} />}

          {value === 2 && <HomeVisitTab patientID={patientID} />}

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
    </div>
  )
}

export default PatientDetails
