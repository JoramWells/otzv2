/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'

import { useAddPatientMutation } from '@/api/patient/patients.api'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

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
            <Button size={'sm'} colorScheme="green" variant={'outline'}>
              New
            </Button>
          </div>
          <ol>
            <li>grid view</li>
            <li>table view</li>
            <li>calendar view</li>
          </ol>
        </div>
      )}

      {/* home visit */}
      {value === 2 && (
        <div>
          <p>Home Visit </p>
          <div>
            <Button size={'sm'} colorScheme="green" variant={'outline'}>
              <Link href={`/home-visits/add-home-visit/${patientID}`}>NEW</Link>
            </Button>
          </div>
        </div>
      )}

      {value === 3 && (
        <div>
          Requests
          <ul>
            <li>Lab</li>
            <li>Pharmacy</li>
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
