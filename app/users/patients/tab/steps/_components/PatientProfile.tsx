/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Avatar from '@/components/Avatar'
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
        <div className="pl-4  pr-4 p-2 w-1/3 bg-white">Loading ...</div>
          )
        : (
        <div
          className="bg-white rounded-lg w-1/3 sticky top-[10px]
          border border-slate-200 ring ring-slate-100
          "
        >
          <div className="flex space-x-2 items-center w-full border-b bg-slate-50 border-slate-200 pl-4 p-2  rounded-t-lg">
            <Avatar name={`${data?.firstName} ${data?.middleName}`} />
            <p className="font-bold text-[14px] ">
              {data?.firstName} {data?.middleName}
            </p>
          </div>
          <div className="flex flex-col  w-full rounded-lg space-y-2 p-4">
            <div className="flex justify-between items-center text-[12px]">
              <span className="text-slate-500 ">Date of Birth:</span>
              <p className="font-semibold">
                {moment(data?.dob).format('ll')}, {calculateAge(data?.dob)} yrs
              </p>
            </div>
            <div className="flex justify-between items-center text-[12px] ">
              <span className="text-slate-500 ">Sex:</span>
              <p className="font-semibold">
                {data?.sex === 'M' ? 'MALE' : 'FEMALE'}
              </p>
            </div>

            <div className="flex justify-between text-[12px] items-center">
              <span className="text-slate-500  ">Phone:</span>
              <p className="font-semibold ">{data?.phoneNo}</p>
            </div>
          </div>
        </div>
          )}
    </>
  )
}

export default PatientProfile
