/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useEffect } from 'react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../components/forms/CustomInput'
import { useGetViralLoadTestQuery } from '@/api/enrollment/viralLoadTests.api'
import moment from 'moment'
import { Badge } from '@/components/ui/badge'
import { useGetPrescriptionQuery } from '@/api/pillbox/prescription.api'
import { type PrescriptionProps, type VLDataProps } from './PrimaryCaregiver'
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
      className="bg-white w-full flex flex-col items-center mt-2
      justify-center rounded-lg p-5 gap-y-6"
    >
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

        <div>
          <p className="font-bold text-slate-700">Current regimen Status</p>

          {prescriptionData && (
            <div className="p-2">
              <div className="flex justify-between">
                <p className="text-slate-500 text-[14px] ">
                  Current ART Regimen
                </p>
                <p className="font-bold text-slate-700">
                  {prescriptionData?.ART?.artName}
                </p>
              </div>
              <div className='flex justify-between items-center' >
                <p
                className='text-[14px] text-slate-500 '
                >Date Issued:</p>
                {moment(prescriptionData?.refillDate, 'YYYY-MM-DD').format(
                  'll'
                )}
              </div>

              <div>
                <p className="text-[14px] text-slate-700 ">
                  Current Regimen Line:
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <CustomInput
        label="Date of Enrollment"
        type="date"
        value={dateOfEnrollmentToOTZ}
        onChange={setDateOfEnrollmentToOTZ}
      />
    </div>
  )
}

export default StatusAtEnrollmentToPAMA
