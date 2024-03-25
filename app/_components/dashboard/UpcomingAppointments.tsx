import React from 'react'
import { CustomTable } from '../table/CustomTable'
import { columns } from '../home-visit/columns'

const UpcomingAppointments = () => {
  return (
    <div
      className="border
        p-2
        "
    >
      <p className="text-xl font-bold mb-4 rounded-lg">Upcoming Appointments</p>
      <CustomTable isSearch={false} columns={columns} data={[]} />
    </div>
  )
}

export default UpcomingAppointments
