'use client'

import CaseManagerTab from '@/app/_components/patient/appointmentTab/CaseManagerTab'
import { usePathname } from 'next/navigation'

const Appointments = ({ params }: { params: any }) => {
  const { patientID } = params
  const patname = usePathname()

  return (
    <>
      <CaseManagerTab patientID={patientID} />
    </>
  )
}
export default Appointments
