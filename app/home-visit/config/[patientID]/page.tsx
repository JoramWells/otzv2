/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { useAddHomeVisitConfigMutation } from '@/api/homevisit/homeVisitConfig.api'
import { useAddPatientVisitMutation } from '@/api/patient/patientVisits.api'
import TaskOne from '@/app/_components/home-visit/forms/TaskOne'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
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
  const [homeVisitReason, setHomeVisitReason] = useState('')
  const [dateRequested, setDateRequested] = useState('')
  const [frequency, setFrequency] = useState('')

  //
  const { data: agendaData } = useGetAllAppointmentAgendaQuery()
  const { data: statusData } = useGetAllAppointmentStatusQuery()

  const agendaDataOptions = useCallback(() => {
    return (
      agendaData?.filter(
        (item: any) => item.agendaDescription.toLowerCase() === 'home visit'
      ) || []
    )
  }, [agendaData])

  const statusOptions = useCallback(() => {
    return (
      statusData?.filter(
        (item: any) => item.statusDescription.toLowerCase() === 'upcoming'
      ) || []
    )
  }, [statusData])

  const [addHomeVisitConfig, { isLoading }] = useAddHomeVisitConfigMutation()
  const [addPatientVisit, { isLoading: isLoadingVisit, data: visitData }] =
    useAddPatientVisitMutation()

  //

  // const [patientVisitID, setPatientVisitID] = useState()

  const inputValues = useMemo(
    () => [
      {
        homeVisitReason,
        patientID,
        userID,
        dateRequested,
        appointmentAgendaID:
          agendaDataOptions()?.length > 0 && agendaDataOptions()[0]?.id,
        appointmentStatusID:
          statusOptions()?.length > 0 && statusOptions()[0]?.id,
        frequency,
        requestedBy: userID,
        patientVisitID: visitData?.id
      }
    ],
    [
      agendaDataOptions,
      dateRequested,
      frequency,
      homeVisitReason,
      patientID,
      statusOptions,
      userID,
      visitData?.id
    ]
  )

  //

  const handleStartVisit = useCallback(async () => {
    const newVisitID = uuidv4()
    const inputValues = {
      patientID,
      id: newVisitID
    }
    await addPatientVisit(inputValues)

    //
    // if (visitData?.id) {
    //   // setPatientVisitID(visitData.id)
    //   await addHomeVisitConfig(inputValues[0])
    // }
  }, [addPatientVisit, patientID])

  // const handleStartVisit = async () => {
  //   const newVisitID = uuidv4()
  //   const inputValues = {
  //     patientID,
  //     id: newVisitID
  //   }
  //   await addPatientVisit(inputValues)

  //   //
  //   if (visitData?.id) {
  //     // setPatientVisitID(visitData.id)
  //     await addHomeVisitConfig(inputValues[0])
  //   }
  // }

  //
  useEffect(() => {
    if (visitData?.id) {
      // setPatientVisitID(visitData?.id)
      void addHomeVisitConfig(inputValues[0])
    }
  }, [visitData, addHomeVisitConfig, inputValues])

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-2">
        <div className="w-1/2 p-4 rounded-lg bg-white">
          <h2>Create Patient COnfiguration</h2>
          <TaskOne
            homeVisitReason={homeVisitReason}
            setHomeVisitReason={setHomeVisitReason}
            dateRequested={dateRequested}
            setDateRequested={setDateRequested}
            frequency={frequency}
            setFrequency={setFrequency}
          />
          <Button
            onClick={async () => {
              await handleStartVisit()
            }}
          >
            {(isLoadingVisit || isLoading) && (
              <Loader2 className="mr-2 animate-spin " size={18} />
            )}
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
