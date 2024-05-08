'use client'

import LabTab from '@/app/_components/lab/LabTab'

const Appointments = ({ params }: { params: any }) => {
  const { patientID } = params

  return (
    <>
      <LabTab patientID={patientID} />
    </>
  )
}
export default Appointments
