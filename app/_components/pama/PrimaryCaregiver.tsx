/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useCallback, useEffect, useState } from 'react'
// import { Button } from '@chakra-ui/react'
import CustomSelect from '@/components/forms/CustomSelect'
import Select from 'react-select'
import { useGetAllPatientsQuery } from '../../../api/patient/patients.api'
import axios from 'axios'
import { Badge } from '@/components/ui/badge'
import moment, { type MomentInput } from 'moment'
// import { useRouter } from 'next/router'

interface InputProps {
  id: string
  label: string
}

interface VLDataProps {
  id: string
  vlResults: string
  dateOfVL: MomentInput
  isVLValid: boolean
}

interface PrescriptionProps {
  id: string
  refillDate: MomentInput
  ART: {
    artName: string
  }
}

const getArtPrescription = async (id: string): Promise<[PrescriptionProps, VLDataProps]> => {
  const prescriptionResponse = await axios.get<PrescriptionProps>(`${process.env.NEXT_PUBLIC_API_URL}/api/pharmacy/prescription/detail/${id}`)
  const vlResponse = await axios.get<VLDataProps>(`${process.env.NEXT_PUBLIC_API_URL}/api/lab/viral-load-tests/detail/${id}`)
  return [prescriptionResponse.data, vlResponse.data]
}

export interface PrimaryCaregiverProps {
  setCaregiverARTStatusID: (val: string) => void
  setCaregiverVLStatusID: (val: string) => void
}

const PrimaryCareGiver = ({
  setCaregiverARTStatusID,
  setCaregiverVLStatusID
}: PrimaryCaregiverProps) => {
  // const router = useRouter()
  // const patientID = params.patientID

  const { data: caregiverData } = useGetAllPatientsQuery()
  // const { data: artPrescriptionData } = useGetArtPrescriptionQuery(patientID)

  const [currentRegimenLine, setCurrentRegimenLine] = useState('')
  const [caregiverID, setCaregiverID] = useState<InputProps | null>(null)
  const [prescriptionData, setPrescriptionData] = useState<PrescriptionProps | null>(null)
  const [vlData, setVLData] = useState<VLDataProps | null>(null)

  const handleChange = useCallback(async (val: InputProps) => {
    setCaregiverID(val)
    const [prescription, vl] = await getArtPrescription(val.id)
    setPrescriptionData(prescription)
    setVLData(vl)
  }, [])

  // const { data: lineData } = useGetAllArtRegimenPhaseQuery()

  const caregiverOptions = useCallback(() => {
    return caregiverData?.map((item: any) => ({
      id: item.id,
      label: `${item.firstName} ${item.middleName}`
    }))
  }, [caregiverData])

  useEffect(() => {
    if (vlData) {
      setCaregiverVLStatusID(vlData?.id)
    }

    if (prescriptionData) {
      setCaregiverARTStatusID(prescriptionData.id)
    }
  }, [vlData, prescriptionData, setCaregiverVLStatusID, setCaregiverARTStatusID])

  return (
    <div
      className="bg-white w-full flex flex-col items-center mt-2
      justify-center rounded-lg p-5 gap-y-6"
    >
      <div className="w-full">
        <p
          className="text-xl
        font-bold
        "
        >
          Search Patient Name
        </p>
        <p className="mb-2 text-slate-500">
          The patient need to be registered as in order to be a caregiver
        </p>
        <Select
          value={caregiverID}
          onChange={(val) => handleChange(val as unknown as InputProps)}
          options={caregiverOptions()}
        />
      </div>

      <div className="p-4 rounded-lg bg-slate-50 w-full">
        <p className="font-semibold ">Current VL Status</p>

        {vlData && (
          <div className="p-2">
            <div className="flex justify-between">
              <p className="text-slate-500 text-[14px] ">VL Results: </p>
              <p className="font-semibold text-slate-700 ">
                {vlData?.vlResults}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-slate-500 text-[14px] ">VL Date:</p>
              <p className="font-semibold text-slate-700">
                {moment(vlData?.dateOfVL, 'YYYY-MM-DD').format('ll')}{' '}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[14px] text-slate-500">Is VL Valid:</p>
              <p>
                {vlData?.isVLValid
                  ? (
                  <Badge className="rounded-full shadow-none bg-emerald-50 text-emerald-500">
                    Valid
                  </Badge>
                    )
                  : (
                  <Badge>Invalid</Badge>
                    )}{' '}
              </p>
            </div>
          </div>
        )}
      </div>

      <div>
        <p className="font-bold text-slate-700">Current regimen Status</p>

        {prescriptionData && (
          <div className="p-2">
            <div className="flex justify-between">
              <p className="text-slate-500 text-[14px] ">Current ART Regimen</p>
              <p className="font-bold text-slate-700">
                {prescriptionData?.ART?.artName}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[14px] text-slate-500 ">Date Issued:</p>
              {moment(prescriptionData?.refillDate, 'YYYY-MM-DD').format('ll')}
            </div>

            <div>
              <p className="text-[14px] text-slate-700 ">
                Current Regimen Line:
              </p>
            </div>
          </div>
        )}
      </div>

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
