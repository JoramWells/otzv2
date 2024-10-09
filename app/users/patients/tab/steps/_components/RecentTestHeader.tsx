import { CalendarCheck2 } from 'lucide-react'
import moment from 'moment'
import React from 'react'

interface InputProps {
  title: string
  date?: string | Date
}

const RecentTestHeader = ({ title, date }: InputProps) => {
  return (
    <div className=" p-2.5 pl-2 bg-slate-200 rounded-t-lg flex items-center justify-between ">
      <p className="text-[14px] font-bold ml-2 ">{title}</p>
      <div className="flex justify-between items-center space-x-2 text-slate-500 text-[12px] ">
        <CalendarCheck2 size={15} />
        <p
        className='text-[12px]'
        >{moment(date).format('ll')}</p>
      </div>
    </div>
  )
}

export default RecentTestHeader
