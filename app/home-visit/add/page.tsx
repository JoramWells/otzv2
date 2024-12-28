/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useAddHomeVisitConfigMutation } from '@/api/homevisit/homeVisitConfig.api'
import { useAddPatientVisitMutation } from '@/api/patient/patientVisits.api'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight, Info, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { type PatientAttributes, type UserInterface } from 'otz-types'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import TaskOne from '@/app/_components/home-visit/forms/TaskOne'
import { useGetAllSearchedPatientsQuery } from '@/api/patient/patients.api'
import SearchInputDropDown, { type SelectInputProps } from '@/components/forms/SearchInputDropDown'

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
  // const { data: patientData } = useGetAllPatientsQuery({
  //   hospitalID: user?.hospitalID as string
  // })

  const [homeVisitReason, setHomeVisitReason] = useState('')
  const [dateRequested, setDateRequested] = useState('')
  const [frequency, setFrequency] = useState('')

  const [addHomeVisitConfig, { isLoading, data: homeData }] =
    useAddHomeVisitConfigMutation()
  const [addPatientVisit, { isLoading: isLoadingVisit }] =
    useAddPatientVisitMutation()

  //
  const [search, setSearch] = useState<SelectInputProps>({ id: '', label: '' })

  const { data } = useGetAllSearchedPatientsQuery(
    {
      hospitalID: user?.hospitalID as string,
      searchQuery: search?.label as string
    },
    {
      skip: !user?.hospitalID
    }
  )

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
      patientID: search?.id,
      id: newVisitID
    }
    if (search?.id) {
      await addPatientVisit(visitInputValues).then(async (res) => {
        await addHomeVisitConfig({
          ...inputValues[0],
          patientVisitID: res.data.id
        })
      })
    }

    //
    // if (visitData?.id) {
    //   // setPatientVisitID(visitData.id)
    //   await addHomeVisitConfig(inputValues[0])
    // }
  }, [addHomeVisitConfig, addPatientVisit, inputValues, search?.id, userID])

  const router = useRouter()

  // useEffect(() => {
  //   if (homeData) {
  //     router.push(
  //       `/home-visit/config/visit/${homeData?.id}?patientID=${search?.id}`
  //     )
  //   }
  // }, [homeData, search?.id, router])
  const [visitData, setVisitData] = useState<PatientAttributes[]>([])

  useEffect(() => {
    if (data) {
      setVisitData(data?.data)
    }
  }, [data])

  const searchPatientsOptions = useCallback(() => {
    return visitData?.map(item => ({
      id: item?.id,
      label: `${item?.firstName} ${item?.middleName}`
    }))
  }, [visitData])

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />
      <div className="p-2">
        <div className="bg-white rounded-lg p-2">
          <div className="w-1/2 border border-slate-200 rounded-lg">
            <div className="p-2 border-b border-slate-300 bg-slate-50 rounded-t-lg ">
              <p className="font-semibold text-slate-700 text-[14px]  ">
                Patient Home visit Configuration
              </p>
            </div>

            <div className="m-2 p-4 flex flex-row space-x-4 border border-blue-200 rounded-lg bg-blue-50 ">
              <div className="bg-white rounded-full p-2 flex items-center justify-center h-7 w-h-7 ">
                <Info className="text-blue-500" size={14} />
              </div>
              <div>
                <p className="font-semibold text-blue-500 text-[14px]  ">
                  Create a reusable configuration for patient home visit
                </p>
                <p className="text-muted-foreground text-[12px] ">
                  Configuration defines a reusable entity for a list of upcoming
                  home visit entries.
                </p>
              </div>
            </div>
            <SearchInputDropDown
              data={searchPatientsOptions() ?? []}
              search={search}
              setSearch={setSearch}
            />
            {/*  */}
            {search?.id
              ? (
              <div>
                <div className="w-full rounded-lg bg-white mt-2 ">
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
                )
              : (
              <div className="border-dashed border-slate-200 p-2 bg-gray-50 rounded-lg m-2 border">
                <p className="text-slate-700 font-semibold">Select client</p>
                <p className="text-[12px] text-slate-500">
                  No client has been selected. Please search and select if you
                  want to perform a homevisit
                </p>
              </div>
                )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeVisitAdd
