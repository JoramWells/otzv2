/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useAddHomeVisitConfigMutation } from '@/api/homevisit/homeVisitConfig.api'
import { useGetPatientQuery } from '@/api/patient/patients.api'
import { useAddPatientVisitMutation } from '@/api/patient/patientVisits.api'
import TaskOne from '@/app/_components/home-visit/forms/TaskOne'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight, Info, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import PatientProfileHomeVisit from '../../_components/PatientProfileHomeVisit'
import { useRouter } from 'next/navigation'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: '/'
  }
]

const Page = ({ params }: { params: any }) => {
  // const searchParams = useSearchParams()

  const { patientID }: { patientID: string } = params
  // const patientID = searchParams.get('patientID')
  const { data: session } = useSession()

  //
  const userID = session?.user.id

  //
  const { data: patientData, isLoading: isLoadingPatient } =
    useGetPatientQuery(patientID)

  //
  // useEffect(() => {
  //   if (visitData) {
  //     // setPatientVisitID(visitData?.id)
  //     void addHomeVisitConfig({
  //       ...inputValues[0],
  //       patientVisitID: visitData.id
  //     })
  //   }
  // }, [visitData, addHomeVisitConfig, inputValues])

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-2">

      </div>
    </div>
  )
}

export default Page
