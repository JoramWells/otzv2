import Avatar from '@/components/Avatar'
import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense } from 'react'

interface PatientProfileInputProps {
  isLoading: boolean
  firstName?: string
  middleName?: string
  dob?: Date | string
  phoneNo?: string
  sex?: string
}

const PatientProfileHomeVisit = ({ isLoading, firstName, middleName, dob, sex, phoneNo }: PatientProfileInputProps) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-lg p-2">
      {isLoading
        ? (
        <Skeleton className="w-full" />
          )
        : (
        <Suspense fallback={<div>loading..</div>}>
          <div className="flex flex-row items-center  w-full rounded-lg space-x-4">
            <Avatar
              name={`${firstName} ${middleName}`}
            />
            <p className="font-semibold capitalize text-[14px]">
              {firstName} {middleName}
            </p>
               </div>
        </Suspense>
          )}
    </div>
  )
}

export default PatientProfileHomeVisit
