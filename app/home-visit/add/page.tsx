/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useAddHomeVisitConfigMutation } from '@/api/homevisit/homeVisitConfig.api'
import { useGetAllPatientsQuery } from '@/api/patient/patients.api'
import { useAddPatientVisitMutation } from '@/api/patient/patientVisits.api'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight, Info, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { type UserInterface, type PatientAttributes } from 'otz-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TaskOne from '@/app/_components/home-visit/forms/TaskOne'

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
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
  }
)

const HomeVisitAdd = () => {
  const { data: session } = useSession()
  const [user, setUser] = useState<UserInterface>()

  //
  const userID = session?.user.id
  useEffect(() => {
    if (session) {
      const { user } = session
      setUser(user as UserInterface)
    }
  }, [session])
  const { data: patientData } = useGetAllPatientsQuery({
    hospitalID: user?.hospitalID as string
  })
  const [patientID, setPatientID] = useState()
  const patientDataOptions = useCallback(() => {
    return (
      patientData?.map((item: PatientAttributes) => ({
        id: item.id as string,
        label: `${item.firstName} ${item.middleName}`
      })) ?? []
    )
  }, [patientData])()

  //
  const [homeVisitReason, setHomeVisitReason] = useState('')
  const [dateRequested, setDateRequested] = useState('')
  const [frequency, setFrequency] = useState('')

  const [addHomeVisitConfig, { isLoading, data: homeData }] =
    useAddHomeVisitConfigMutation()
  const [addPatientVisit, { isLoading: isLoadingVisit }] =
    useAddPatientVisitMutation()

  //

  const inputValues = useMemo(
    () => [
      {
        homeVisitReasonID: homeVisitReason,

        dateRequested,
        frequency,
        requestedBy: userID
      }
    ],
    [dateRequested, frequency, homeVisitReason, userID]
  )

  //

  const handleStartVisit = useCallback(async () => {
    const newVisitID = uuidv4()
    const visitInputValues = {
      userID,
      patientID,
      id: newVisitID
    }
    await addPatientVisit(visitInputValues).then(async (res) => {
      await addHomeVisitConfig({
        ...inputValues[0],
        patientVisitID: res.data.id
      })
    })

    //
    // if (visitData?.id) {
    //   // setPatientVisitID(visitData.id)
    //   await addHomeVisitConfig(inputValues[0])
    // }
  }, [addHomeVisitConfig, addPatientVisit, inputValues, patientID, userID])

  const router = useRouter()

  useEffect(() => {
    if (homeData) {
      router.push(
        `/home-visit/config/visit/${homeData?.id}?patientID=${patientID}`
      )
    }
  }, [homeData, patientID, router])

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-2">
        <div className="bg-white rounded-lg">
          <div className="w-1/2 p-4">
            <div className="p-2 border-b border-slate-200 ">
              <h2 className="font-semibold text-slate-700 text-[16px]  ">
                Patient Home visit Configuration
              </h2>
            </div>

            <div className="mt-4 mb-4 p-4 flex flex-row space-x-4 border border-blue-200 rounded-lg bg-blue-50 ">
              <div className="bg-white rounded-full p-2 flex items-center justify-center h-10 w-10 ">
                <Info className='text-blue-500' size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-blue-500 text-[14px]  ">
                  Create a reusable configuration for patient home visit
                </h3>
                <p className="text-muted-foreground text-[12px] ">
                  Configuration defines a reusable entity for a list of upcoming
                  home visit entries.
                </p>
              </div>
            </div>
            <CustomSelect
              label="Select Patient"
              onChange={setPatientID}
              value={patientID as unknown as string }
              data={patientDataOptions ?? []}
            />
          </div>

          {/*  */}
          {patientID && (
            <div>

              <div className="w-1/2 rounded-lg bg-white mt-2 ">
                <TaskOne
                  homeVisitReason={homeVisitReason}
                  setHomeVisitReason={setHomeVisitReason}
                  dateRequested={dateRequested}
                  setDateRequested={setDateRequested}
                  frequency={frequency}
                  setFrequency={setFrequency}
                />
                <Button
                  className="m-4 mt-0"
                  size={'sm'}
                  onClick={async () => {
                    await handleStartVisit()
                  }}
                >
                  {(isLoadingVisit || isLoading) && (
                    <Loader2 className="mr-2 animate-spin " size={18} />
                  )}
                  Continue
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomeVisitAdd
