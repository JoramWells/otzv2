'use client'

import HomeVisitTab from '@/app/_components/home-visit/HomevisitTab'

const Appointments = ({ params }: { params: any }) => {
  const { patientID } = params

  return (
    <>
      <HomeVisitTab patientID={patientID} />
    </>
  )
}
export default Appointments
