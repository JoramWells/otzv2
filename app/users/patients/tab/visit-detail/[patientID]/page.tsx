/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetExecuteDisclosureByVisitIdQuery } from '@/api/treatmentplan/full/executeDisclosure.api'
import { useGetPostDisclosureByVisitIdQuery } from '@/api/treatmentplan/full/postDisclosure.api'
import { useGetMmasFourByVisitIDQuery } from '@/api/treatmentplan/mmasFour.api'
import { useGetChildCaregiverReadinessByVisitIdQuery } from '@/api/treatmentplan/partial/childCaregiverReadiness.api'
import { useGetDisclosureEligibilityByVisitIDQuery } from '@/api/treatmentplan/partial/disclosureEligibility.api'
import { useGetTimeAndWorkQuery } from '@/api/treatmentplan/timeAndWork.api'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: '/users/patients'
  }

]

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)
const DetailPage = ({ params }: { params: any }) => {
  const { patientID } = params
  // const { data: disclosureData } = useGetAllDisclosureChecklistByVisitIdQuery(appointmentID)
  const { data } = useGetMmasFourByVisitIDQuery(patientID, {
    skip: !patientID
  })
  const { data: mmas8 } = useGetMmasFourByVisitIDQuery(patientID, {
    skip: !patientID
  })
  const { data: childCareData } = useGetChildCaregiverReadinessByVisitIdQuery(patientID, {
    skip: !patientID
  })
  const { data: disclosureData } = useGetDisclosureEligibilityByVisitIDQuery(patientID as string, {
    skip: !patientID
  })
  const { data: execData } = useGetExecuteDisclosureByVisitIdQuery(patientID, {
    skip: !patientID
  })
  const { data: postData } = useGetPostDisclosureByVisitIdQuery(patientID, {
    skip: !patientID
  })
  const { data: timeData } = useGetTimeAndWorkQuery(patientID, {
    skip: !patientID
  })
  console.log(data, mmas8, childCareData, disclosureData, execData, postData, timeData)
  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div>MMAS</div>
      <div>Follow Up Checklist</div>
    </>
  )
}

export default DetailPage
