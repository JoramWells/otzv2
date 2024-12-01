/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetExecuteDisclosureQuery } from '@/api/treatmentplan/full/executeDisclosure.api'
import { useGetPostDisclosureQuery } from '@/api/treatmentplan/full/postDisclosure.api'
import { useGetMmasEightQuery } from '@/api/treatmentplan/mmasEight.api'
import { useGetMmasFourQuery } from '@/api/treatmentplan/mmasFour.api'
import { useGetChildCaregiverReadinessQuery } from '@/api/treatmentplan/partial/childCaregiverReadiness.api'
import { useGetDisclosureEligibilityQuery } from '@/api/treatmentplan/partial/disclosureEligibility.api'
import { useGetTimeAndWorkQuery } from '@/api/treatmentplan/timeAndWork.api'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'

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
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('visitID')
  const { patientID } = params
  // const { data: disclosureData } = useGetAllDisclosureChecklistByVisitIdQuery(appointmentID)
  const { data } = useGetMmasFourQuery(patientID)
  const { data: mmas8 } = useGetMmasEightQuery(patientID)
  const { data: childCareData } = useGetChildCaregiverReadinessQuery(patientID)
  const { data: disclosureData } = useGetDisclosureEligibilityQuery(patientID)
  const { data: execData } = useGetExecuteDisclosureQuery(patientID)
  const { data: postData } = useGetPostDisclosureQuery(patientID)
  const { data: timeData } = useGetTimeAndWorkQuery(patientID)
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
