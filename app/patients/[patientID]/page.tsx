/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useCallback, useState } from 'react'

import { Clock, Pencil } from 'lucide-react'
import { Avatar, Button, Divider } from '@chakra-ui/react'
import Link from 'next/link'
import AppointmentTab from '@/app/_components/patient/appointmentTab/AppointmentTab'
import HomeVisitTab from '@/app/_components/home-visit/HomevisitTab'
import TreatmentPlanTab from '@/app/_components/treatement-plan/treatementPlanTab/TreatmentPlanTab'
import { useGetPatientQuery } from '@/api/patient/patients.api'
import LabTab from '@/app/_components/lab/LabTab'
import PatientProfileCard from '@/app/_components/patient/patientProfileCard/PatientProfileCard'
import EnrollmentTab from '@/app/_components/enrollments/EnrollmentTab'

const PatientDetails = ({ params }: any) => {
  const [value, setValue] = useState(1)

  const patientID = params.patientID

  const { data: userData } = useGetPatientQuery(patientID)
  console.log(userData, 'usd')

  return (
    <div
      className="flex flex-row
    gap-x-4 p-5
    "
    >
      <PatientProfileCard
        value={value}
        setValue={setValue}
        userData={userData}
      />
      {/* body */}
      {/* appointments */}
      {value === 1 && <AppointmentTab patientID={patientID} />}

      {value === 2 && <EnrollmentTab/>}

      {/* home visit */}
      {value === 3 && (
        <div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center space-x-2">
              <Clock size={18} className="text-slate-600" />
              <p className="text-lg font-semibold text-slate-700">
                Recent Home Visits
              </p>
            </div>
            <Button size={'sm'} colorScheme="green" variant={'outline'}>
              <Link href={`/home-visits/add-home-visit/${patientID}`}>NEW</Link>
            </Button>
          </div>
          <HomeVisitTab patientID={patientID} />
        </div>
      )}

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
  )
}

export default PatientDetails
