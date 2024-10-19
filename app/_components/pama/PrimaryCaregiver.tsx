/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useCallback, useState } from 'react'
// import { Button } from '@chakra-ui/react'
import CustomSelect from '@/components/forms/CustomSelect'
import Select from 'react-select'
import { useGetAllPatientsQuery } from '../../../api/patient/patients.api'
import axios from 'axios'
import { type MomentInput } from 'moment'
import { Info } from 'lucide-react'
import ViralLoadStatusComponent from './ViralLoadStatusComponent'
import ArtRegimenPrescriptionStatusComponent from './ArtRegimenPrescriptionStatusComponent'
import { type PrescriptionInterface } from 'otz-types'
// import { useRouter } from 'next/router'

interface InputProps {
  id: string
  label: string
}

export interface VLDataProps {
  id: string
  vlResults: string
  dateOfVL: MomentInput
  isVLValid: boolean
}

const getArtPrescription = async (id: string): Promise<[PrescriptionInterface, VLDataProps]> => {
  const prescriptionResponse = await axios.get<PrescriptionInterface>(`${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/prescription/detail/${id}`)
  const vlResponse = await axios.get<VLDataProps>(`${process.env.NEXT_PUBLIC_API_URL}/api/lab/viral-load-tests/detail/${id}`)
  return [prescriptionResponse.data, vlResponse.data]
}

export interface PrimaryCaregiverProps {
  setPrimaryCaregiverID: (val: string) => void
  setPrimaryCaregiverVLStatus: (val: VLDataProps) => void
  setPrimaryCaregiverPrescriptionStatus: (val: PrescriptionInterface) => void
}

const PrimaryCareGiver = ({
  setPrimaryCaregiverID,
  setPrimaryCaregiverPrescriptionStatus,
  setPrimaryCaregiverVLStatus
}: PrimaryCaregiverProps) => {
  // const router = useRouter()
  // const patientID = params.patientID

  const { data: caregiverData } = useGetAllPatientsQuery()
  // const { data: artPrescriptionData } = useGetArtPrescriptionQuery(patientID)

  const [currentRegimenLine, setCurrentRegimenLine] = useState('')
  const [caregiverID, setCaregiverID] = useState<InputProps | null>(null)
  const [prescriptionData, setPrescriptionData] =
    useState<PrescriptionInterface | undefined>()
  const [vlData, setVLData] = useState<VLDataProps | null>(null)

  const handleChange = useCallback(
    async (val: InputProps) => {
      setCaregiverID(val)
      setPrimaryCaregiverID(val.id)
      const [prescription, vl] = await getArtPrescription(val.id)
      setPrimaryCaregiverPrescriptionStatus(prescription)
      setPrescriptionData(prescription)
      setVLData(vl)
      setPrimaryCaregiverVLStatus(vl)
    },
    [
      setPrimaryCaregiverID,
      setPrimaryCaregiverPrescriptionStatus,
      setPrimaryCaregiverVLStatus
    ]
  )

  // const { data: lineData } = useGetAllArtRegimenPhaseQuery()

  const caregiverOptions = useCallback(() => {
    return caregiverData?.map((item: any) => ({
      id: item.id,
      label: `${item.firstName} ${item.middleName}`
    }))
  }, [caregiverData])

  return (
    <div
      className="bg-white w-full flex flex-col items-center
      justify-center rounded-lg p-5 gap-y-6"
    >
      <div className="w-full flex flex-col space-y-2">
        <div>
          <h1>Search Caregiver</h1>
          <div className="text-slate-500 flex flex-row space-x-2 items-center">
            <Info size={15} />
            <p className="text-slate-500 text-[14px] ">
              The patient need to be registered as in order to be a caregiver
            </p>
          </div>
        </div>
        <Select
          value={caregiverID}
          onChange={(val) => handleChange(val as unknown as InputProps)}
          options={caregiverOptions()}
        />
      </div>

      <ViralLoadStatusComponent viralLoadData={vlData} />

      <ArtRegimenPrescriptionStatusComponent
        artPrescriptionData={prescriptionData}
        regimen=''
      />

      <CustomSelect
        label="PAMA Status"
        value={currentRegimenLine}
        onChange={setCurrentRegimenLine}
        data={[]}
      />
    </div>
  )
}

export default PrimaryCareGiver
