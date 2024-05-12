'use client'

import LabTab from '@/app/patients/_components/LabTab'
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

      <LabTab patientID={patientID} />
    </>
  )
}
export default Appointments
