/* eslint-disable @typescript-eslint/no-unsafe-argument */
import RecentTestHeader from '@/app/users/patients/tab/steps/_components/RecentTestHeader'
import moment from 'moment'
import { type TimeAndWorkAttributes } from 'otz-types'
import React from 'react'
interface RecentTimeWorkScheduleProps {
  data: TimeAndWorkAttributes
}
const RecentTimeWorkScheduleCard = ({ data }: RecentTimeWorkScheduleProps) => {
  return (
    <div className="w-1/3 rounded-lg bg-white border border-slate-200">
      <RecentTestHeader title="Recent time and work"

      />

      {/*  */}
      <div className="p-4 flex-col flex space-y-2">
        <div className="flex justify-between items-center w-full text-[12px] ">
          <p className="text-slate-500 ">Morning Medicine Time</p>
          <p className="font-bold">
            {moment(data?.morningMedicineTime, 'HH:mm').format('HH: mm a')}{' '}
          </p>
        </div>

        {/*  */}
        <div className="flex justify-between items-center w-full text-[12px] ">
          <p className="text-slate-500 ">Evening Medicine Time</p>
          <p className="font-bold">
            <p className="font-bold">
              {moment(data?.eveningMedicineTime, 'HH:mm').format('HH: mm a')}{' '}
            </p>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RecentTimeWorkScheduleCard
