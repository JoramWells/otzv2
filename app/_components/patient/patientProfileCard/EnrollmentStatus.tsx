/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useGetOTZPatientEnrollmentQuery } from '@/api/enrollment/otzEnrollment.api'
import { type UserDataProps } from './PatientProfileCard'
import { Badge } from '@/components/ui/badge'
import { calculateAge } from '@/utils/calculateAge'
import Link from 'next/link'
import { Info } from 'lucide-react'

// 0-9 PAMA
// 0-9 PAED
// 10-19 OTZ
// OVC
//  - careers
// age, gender, location

const EnrollmentStatus = ({ id, sex, dob }: UserDataProps) => {
  const { data } = useGetOTZPatientEnrollmentQuery(id)
  return (
    <div className="">
      <h1 className="font-bold text-lg">CALHIV</h1>

      {sex === 'F' && calculateAge(dob) > 14 && (
        <div className="mt-2">
          {!data && (
            <div
            className='flex flex-row space-x-2'
            >
              <Info
              className='text-slate-500'
              size={18}
              />
              <p className="text-slate-500 text-sm">
                Patient Ellible for te followin Enrollment
              </p>
            </div>
          )}

          <div className="flex flex-row space-x-2 items-center mt-1">
            <Link
              href={`/patients/enrollment/enroll-otz/${id}`}
              className={`${data && 'text-green-600 bg-green-100'} 
            rounded-full text-sm font-bold bg-slate-100  p-1 pl-2 pr-2
            `}
            >
              OTZ
            </Link>
            <Link href={`/patients/enrollment/enroll-pama/${id}`}>PAMA</Link>
          </div>
        </div>
      )}

      {/*  */}
      {calculateAge(dob) < 9 && (
        <div className="flex flex-row space-x-2">
          <Badge variant={'secondary'} className="shadow-none rounded-full">
            OTZ
          </Badge>
          <Badge variant={'secondary'} className="shadow-none rounded-full">
            PAMA
          </Badge>
        </div>
      )}
    </div>
  )
}

export default EnrollmentStatus
