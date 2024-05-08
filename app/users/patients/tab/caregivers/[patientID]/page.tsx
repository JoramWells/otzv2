'use client'

import CareGiverTab from '@/app/_components/patient/appointmentTab/CareGiverTab'

const Appointments = ({ params }: { params: any }) => {
  const { patientID } = params

  return (
    <>
      <CareGiverTab patientID={patientID} />
    </>
  )
}
export default Appointments
