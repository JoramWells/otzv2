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
  Loader2,
  RefreshCcw,
  TabletsIcon
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { useGetAllAppointmentAgendaQuery } from '@/api/appointment/appointmentAgenda.api'
import { useGetAllAppointmentStatusQuery } from '@/api/appointment/appointmentStatus.api'
import { useGetAllUsersQuery } from '@/api/users/users.api'
import { useAddPrescriptionMutation, useGetPrescriptionDetailQuery } from '@/api/pillbox/prescription.api'
import { Badge } from '@/components/ui/badge'
import RecentPrescriptionCard from './ART/RecentPrescriptionCard'
import PrescribeCard from './ART/PrescribeCard'
import { type PrescriptionInterface } from 'otz-types'
import InitiateART from './ART/InitiateART'
import SwitchART from './ART/SwitchART'

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
  const [refillDate, setRefillDate] = useState<string>('')

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
    ) || []
  }, [agendaData])

  const statusOptions = useCallback(() => {
    return statusData?.filter(
      (item: any) => item.statusDescription.toLowerCase() === 'upcoming'
    ) || []
  }, [statusData])
  const prescriptionInputValues = {
    patientID,
    frequency,
    noOfPill,
    computedNoOfPills: noOfPill,
    artPrescriptionID: recentPrescriptionData?.id,
    refillDate,
    userID: userData?.[0].id,
    patientVisitID: appointmentID,
    appointmentAgendaID: agendaDataOptions?.()[0]?.id,
    appointmentStatusID: statusOptions?.()[0]?.id
  }

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

  async function handleSavePrescription () {
    return await addArtPrescription(prescriptionInputValues)
  }

  const inputValues = {
    patientID,
    regimen: artRegimen,
    patientVisitID: appointmentID,
    line: regimenLine,
    startDate,
    isStandard: isStandardRegimen
  }

  const [tab, setTab] = useState(1)

  return (
    <div className="flex items-start space-x-4 w-full">
      <div className="w-3/4 flex flex-col justify-between items-center bg-white">
        <div className="flex justify-between items-center w-full border-b border-slate-200 pr-4 p-2 bg-slate-200 rounded-t-lg">
          <p className="text-lg  font-bold">ART Details</p>
          <div className="flex space-x-2 items-center">
            <Badge className="shadow-none"> {prescriptionData?.regimen} </Badge>
            {/* <p className="capitalize text-slate-500 text-[12px]">
            {prescriptionData?.line}
          </p> */}
          </div>
        </div>
        {prescriptionData || addPrescriptionData ? (
          <div className="rounded-lg flex flex-col justify-between items-center w-full p-4">
            {/* <p>{prescriptionData?.regimen}</p> */}
            <div className="w-full flex flex-col space-y-2">
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
                />
              )}
              {tab === 2 && (
                <SwitchART
                  regimenOptions={regimenOptions()}
                  reasonOptions={reasonOptions}
                />
              )}
            </div>
            {/*  */}
            <div className="flex justify-end mt-4 space-x-4 w-full">
              <Button
                onClick={() => {
                  handleBack()
                }}
                className="bg-slate-200 shadow-none text-black hover:bg-slate-100"
              >
                Prev
              </Button>
              {prescriptionData || addPrescriptionData ? (
                <Button
                  className="bg-slate-200 shadow-none hover:bg-slate-100 text-black"
                  onClick={() => {
                    handleNext()
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  className="bg-slate-200 shadow-none hover:bg-slate-100 text-black"
                  onClick={async () => await addArtPrescription(inputValues)}
                >
                  {isLoading && (
                    <Loader2 className="animate-spin mr-2" size={18} />
                  )}
                  Save
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div
            // label={<Plus className="text-slate-500" size={18} />}
            className="w-full"
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
            <div className="flex justify-end mt-4 space-x-4 p-4">
              <Button
                onClick={() => {
                  handleBack()
                }}
                className="bg-slate-200 shadow-none text-black hover:bg-slate-100"
              >
                Prev
              </Button>
              {prescriptionData || addPrescriptionData ? (
                <Button
                  className="bg-slate-200 shadow-none hover:bg-slate-100 text-black"
                  onClick={() => {
                    handleNext()
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  className="bg-slate-200 shadow-none hover:bg-slate-100 text-black"
                  onClick={async () => await addArtPrescription(inputValues)}
                >
                  {isLoading && (
                    <Loader2 className="animate-spin mr-2" size={18} />
                  )}
                  Save
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      {/*  */}
      <RecentPrescriptionCard
        data={prescriptionDatam}
        isLoading={isLoadingPrescription}
        isError={isErrorPrescription}
      />
    </div>
  )
}

export default AddART
