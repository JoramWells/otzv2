/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react'

const Progress = ({ percentage }: { percentage: number }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/4 flex flex-row items-center space-x-2">
      <div className="rounded-full flex flex-1 bg-slate-200">
        <div
          className="rounded-full flex pl-4 items-center h-2 bg-emerald-500 text-[12px] font-semibold"
          style={{
            width: `${percentage}%`
          }}
        />
      </div>
      <p className="text-[10px] sm:text-[12px] font-bold text-slate-700">
        {percentage}%
      </p>
    </div>
  )
}

export default Progress
