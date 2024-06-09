/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { useGetPriorityAppointmentDetailQuery } from '@/api/appointment/appointment.api.'
import { useGetArtPrescriptionQuery } from '@/api/art/artPrescription.api'
import { useGetViralLoadTestQuery } from '@/api/enrollment/viralLoadTests.api'
import { useAddPatientVisitMutation } from '@/api/patient/patientVisits.api'
import { useGetVitalSignByPatientIDQuery } from '@/api/vitalsigns/vitalSigns.api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { secondaryColor } from '@/constants/color'
import { calculateTimeDuration } from '@/utils/calculateTimeDuration'
import { ArrowRight, InfoIcon, Loader2 } from 'lucide-react'
import moment from 'moment'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { StartVisitDropdown } from '../../../_components/StartVisitDropdown'
import { useGetTimeAndWorkByPatientIDQuery } from '@/api/treatmentplan/timeAndWork.api'
import { calculateBMI } from '@/utils/calculateBMI'
import { useGetPrescriptionDetailQuery } from '@/api/pillbox/prescription.api'
import WeightHeightLineChart from '@/app/_components/charts/WeightHeightLineChart'
import PillBox from '../../../_components/PillBox'

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
    link: ''
  }
]
export interface InputTabProps {
  id: number
  params?: string
}

