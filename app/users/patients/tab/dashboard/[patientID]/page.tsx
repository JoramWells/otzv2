/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { useGetViralLoadTestQuery } from '@/api/enrollment/viralLoadTests.api'
import { useAddPatientVisitMutation } from '@/api/patient/patientVisits.api'
import { useGetVitalSignByPatientIDQuery } from '@/api/vitalsigns/vitalSigns.api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'
import moment from 'moment'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
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
    label: 'dashboard',
    link: 'dashboard'
  }
]
export interface InputTabProps {
  id: number
  params?: string
}

const PatientDetails = ({ params }: any) => {
  const { patientID } = params
  const [patientVisitID, setPatientVisitID] = useState<string | null>(null)
  const { data } = useGetViralLoadTestQuery(patientID)

  const [addPatientVisit, { isLoading, data: visitData }] = useAddPatientVisitMutation()

  // const inputValues = {
  //   patientID,
  //   patientVisitID
  // }

  const handleStartVisit = async () => {
    const newVisitID = uuidv4()
    setPatientVisitID(newVisitID)
    const inputValues = {
      patientID,
      patientVisitID: newVisitID
    }
    await addPatientVisit(inputValues)
  }

  const { data: vsData } = useGetVitalSignByPatientIDQuery(patientID)

  useEffect(() => {
    if (visitData) {
      redirect(
        `/users/patients/tab/steps/${patientID}?appointmentID=${visitData.id}`
      )
    }
  }, [visitData, patientID, patientVisitID])

  console.log(vsData, 'vsx')

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2 w-full justify-between flex items-center bg-white mt-2">
        <div>
          <p className="font-bold">Patient Profile</p>
          <p className="text-[14px] text-slate-500 ">
            Current Patient Profile Details
          </p>
        </div>
        <Button
          disabled={isLoading}
          onClick={async () => {
            await handleStartVisit()
          }}
          className="shadow-none bg-teal-600 hover:bg-teal-700 font-bold"
        >
          {isLoading && <Loader2 className="mr-2" size={18} />}
          Start Visit
        </Button>
      </div>

      <div className="flex space-x-2 flex-row w-full items-start p-4">
        <div className="rounded-lg p-4 w-1/4 bg-white">
          {data && (
            <div className="flex flex-col space-y-2">
              <div className="w-full flex justify-between items-center">
                <p className="font-bold">Current Viral Load</p>
                {data.isVLValid
                  ? (
                  <Badge className="rounded-full shadow-none hover:bg-emerald-50  bg-emerald-50 text-emerald-500">
                    Valid
                  </Badge>
                    )
                  : (
                  <Badge className="rounded-full shadow-none hover:bg-red-50  bg-red-50 text-red-500">
                    Invalid
                  </Badge>
                    )}
              </div>
              <div className="text-slate-500 flex w-full justify-between items-center">
                <p className=" text-[14px]">Results:</p>
                <p className="text-[14px] font-bold ">
                  {data.vlResults} Copies/ml
                </p>
              </div>
              <div className="flex justify-between w-full items-center text-[14px] text-slate-500 ">
                <p>Date</p>
                {moment(data.dateOfVL).format('ll')}
              </div>
              <div className="flex w-full justify-between items-center text-[14px] text-slate-500">
                <p>Justification</p>
                {data.vlJustification}
              </div>
            </div>
          )}
        </div>
        {/*  */}
        <div className="w-1/4 bg-white rounded-lg p-2 h-[145px] ">
          <p className="font-bold">Recent Vital Signs</p>
          {vsData
            ? (
            <div>
              <div>
                <p>height</p>
                45cm
              </div>
              <div>weight 28k</div>
              <div>bmi 28k</div>
            </div>
              )
            : (
            <div>
              <p className="text-slate-500 text-[14px] ">
                No Recent Vital Signs
              </p>
              <Link href={'update'} className="text-blue-500 text-sm underline">
                Update
              </Link>
            </div>
              )}
        </div>

        {/*  */}
        <div className="w-1/4 bg-white rounded-lg p-2 h-[145px] overflow-y-auto ">
          <p className="text-lg font-bold">Allergies</p>
          <div>
            <p>height</p>
            45cm
          </div>
          <div>weight 28k</div>
          <div>bmi 28k</div>
          <div>Caffeine</div>
        </div>

        {/*  */}
        <div className="w-1/4 bg-white rounded-lg p-2 h-[145px] overflow-y-auto ">
          <p className="text-lg font-bold">Medication</p>
          <div className="flex justify-between">
            <p>On ART</p>
            45cm
          </div>
          <div>TPT</div>
          <div>Anti TB</div>
          <div>Prep/pep</div>
        </div>
      </div>
      <div>
        <div>Line Cart for weit</div>
        <div>Line Cart for VL</div>
      </div>
    </div>
  )
}

export default PatientDetails
