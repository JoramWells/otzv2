'use client'

import CaseManagerTab from '@/app/_components/patient/appointmentTab/CaseManagerTab'

const Appointments = ({ params }: { params: any }) => {
  const { patientID } = params

  return (
    <>
      <CaseManagerTab patientID={patientID} />
    </>
  )
}
export default Appointments
