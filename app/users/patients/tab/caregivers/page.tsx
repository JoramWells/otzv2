'use client'

import CareGiverTab from '@/app/_components/patient/appointmentTab/CareGiverTab'
import { usePathname } from 'next/navigation'

const Appointments = ({ params }: { params: any }) => {
  const { patientID } = params
  const patname = usePathname()

  return (
    <>
      <CareGiverTab patientID={patientID} />
    </>
  )
}
export default Appointments
