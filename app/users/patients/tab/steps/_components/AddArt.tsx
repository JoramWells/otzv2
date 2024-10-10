/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  useAddArtPrescriptionMutation,
  useGetArtPrescriptionQuery
} from '@/api/art/artPrescription.api'
import { useGetAllArtRegimenQuery } from '@/api/art/artRegimen.api.'
import { Button } from '@/components/ui/button'
import {
  ChevronsLeft,
  ChevronsRight,
  Loader2,
  RefreshCcw,
  TabletsIcon
} from 'lucide-react'
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { useAddPrescriptionMutation, useGetPrescriptionDetailQuery, useGetPrescriptionQuery } from '@/api/pillbox/prescription.api'
import { Badge } from '@/components/ui/badge'
import RecentPrescriptionCard from './ART/RecentPrescriptionCard'
import PrescribeCard from './ART/PrescribeCard'
import { type PrescriptionInterface } from 'otz-types'
import InitiateART from './ART/InitiateART'
import SwitchART from './ART/SwitchART'
import { Skeleton } from '@/components/ui/skeleton'
import CardHeader from './CardHeader'
import { useToast } from '@/components/ui/use-toast'

const reasonOptions = [
  {
    id: 'Toxicity/SideEffects',
    label: 'Toxicity/Side Effects',
    reasonID: 'Substitution'
  },
  {
    id: 'New Drug Available',
    label: 'New Drug Available',
    reasonID: 'Substitution'
  },
  {
    id: 'Drugs Out of Stock',
    label: 'Drugs Out of Stock',
    reasonID: 'Substitution'
  },
  {
    id: 'Clinical Treatment Failure',
    label: 'Clinical Treatment Failure',
    reasonID: 'SWitch'
  },
  {
    id: 'Immunological Failure',
    label: 'Immunological Failure',
    reasonID: 'SWitch'
  },
  {
    id: 'Virological Failure',
    label: 'Virological Failure',
    reasonID: 'SWitch'
  }
]

const dataList = [
  {
    id: 1,
    label: 'Prescribe',
    icon: <TabletsIcon className="mr-2" size={18} />,
    color: 'blue'
  },
  // {
  //   id: 2,
  //   label: 'Stop',
  //   icon: <StopCircle className="mr-2" size={18} />,
  //   color: 'red'
  // },
  {
    id: 2,
    label: 'Switch',
    icon: <RefreshCcw className="mr-2" size={18} />,
    color: 'teal'
  }
]

interface AddArtProps {
  handleNext: () => void
  handleBack: () => void
  patientID: string
}

