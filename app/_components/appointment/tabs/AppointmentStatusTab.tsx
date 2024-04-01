import React, { useState } from 'react'
import { CustomTable } from '../../table/CustomTable'
import { CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Calendar from '../../calendar/Calendar'
import { type ColumnDef } from '@tanstack/react-table'
import { type ColumnProps } from '@/app/appointment/columns'

interface AppointmentTabProps {
  data: []
  columns: Array<ColumnDef<ColumnProps>>
}

const AppointmentStatusTab = ({ data, columns }: AppointmentTabProps) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)

  return (
    <div>
      <div className="flex flex-row items-center justify-end space-x-4 mt-4 mb-4">
        <CalendarDays
          size={25}
          onClick={() => {
            setIsCalendarVisible(!isCalendarVisible)
          }}
          className={`hover:cursor-pointer bg-gray-100 h-8 w-8 p-2 rounded-md ${
            isCalendarVisible && 'bg-teal-600 text-white'
          }`}
        />{' '}
        <Button size={'sm'} className="bg-sky-700 hover:bg-sky-600">
          NEW
        </Button>
      </div>
      {isCalendarVisible
        ? <Calendar data={data} />
        : <CustomTable data={data} columns={columns} />}
    </div>
  )
}

export default AppointmentStatusTab
