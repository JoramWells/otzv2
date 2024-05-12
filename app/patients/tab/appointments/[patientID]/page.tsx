'use client'

import AppointmentTab from '@/app/patients/_components/AppointmentTab'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: ''
  }
]

const Appointments = ({ params }: { params: any }) => {
  const { patientID } = params
  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <AppointmentTab patientID={patientID} />
    </>
  )
}
export default Appointments
