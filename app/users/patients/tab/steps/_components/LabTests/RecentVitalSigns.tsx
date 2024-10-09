import { CollapseButton } from '@/components/CollapseButton'
import { calculateBMI } from '@/utils/calculateBMI'
import { CalendarCheck2 } from 'lucide-react'
import moment from 'moment'
import React from 'react'

interface RecentVitalSignsProps { createdAt: Date, temperature?: number, pulseRate?: number, respiratoryRate?: number, systolic?: number, diastolic?: number, weight?: number, height?: number | string }

const RecentVitalSigns = ({ createdAt, temperature, pulseRate, respiratoryRate, systolic, diastolic, weight, height }: RecentVitalSignsProps) => {
  return (
    <div className="w-1/3 bg-white rounded-lg">
      <div className="flex justify-between items-center w-full border p-2 rounded-t-lg bg-slate-200 ">
        <p className="text-[14px] font-bold  ">Recent Vitals</p>
        <div className="flex justify-between items-center space-x-2 text-slate-500 text-[12px] ">
          <CalendarCheck2 size={15} />
          <p>{moment(createdAt).format('ll')}</p>
        </div>
      </div>

      <div className="p-2">
        <div className="flex justify-between items-center w-full p-2 text-[12px] ">
          <p className=" text-slate-500">Temperature</p>
          <p className="font-bold">{temperature} °C</p>
        </div>
        <div className="w-full border-b border-slate-100" />

        <div className="flex justify-between items-center w-full p-2 text-[12px] ">
          <span className="text-slate-500 ">Pulse Rate</span>
          <p className="font-bold">{pulseRate} bpm</p>
        </div>
        <div className="w-full border-b border-slate-100" />

        <div className="flex justify-between items-center w-full p-2 text-[12px] ">
          <span className="text-slate-500 ">Respiratory Rate</span>
          <span className="font-bold">{respiratoryRate} bpm</span>
        </div>
        <div className="w-full border-b border-slate-100" />
        <CollapseButton label="Blood Pressure">
          <div className="w-full flex items-center space-x-4">
            <div>
              <p className="text-[12px] ">Systolic</p>
              <p className="font-bold">{systolic}</p>
            </div>
            <p>/</p>
            <div>
              <p className="text-[12px] ">Diastolic</p>
              <p className="font-bold">{diastolic}</p>
            </div>
          </div>
        </CollapseButton>
        <div className="w-full border-b border-slate-100" />

        <CollapseButton label="BMI">
          <div className="w-full flex items-center space-x-4 justify-between">
            <div className="w-full flex items-center space-x-4">
              <div>
                <p>Weight</p>
                <p className="font-bold">
                  {weight}
                  <span className="text-[14px]">kg</span>
                </p>
              </div>
              <p>/</p>
              <div>
                <p>Height</p>
                <p className="font-bold">
                  {height}
                  <span className="text-[14px]">cm</span>
                </p>
              </div>
            </div>
            <div>
                {(weight != null) && calculateBMI(weight, height as string)}</div>
          </div>
        </CollapseButton>
      </div>
    </div>
  )
}

export default RecentVitalSigns
