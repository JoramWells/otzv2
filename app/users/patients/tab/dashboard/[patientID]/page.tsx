/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable multiline-ternary */
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
import { Button } from '@/components/ui/button'
import { secondaryColor } from '@/constants/color'
import { ArrowRight, InfoIcon, Loader2, MapPinOff } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useGetTimeAndWorkByPatientIDQuery } from '@/api/treatmentplan/timeAndWork.api'
import { useGetPrescriptionDetailQuery } from '@/api/pillbox/prescription.api'
import WeightHeightLineChart from '@/app/_components/charts/WeightHeightLineChart'
import { useSession } from 'next-auth/react'
import VLCard from './_components/VLCard'
import BloodPressureCard from './_components/BloodPressureCard'
import BodyMassIndex from './_components/BodyMassIndex'
import { useGetPatientQuery } from '@/api/patient/patients.api'
import { PatientProfileDropdown } from '../../../_components/PatientProfileDropdown'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetUserLocationQuery } from '@/api/location/userLocation.api'
import MapComponent2 from '@/app/_components/map/MapComponent2'
import { useToast } from '@/components/ui/use-toast'
import ArtCard from './_components/ArtCard'
import { useGetPatientSessionLogQuery } from '@/api/patient/patientSessionLogs.api'
import PatientSessionLogsChart from '@/components/Recharts/PatientSessionLogsChart'

export interface InputTabProps {
  id: number
  params?: string
}

const PatientDetails = ({ params }: any) => {
  const [userID, setUserID] = useState<string>()
  const { patientID } = params
  const { data } = useGetViralLoadTestQuery(patientID)
  const { data: session } = useSession()
  const { data: patientData, isLoading: isLoadingPatientData, isError } = useGetPatientQuery(patientID as string)
  const { data: userLocationData, isLoading: isLoadingUserLocationData, isError: isErrorUserLocation } = useGetUserLocationQuery(patientID)
  const { data: timeData } = useGetTimeAndWorkByPatientIDQuery(patientID)
  const [addPatientVisit, { isLoading, data: visitData }] = useAddPatientVisitMutation()
  const { data: sessionData } = useGetPatientSessionLogQuery(patientID)
  const { data: priorityAppointment } = useGetPriorityAppointmentDetailQuery(patientID)

  const { data: prescriptionData } = useGetArtPrescriptionQuery(patientID)

  const { data: artPrescription } = useGetPrescriptionDetailQuery(patientID)
  const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral>()

  useEffect(() => {
    if (userLocationData) {
      setCurrentPosition({
        lat: parseInt(userLocationData?.latitude),
        lng: parseInt(userLocationData?.longitude)
      })
    }
  }, [userLocationData])

  const { toast } = useToast()

  const send = useCallback(
    () =>
      toast({
        // variant:'success',
        title: "Completed",
        description: "New Patient Visit Created Successfully"
        // action: <ToastAction altText="Saved">Undo</ToastAction>
      }),
    [toast]
  )

  const handleStartVisit = async () => {
    const newVisitID = uuidv4()
    const inputValues = {
      patientID,
      userID,
      id: newVisitID
    }
    await addPatientVisit(inputValues)
  }

  const { data: vsData } = useGetVitalSignByPatientIDQuery(patientID)

  useEffect(() => {
    if (session) {
      const { user } = session
      setUserID(user?.id)
    }

    if (visitData) {
      send()
      redirect(
        `/users/patients/tab/steps/${patientID}?appointmentID=${visitData.id}`
      )
    }
  }, [visitData, patientID, vsData, session, send])

  // console.log(sessionData, "sessionDa")

  return (
    <div>
      <div className="p-2 w-full justify-between flex items-center bg-white">
        <div className="z-20">
          {isLoadingPatientData ? (
            <Skeleton className="w-[100px] h-8" />
          ) : isError ? (
            <div>error...</div>
          ) : (
            <PatientProfileDropdown
              cccNo={patientData?.cccNo}
              dob={patientData?.dob}
              firstName={patientData?.firstName}
              middleName={patientData?.middleName}
              phoneNo={patientData?.phoneNo}
            />
          )}
        </div>
        {/*  */}
        <div className="flex items-center space-x-2">
          {/* <div className="flex space-x-2 items-center">
            <p>Time</p>
            <div className="flex flex-col space-y-1">
              <div className="text-[14px] ">Morning</div>
              <div className="text-[14px] ">Evening</div>
            </div>
          </div> */}
          {/*  */}
          <div className="flex items-center bg-teal-600 rounded-lg">
            <Button
              disabled={isLoading}
              onClick={async () => {
                await handleStartVisit()
              }}
              className="shadow-none bg-teal-600 hover:bg-teal-700 font-bold flex items-center justify-center"
              size={"sm"}
            >
              {isLoading && (
                <Loader2 className="mr-2 animate-spin" size={16} />
              )}
                <>
                  New Visit
                  <ArrowRight size={16} className="ml-2" />
                </>

            </Button>
            {/* <StartVisitDropdown
              appointmentList={priorityAppointment}
              patientID={patientID}
            /> */}
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-4 p-2 md:grid-cols-2">
        {data && (
          <BodyMassIndex
            createdAt={vsData?.createdAt}
            height={vsData?.height}
            weight={vsData?.weight}
          />
        )}

        {data ? (
          <VLCard dateOfVL={data?.dateOfVl} vlResults={data?.vlResults} />
        ) : (
          <div
            className={`bg-[${secondaryColor}] p-2 rounded-lg 
            flex flex-row h-[100px] space-x-4 flex-1`}
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

        {vsData ? (
          <BloodPressureCard
            createdAt={vsData?.createdAt}
            systolic={vsData?.systolic}
            diastolic={vsData?.diastolic}
          />
        ) : (
          <div
            className={`bg-[${secondaryColor}] p-2 rounded-lg flex flex-row h-[100px] space-x-4 flex-1`}
          >
            <InfoIcon className="text-slate-500" size={18} />
            <div>
              <p className="text-slate-500 text-[14px] ">
                No Recent Vital Signs Record
              </p>
              <Link href={"update"} className="text-blue-500 text-sm underline">
                Update
              </Link>
            </div>
          </div>
        )}

        {/*  */}
        {/* <div className="flex-1 rounded-lg overflow-y-auto "> */}
        {prescriptionData ? (
          <ArtCard
            artPrescription={artPrescription}
            regimen={prescriptionData?.regimen}
          />
        ) : (
          <div
            className={`bg-[${secondaryColor}] p-2 rounded-lg flex flex-row h-[100px] space-x-4 flex-1`}
          >
            <InfoIcon className="text-slate-500" size={18} />
            <div>
              <p className="text-slate-500 text-[14px] ">No Medication</p>
              <Link href={"update"} className="text-blue-500 text-sm underline">
                Update
              </Link>
            </div>
          </div>
        )}
        {/* </div> */}
      </div>
      <div className="flex space-x-2 w-full p-2 pt-0">
        <div className="w-1/2 h-[300px] bg-white p-2 rounded-lg">
          <WeightHeightLineChart patientID={patientID} />
        </div>
        <div className='bg-white flex justify-center items-center p-2'>
          {isLoadingUserLocationData ? (
            <Skeleton className="w-[350px] h-[200px]" />
          ) : isErrorUserLocation ? (
            <div>error...</div>
          ) : currentPosition ? (
            <MapComponent2 center={currentPosition} />
          ) : (
            <div>
              <MapPinOff />
            </div>
          )}
        </div>
      </div>

      <div>
        <PatientSessionLogsChart
        data={sessionData || []}
        />
      </div>
    </div>
  )
}

export default PatientDetails