const PatientDetails = ({ params }: any) => {
  const { patientID } = params
  const { data } = useGetViralLoadTestQuery(patientID)

  const { data: timeData } = useGetTimeAndWorkByPatientIDQuery(patientID)

  const [addPatientVisit, { isLoading, data: visitData }] = useAddPatientVisitMutation()

  const { data: priorityAppointment } = useGetPriorityAppointmentDetailQuery(patientID)

  const { data: prescriptionData } = useGetArtPrescriptionQuery(patientID)

  const { data: artPrescription } = useGetPrescriptionDetailQuery(patientID)

  // const inputValues = {
  //   patientID,
  //   patientVisitID
  // }

  console.log(artPrescription, "tdf")

  const calculateAdherence = (noOfPills: number, pillsTaken: number) => {
    return (pillsTaken / noOfPills) * 100
  }

  const handleStartVisit = async () => {
    const newVisitID = uuidv4()
    const inputValues = {
      patientID,
      patientVisitID: newVisitID
    }
    await addPatientVisit(inputValues)
  }

  const { data: vsData } = useGetVitalSignByPatientIDQuery(patientID)
  const [bmi, setBMI] = useState(0)

  useEffect(() => {
    if (visitData) {
      redirect(
        `/users/patients/tab/steps/${patientID}?appointmentID=${visitData.id}`
      )
    }
    if (vsData) {
      const BMI = calculateBMI(vsData?.weight, vsData?.height)

      setBMI(BMI)
    }
  }, [visitData, patientID, vsData])

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />

      <div className="p-2 w-full justify-between flex items-center bg-white mt-2">
        <div>
          <p className="font-bold">Patient Profile</p>
        </div>
        <div className="flex items-center bg-teal-600 rounded-lg">
          <Button
            disabled={isLoading}
            onClick={async () => {
              await handleStartVisit()
            }}
            className="shadow-none bg-teal-600 hover:bg-teal-700 font-bold"
          >
            {isLoading && <Loader2 className="mr-2 animate-spin" size={18} />}
            Initiate Care
          </Button>
          <StartVisitDropdown
            appointmentList={priorityAppointment}
            patientID={patientID}
          />
        </div>
      </div>

      <div className="flex space-x-4 flex-row w-full items-start p-4">
        {data
          ? (
          <div className="rounded-lg p-4 flex-1 flex items-center bg-white h-[145px] relative border border-slate-200 ">
            <div>
              <p className="font-bold text-[14px]">Viral Load</p>
              <p className="text-2xl font-extrabold ">
                {data.vlResults} <span className="text-[14px]">Copies/ml</span>
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="w-full flex justify-end items-center absolute top-2 right-2 ">
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

              <div className="flex justify-between w-full items-center text-[14px] text-slate-500 ">
                <p>Date </p>
                {moment(data.dateOfVL).format("ll")}
              </div>
              <div className="flex w-full justify-between items-center text-[14px] text-slate-500">
                <p>Justification </p>
                {data.vlJustification}
              </div>
            </div>
          </div>
            )
          : (
          <div
            className={`bg-[${secondaryColor}] p-2 rounded-lg 
            border-l-4 BORDER-[${secondaryColor}]
            flex flex-row h-[145px] space-x-4 flex-1`}
          >
            <InfoIcon className="text-slate-500" size={18} />
            <div>
              <p className="text-slate-500 text-[14px] ">
                No Recent Viral Load
              </p>
              <Link href={"update"} className="text-blue-500 text-sm underline">
                Update
              </Link>
            </div>
          </div>
            )}
        {/*  */}
        <div
          className={
            "border rounded-lg  h-[145px] bg-white flex-1 p-4 flex flex-col  justify-center"
          }
        >
          {vsData
            ? (
            <div className="flex items-center space-x-4 ">
              <div className="">
                <h1
                  className={`text-2xl font-extrabold
                  ${bmi > 30 && "text-red-500"}
                  `}
                >
                  BMI
                </h1>
                <p>{bmi}</p>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex space-x-4 items-center">
                  <p className="text-[14px] text-slate-500 ">Weight (kg)</p>
                  <p className="font-bold">{vsData?.weight}</p>
                </div>
                <div className="border-b w-full border-slate-200" />

                <div>
                  <div className="flex items-center space-x-4 ">
                    <p className="text-[14px] text-slate-500 ">Height (cm)</p>
                    <p className="font-bold">{vsData?.height}</p>
                  </div>
                </div>
              </div>
              {bmi > 30
                ? (
                <Badge className="shadow-none rounded-full bg-red-50 text-red-500 hover:bg-red-50 ">
                  Obese
                </Badge>
                  )
                : (
                <Badge>Not Obese</Badge>
                  )}
            </div>
              )
            : (
            <div
              className={`bg-[${secondaryColor}] p-2 rounded-lg flex flex-row h-[145px] space-x-4 flex-1`}
            >
              <InfoIcon className="text-slate-500" size={18} />
              <div>
                <p className="text-slate-500 text-[14px] ">
                  No Recent Vital Signs Record
                </p>
                <Link
                  href={"update"}
                  className="text-blue-500 text-sm underline"
                >
                  Update
                </Link>
              </div>
            </div>
              )}
        </div>

        {/*  */}
        <div className="flex-1 rounded-lg h-[145px] overflow-y-auto ">
          {prescriptionData
            ? (
            <div className="h-[145px] flex bg-white p-2 border border-slate-200 rounded-lg">
              <div className="flex-1">
                <p className="text-2xl font-extrabold">
                  {prescriptionData?.regimen}
                </p>
                {calculateAdherence(
                  artPrescription?.noOfPills,
                  artPrescription?.computedNoOfPills
                )}{" "}
                %<p>{artPrescription?.noOfPills}</p>
                <p>{moment(artPrescription?.refillDate).format("LL")}</p>
              </div>
        <PillBox />
            </div>
              )
            : (
            <div
              className={`bg-[${secondaryColor}] p-2 rounded-lg flex flex-row h-[145px] space-x-4 flex-1`}
            >
              <InfoIcon className="text-slate-500" size={18} />
              <div>
                <p className="text-slate-500 text-[14px] ">No Medication</p>
                <Link
                  href={"update"}
                  className="text-blue-500 text-sm underline"
                >
                  Update
                </Link>
              </div>
            </div>
              )}
        </div>

        {/*  */}
        <div className="flex-1 bg-white rounded-lg p-2 h-[145px]">
          <div className="flex flex-row justify-between items-center">
            <p className="font-bold">Appointments</p>
            <Button
              className="text-slate-500 shadow-none"
              variant={"outline"}
              size={"sm"}
            >
              View More
              <ArrowRight size={18} className="ml-1" />
            </Button>
          </div>
          {priorityAppointment?.length > 0
            ? (
            <>
              {priorityAppointment.map((item: any) => (
                <div
                  key={item.id}
                  className="flex flex-row justify-between items-center p-1 text-slate-500 text-sm"
                >
                  <p>{item.AppointmentAgenda?.agendaDescription} </p>
                  <p>{calculateTimeDuration(item?.appointmentDate)} </p>
                </div>
              ))}
            </>
              )
            : (
            <div>No Priority Appointments</div>
              )}
        </div>
      </div>
      <div className="flex p-4 bg-white">
        <div className="w-1/2">
          <WeightHeightLineChart patientID={patientID} />
        </div>
        <div>Line Cart for VL</div>
      </div>
    </div>
  )
}

export default PatientDetails
