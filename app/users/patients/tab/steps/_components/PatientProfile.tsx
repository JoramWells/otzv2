/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Avatar from '@/components/Avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { calculateAge } from '@/utils/calculateAge'
import moment from 'moment'
import { type PatientAttributes } from 'otz-types'
import React from 'react'

interface InputProps {
  data: PatientAttributes | undefined
  isLoading: boolean
}

const PatientProfile = ({ data, isLoading }: InputProps) => {
  return (
    <>
      {isLoading
        ? (
        <Skeleton className="w-1/5 h-[200px]" />
          )
        : (
        <>
          <div className="flex flex-col items-center bg-white rounded-lg p-4 w-1/5 h-[200px]
          border
          ">

                <div className="flex flex-col items-center  w-full rounded-lg space-y-1">
                  <Avatar name={`${data?.firstName} ${data?.middleName}`} />
                  <p className="font-bold">
                    {data?.firstName} {data?.middleName}
                  </p>
                  <p className="text-[12px]">
                    <span className="font-bold">DOB</span>:{' '}
                    {moment(data?.dob).format('ll')},{' '}
                  </p>
                  <p className="text-[12px] text-slate-500">
                    <span>Age: </span>
                    {calculateAge(data?.dob)} yrs
                  </p>
                  <p className="text-[12px] text-slate-500">
                    <span className="font-semibold">Sex:</span>{' '}
                    {data?.sex === 'M' ? 'MALE' : 'FEMALE'}
                  </p>

                  <div className="text-slate-500 text-sm">
                    <p>
                      <span className="font-bold text-[12px] ">Phone:</span>{' '}
                      <span>{data?.phoneNo} </span>
                    </p>
                  </div>
                </div>
          </div>
        </>
          )}
    </>
  )
}

export default PatientProfile
