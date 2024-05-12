'use client'

import Settings from '@/app/_components/patient/settings/Settings'

const Appointments = ({ params }: { params: any }) => {
  const { patientID } = params

  return (
    <>
      <Settings patientID={patientID} />
    </>
  )
}
export default Appointments
