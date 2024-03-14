/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useCallback, useState } from 'react'

import { Clock } from 'lucide-react'
import { Avatar, Button } from '@chakra-ui/react'
import Link from 'next/link'
import AppointmentTab from '@/app/_components/patient/appointmentTab/AppointmentTab'
import HomeVisitTab from '@/app/_components/home-visit/HomevisitTab'
import TreatmentPlanTab from '@/app/_components/treatement-plan/treatementPlanTab/TreatmentPlanTab'
import SideMenuBar from '@/app/_components/treatement-plan/SideMenuBar'
import { useGetPatientQuery } from '@/api/patient/patients.api'
import moment from 'moment'
import LabTab from '@/app/_components/lab/LabTab'

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
    label: 'Lab'
  },
  {
    id: 5,
    label: 'Treatment Plan'
  }
]

const PatientDetails = ({ params }: any) => {
  const [value, setValue] = useState(1)

  const patientID = params.patientID

  const { data: userData } = useGetPatientQuery(patientID)
  console.log(userData, 'usd')

  return (
    <div
      className="pt-16 ml-64 p-3 flex flex-row
    gap-x-4
    "
    >
      <div
        className="border p-2 rounded-lg shadow-sm
        flex flex-col justify-center
        "
        style={{
          height: '400px'
        }}
      >
        <div
          className="flex flex-col gap-x-4
        items-center
        "
        >
          <Avatar name={`${userData?.firstName} ${userData?.middleName}`} />
          <p className="capitalize font-bold">{`${userData?.firstName} ${userData?.middleName}`}</p>

          <p className="text-slate-500 text-sm">
            {moment().diff(moment(new Date(userData?.dob)), 'years')} yrs
          </p>
          <p className="text-slate-500 text-sm">Gender: {userData?.gender}</p>
        </div>

        {/* list items */}
        <div
          className="flex flex-col mt-4 w-72
        "
        >
          {categoryList.map((item) => (
            <Button
              key={item.id}
              rounded={'md'}
              h={10}
              size={'sm'}
              w={'full'}
              // borderBottom={'2px'}
              fontWeight={'normal'}
              bgColor={`${value === item.id ? 'gray.50' : 'transparent'}`}
              color={`${value === item.id ? 'teal' : 'gray.500'}`}
              // bgColor={'white'}
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
      </div>

      {/* body */}
      {/* appointments */}
      {value === 1 && (

          <AppointmentTab
          patientID={patientID}
          />
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

      {value === 4 && (<LabTab />)}

      {value === 5 && (
            <TreatmentPlanTab
            patientID={patientID}
            />
      )}
    </div>
  )
}

export default PatientDetails
