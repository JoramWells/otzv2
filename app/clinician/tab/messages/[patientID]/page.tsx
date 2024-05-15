'use client'

import Messages from '@/app/_components/patient/messages/Messages'

const Appointments = ({ params }: { params: any }) => {
  const { patientID } = params

  return (
    <>
      <Messages patientID={patientID} />
    </>
  )
}
export default Appointments
