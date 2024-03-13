/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'

import { Clock } from 'lucide-react'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import AppointmentTab from '@/app/_components/patient/appointmentTab/AppointmentTab'
import HomeVisitTab from '@/app/_components/home-visit/HomevisitTab'

const steps = [
  { title: 'Personal Details', description: 'Personal Information' },
  { title: 'Contact/Location', description: 'Contact, Location, Occupation' },
  { title: 'ART Status', description: 'Current Regimen' }
]

const categoryList = [
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
    label: 'Medical History'
  },
  {
    id: 4,
    label: 'Treatment Plan'
  }
]

const PatientDetails = ({ params }: any) => {
  const [value, setValue] = useState(1)
  const patientID = params.patientID
  return (
    <div className="pt-14 ml-64 p-3">
      <p>Patient Details</p>
      <div className="flex flex-row space-x-4 mt-4 mb-4">
        {categoryList.map((item) => (
          <Button
            key={item.id}
            rounded={'0'}
            size={'sm'}
            borderBottom={'2px'}
            borderBottomColor={`${value === item.id ? 'teal' : 'white'}`}
            color={`${value === item.id && 'teal'}`}
            bgColor={'white'}
            // shadow={`${value === item.id && 'md'}`}
            _hover={
              {
                // bgColor: `${value === item.id && 'black'}`,
                // color: `${value === item.id && 'white'}`
              }
            }
            onClick={() => {
              setValue(item.id)
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {/* body */}
      {/* appointments */}
      {value === 1 && (
        <div>
          <div>
            <div className="flex flex-row items-center justify-between">
              <p className="mb-2 text-lg font-semibold text-slate-700">
                Recent Appointments
              </p>

              <Button size={'sm'} colorScheme="green" variant={'outline'}>
                <Link href={`/appointments/add-appointment/${patientID}`}>
                  NEW
                </Link>
              </Button>
            </div>
          </div>
          <ol className="flex">
            <li>grid view</li>
            <li>table view</li>
            <li>calendar view</li>
          </ol>
          <AppointmentTab />
        </div>
      )}

      {/* home visit */}
      {value === 2 && (
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

      {value === 3 && (
        <div>
          Requests
          <ul>
            <li>Lab</li>
            <li>Pharmacy</li>
            <li>Viral Load</li>
            <li>Vital Signs</li>
          </ul>
        </div>
      )}

      {value === 4 && (
        <div>
          <p>Treatment Plan</p>
          <div>
            <Button size={'sm'} colorScheme="green" variant={'outline'}>
              <Link href={`/treatment-plan/add-treatment-plan/${patientID}`}>
                NEW
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientDetails
