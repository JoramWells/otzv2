'use client'

import { CustomTable } from '@/app/_components/table/CustomTable'
import React from 'react'
import { recentTimeAndWorkColumn } from '../dashboard/columns'
import { type ExtendedTimeAndWorkInterface } from '@/api/treatmentplan/timeAndWork.api'

const RecentTimeAndWorkSchedule = ({ data }: { data?: ExtendedTimeAndWorkInterface[] }) => {
  return (
    <div className="flex flex-col space-y-2 border border-slate-200 rounded-lg ring ring-slate-100">
      <div
      className='p-2 border-slate-200 border-b bg-slate-50 rounded-t-lg'
      >
        <p className="text-[14px] text-slate-800 font-semibold">
          Recent Schedule Entry
        </p>
      </div>
      <CustomTable
        data={data ?? []}
        isSearch={false}
        columns={recentTimeAndWorkColumn}
      />
    </div>
  )
}

export default RecentTimeAndWorkSchedule
