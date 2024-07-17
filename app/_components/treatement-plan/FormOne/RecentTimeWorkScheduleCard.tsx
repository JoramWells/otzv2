/* eslint-disable @typescript-eslint/no-unsafe-argument */
import moment from 'moment'
import { type TimeAndWorkAttributes } from 'otz-types'
import React from 'react'
interface RecentTimeWorkScheduleProps {
  data: TimeAndWorkAttributes
}
const RecentTimeWorkScheduleCard = ({ data }: RecentTimeWorkScheduleProps) => {
  return (
    <div className="w-1/3 rounded-lg bg-white border border-slate-200">
      <div className="border border-slate-200 p-2 pl-4 bg-slate-100 border-t-0 rounded-t-lg">
        <p className="text-[14px] font-bold ">Recent time and work</p>
      </div>

      {/*  */}
      <div className="p-4 flex-col flex space-y-2">
        <div className="flex justify-between items-center w-full text-[14px] ">
          <p className="text-slate-500 ">Morning Medicine Time</p>
          <p className="font-bold">
            {moment(
              data?.morningMedicineTime,
              'HH:mm'
            ).format('HH: mm a')}{' '}
          </p>
        </div>

        {/*  */}
        <div className="flex justify-between items-center w-full text-[14px] ">
          <p className="text-slate-500 ">Evening Medicine Time</p>
          <p className="font-bold">
            <p className="font-bold">
              {moment(
                data?.eveningMedicineTime,
                'HH:mm'
              ).format('HH: mm a')}{' '}
            </p>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RecentTimeWorkScheduleCard
