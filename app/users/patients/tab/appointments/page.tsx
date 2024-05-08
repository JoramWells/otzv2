'use client'

import AppointmentTab from '@/app/_components/patient/appointmentTab/AppointmentTab'
import { usePathname } from 'next/navigation'

const Appointments = ({ params }: { params: any }) => {
  const { patientID } = params
  const patname = usePathname()

  return (
    <>
      {patname}
      <AppointmentTab patientID={patientID} />
    </>
  )
}
export default Appointments
