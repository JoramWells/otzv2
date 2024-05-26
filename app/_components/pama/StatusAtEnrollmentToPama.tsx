/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useEffect } from 'react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../components/forms/CustomInput'
import { useGetViralLoadTestQuery } from '@/api/enrollment/viralLoadTests.api'
import { useGetPrescriptionQuery } from '@/api/pillbox/prescription.api'
import { type PrescriptionProps, type VLDataProps } from './PrimaryCaregiver'
import ViralLoadStatusComponent from './ViralLoadStatusComponent'
import ArtRegimenPrescriptionStatusComponent from './ArtRegimenPrescriptionStatusComponent'
// import { useRouter } from 'next/router'

export interface StatusAtEnrollmentToPAMAProps {
  patientID: string
  dateOfEnrollmentToOTZ: string
  setDateOfEnrollmentToOTZ: (val: string) => void
  setChildVLStatus: (val: VLDataProps) => void
  setChildPrescriptionStatus: (val: PrescriptionProps) => void
}

const StatusAtEnrollmentToPAMA = ({ patientID, dateOfEnrollmentToOTZ, setChildVLStatus, setChildPrescriptionStatus, setDateOfEnrollmentToOTZ }: StatusAtEnrollmentToPAMAProps) => {
  // const router = useRouter()
  // const patientID = params.patientID

  const { data: vlData } = useGetViralLoadTestQuery(patientID)
  const { data: prescriptionData } = useGetPrescriptionQuery(patientID)

  useEffect(() => {
    if (vlData) {
      setChildVLStatus({
        id: vlData.id,
        vlResults: vlData.vlResults,
        dateOfVL: vlData.dateOfVL,
        isVLValid: vlData.isVLValid
      })
    }

    if (prescriptionData) {
      setChildPrescriptionStatus({
        id: prescriptionData.id,
        refillDate: prescriptionData.refillDate,
        ART: {
          artName: prescriptionData.artName
        }
      })
    }
  }, [vlData, prescriptionData, setChildPrescriptionStatus, setChildVLStatus])

  console.log(prescriptionData, 'pData')

  return (
    <div
      className="w-full flex flex-col space-y-4
      justify-center p-4"
    >
      <h1 className="">Status at Enrollment</h1>

      {/*  */}
      <ViralLoadStatusComponent viralLoadData={vlData} />
      <ArtRegimenPrescriptionStatusComponent artPrescriptionData={prescriptionData} />

      <CustomInput
        label="Select Date of Enrollment"
        type="date"
        value={dateOfEnrollmentToOTZ}
        onChange={setDateOfEnrollmentToOTZ}
      />
    </div>
  )
}

export default StatusAtEnrollmentToPAMA
