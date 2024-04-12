/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useGetOTZPatientEnrollmentQuery } from '@/api/enrollment/otzEnrollment.api'
import { type UserDataProps } from './PatientProfileCard'
import { Badge } from '@/components/ui/badge'
import { calculateAge } from '@/utils/calculateAge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// 0-9 PAMA
// 0-9 PAED
// 10-19 OTZ
// OVC
//  - careers
// age, gender, location

const EnrollmentStatus = ({ id, sex, dob }: UserDataProps) => {
  const router = useRouter()

  const { data } = useGetOTZPatientEnrollmentQuery(id)
  return (
    <div>
      <h1 className="font-bold">CALHIV</h1>
      <Link
        href={`/patients/enrollment/enroll-otz/${id}`}
        className={`${data && 'text-green-600 bg-green-100 p-2'} 
            rounded-full text-sm font-bold
            `}
      >
        OTZ
      </Link>
      <Link href={`/patients/enrollment/enroll-pama/${id}`}>PAMA</Link>
      {sex === 'F' && calculateAge(dob) > 14 && (
        <div>
          <Badge
            variant={'secondary'}
            className="shadow-none rounded-full hover:cursor-pointer"
            onClick={() => {
              router.push(`/patients/enrollment/enroll-otz/${id} `)
            }}
          >
            <Link href={`/patients/enrollment/enroll-otz/${id}`}>OTZ</Link>
          </Badge>
          <Badge variant={'secondary'} className="shadow-none rounded-full">
            PMTCT
          </Badge>
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
