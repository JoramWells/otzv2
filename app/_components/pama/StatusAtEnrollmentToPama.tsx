/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useEffect } from 'react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../components/forms/CustomInput'
import { useGetViralLoadTestQuery } from '@/api/lab/viralLoadTests.api'
import { useGetPrescriptionQuery } from '@/api/pillbox/prescription.api'
import { type VLDataProps } from './PrimaryCaregiver'
import ViralLoadStatusComponent from './ViralLoadStatusComponent'
import ArtRegimenPrescriptionStatusComponent from './ArtRegimenPrescriptionStatusComponent'
import { useGetArtPrescriptionQuery } from '@/api/art/artPrescription.api'
import { type PrescriptionInterface } from 'otz-types'
// import { useRouter } from 'next/router'

export interface StatusAtEnrollmentToPAMAProps {
  patientID: string
  dateOfEnrollmentToOTZ: string
  setDateOfEnrollmentToOTZ: (val: string) => void
  setChildVLStatus: (val: VLDataProps) => void
  setChildPrescriptionStatus: (val: PrescriptionInterface) => void
}

const StatusAtEnrollmentToPAMA = ({ patientID, dateOfEnrollmentToOTZ, setChildVLStatus, setChildPrescriptionStatus, setDateOfEnrollmentToOTZ }: StatusAtEnrollmentToPAMAProps) => {
  // const router = useRouter()
  // const patientID = params.patientID

  const { data: vlData } = useGetViralLoadTestQuery(patientID)
  const { data: prescriptionData } = useGetPrescriptionQuery(patientID)
  const { data: artPrescriptionData } = useGetArtPrescriptionQuery(patientID)

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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/non-nullable-type-assertion-style
        id: prescriptionData?.id as string,
        refillDate: prescriptionData.refillDate,
        ART: {
          artName: artPrescriptionData?.regimen
        }
      } as any)
    }
  }, [vlData, prescriptionData, setChildPrescriptionStatus, setChildVLStatus, artPrescriptionData?.regimen])

  console.log(prescriptionData, 'pData')

  return (
    <div
      className="w-full flex flex-col space-y-4
      justify-center p-4"
    >
      <h1 className="">Status at Enrollment</h1>

      {/*  */}
      <ViralLoadStatusComponent viralLoadData={vlData} />
      <ArtRegimenPrescriptionStatusComponent
      regimen={artPrescriptionData?.regimen}
      artPrescriptionData={prescriptionData} />

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