const AddART = ({ patientID, handleBack, handleNext }: AddArtProps) => {
  const [noOfPill, setNoOfPills] = useState<string>('')
  const [frequency, setFrequency] = useState<string>('')
  const [refillDate, setRefillDate] = useState<string>(new Date().toISOString().split('T')[0])

  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('appointmentID')
  const { data: prescriptionData } = useGetArtPrescriptionQuery(patientID)
  const { data: agendaData } = useGetAllAppointmentAgendaQuery()
  const { data: statusData } = useGetAllAppointmentStatusQuery()
  const { data: userData } = useGetAllUsersQuery()
  const [recentPrescriptionData, setRecentPrescriptionData] = useState<PrescriptionInterface>()

  const [
    addPrescription,
    { isLoading: prescriptionSaveLoading, data: addPillPrescriptionData }
  ] = useAddPrescriptionMutation()

  useEffect(() => {
    if (prescriptionData) {
      setRecentPrescriptionData(prescriptionData)
    }
    if (addPillPrescriptionData) {
      setRecentPrescriptionData(addPillPrescriptionData)
    }
  }, [prescriptionData, addPillPrescriptionData])

  const agendaDataOptions = useCallback(() => {
    return agendaData?.filter(
      (item: any) => item.agendaDescription.toLowerCase() === 'refill'
    ) ?? []
  }, [agendaData])

  const statusOptions = useCallback(() => {
    return statusData?.filter(
      (item: any) => item.statusDescription.toLowerCase() === 'upcoming'
    ) || []
  }, [statusData])

  useEffect(() => {
    if (addPillPrescriptionData) {
      handleNext()
    }
  }, [addPillPrescriptionData, handleNext])

  const [startDate, setStartDate] = useState('')

  const { data } = useGetAllArtRegimenQuery()
  const [regimenLine, setRegimenLine] = useState('first line')
  const [isStandardRegimen, setIsStandardRegimen] = useState(true)
  const [isNonStandardRegimen, setIsNonStandardRegimen] = useState(false)
  const [artRegimen, setArtRegimen] = useState('')
  const [nonStandardArtRegimen, setNonStandardArtRegimen] = useState('')
  const regimenOptions = useCallback(() => {
    const tempData = data?.filter((item: any) =>
      item.ArtCategory.artPhase
        .toString()
        .toLowerCase()
        .includes(regimenLine.toLowerCase())
    )

    return tempData?.map((item: any) => ({
      id: item.artName,
      label: item.artName
    }))
  }, [data, regimenLine])

  const [addArtPrescription, { isLoading, data: addPrescriptionData }] = useAddArtPrescriptionMutation()

  const { data: prescriptionDatam, isLoading: isLoadingPrescription, isError: isErrorPrescription } = useGetPrescriptionDetailQuery(patientID)

  const { data: currentPrescriptionData } = useGetPrescriptionQuery(appointmentID)

  async function handleSavePrescription () {
    return await addPrescription(prescriptionInputValues)
  }

  const { toast } = useToast()

  // Toast method
  const send = useCallback(
    () =>
      toast({
        // variant:'success',
        title: 'Completed',
        description: 'New Medicine Added Successfully!!'
        // action: <ToastAction altText="Saved">Undo</ToastAction>
      }),
    [toast]
  )

  const inputValues = {
    patientID,
    regimen: artRegimen,
    patientVisitID: appointmentID,
    line: regimenLine,
    startDate,
    isStandard: isStandardRegimen
  }

  const [tab, setTab] = useState(1)

  useEffect(() => {
    if (addPrescriptionData) {
      send()
    }
    // handleNext()
  }, [addPrescriptionData, send])

  const prescriptionInputValues = useMemo(
    () => [
      {
        patientID,
        frequency,
        noOfPill,
        computedNoOfPills: noOfPill,
        artPrescriptionID: addPrescriptionData?.id
          ? addPrescriptionData?.id
          : recentPrescriptionData?.id,
        refillDate,
        userID: userData?.[0].id,
        patientVisitID: appointmentID,
        appointmentAgendaID: agendaDataOptions?.()[0]?.id,
        appointmentStatusID: statusOptions?.()[0]?.id
      }
    ],
    [addPrescriptionData?.id, agendaDataOptions, appointmentID, frequency, noOfPill, patientID, recentPrescriptionData?.id, refillDate, statusOptions, userData]
  )[0]

  console.log(addPrescriptionData, 'prescriptionInputValues')

  return (
    <>
      <Suspense fallback={<Skeleton className="w-3/4 h-[400px] " />}>
        <div
          className="w-3/4 flex flex-col justify-between items-center bg-white
      border rounded-lg border-slate-200
      "
        >
          <CardHeader
            header="Medicine Prescription"
            rightContent={
              prescriptionData?.regimen && (
                <Badge className="shadow-none">
                  <p
                  className='text-[12px]'
                  >{prescriptionData?.regimen}</p>
                </Badge>
              )
            }
          />

          {prescriptionData || addPrescriptionData ? (
            <div className="rounded-lg flex flex-col justify-between items-center w-full p-4">
              {/* <p>{prescriptionData?.regimen}</p> */}
              <div className="w-full flex flex-col space-y-2 relative pb-[60px] ">
                <div className="flex flex-row space-x-4">
                  {dataList.map((item) => (
                    <Button
                      onClick={() => {
                        setTab(item.id)
                      }}
                      key={item.id}
                      className={`bg-white shadow-none  text-slate-500 border border-slate-200 hover:bg-slate-100  ${
                        item.id === tab && 'bg-slate-50 text-black'
                      }`}
                      size={'sm'}
                    >
                      {item.icon}
                      {item.label}
                    </Button>
                  ))}
                </div>

                {tab === 1 && (
                  <PrescribeCard
                    noOfPill={noOfPill}
                    setNoOfPills={setNoOfPills}
                    frequency={frequency}
                    setFrequency={setFrequency}
                    refillDate={refillDate}
                    isLoadingSave={isLoading}
                    setRefillDate={setRefillDate}
                    savePrescription={handleSavePrescription}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    prescriptionData={currentPrescriptionData}
                    addPrescriptionData={addPrescriptionData}
                  />
                )}
                {tab === 2 && (
                  <SwitchART
                    regimenOptions={regimenOptions()}
                    reasonOptions={reasonOptions}
                    patientID={patientID}
                  />
                )}
              </div>
            </div>
          ) : (
            <div
              // label={<Plus className="text-slate-500" size={18} />}
              className="w-full p-4"
            >
              {/*  */}

              {/*  */}

              <InitiateART
                art={regimenOptions()}
                artRegimen={artRegimen}
                isNonStandardRegimen={isNonStandardRegimen}
                isStandardRegimen={isStandardRegimen}
                nonStandardArtRegimen={nonStandardArtRegimen}
                regimenLine={regimenLine}
                setArtRegimen={setArtRegimen}
                setIsNonStandardRegimen={setIsNonStandardRegimen}
                setIsStandardRegimen={setIsStandardRegimen}
                setNonStandardArtRegimen={setNonStandardArtRegimen}
                setRegimenLine={setRegimenLine}
                setStartDate={setStartDate}
                startDate={startDate}
              />
              <div className="flex justify-end space-x-4 mt-4">
                <Button
                  onClick={() => {
                    handleBack()
                  }}
                  className="bg-slate-200 shadow-none text-black hover:bg-slate-100"
                  size={'sm'}
                >
                  <ChevronsLeft className="mr-2" size={18} />
                  Prev
                </Button>

                <Button
                  className="bg-teal-600 shadow-none hover:bg-teal-600 text-white"
                  onClick={async () => await addArtPrescription(inputValues)}
                  size={'sm'}
                >
                  {isLoading && (
                    <Loader2 className="animate-spin mr-2" size={18} />
                  )}
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </Suspense>
      {/*  */}
      <RecentPrescriptionCard
        data={prescriptionDatam}
        isLoading={isLoadingPrescription}
        isError={isErrorPrescription}
      />
    </>
  )
}

export default AddART
