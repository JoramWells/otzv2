/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useCallback, useState } from 'react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../../../components/forms/CustomInput'
import { useAddOTZEnrollmentMutation } from '@/api/enrollment/otzEnrollment.api'
import { useGetAllArtRegimenQuery } from '@/api/art/artRegimen.api.'
import CustomSelect from '@/components/forms/CustomSelect'
import { useGetAllArtRegimenPhaseQuery } from '@/api/art/artRegimenPhase.api'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
// import { useRouter } from 'next/router'

const OTZEnrollment = ({ params }: any) => {
  // const router = useRouter()
  const patientID = params.patientID

  const [dateOfEnrollmentToOTZ, setDateOfEnrollmentToOTZ] = useState('')
  const [vlCopies, setVLCopies] = useState('')
  const [dateOfVL, setDateOfVL] = useState('')
  const [isVLValid, setIsVLValid] = useState('')
  const [currentARTStartDate, setCurrentARTStartDate] = useState('')
  const [currentARTRegimen, setCurrentARTRegimen] = useState('')
  const [currentRegimenLine, setCurrentRegimenLine] = useState('')

  const { data: artData } = useGetAllArtRegimenQuery()
  const { data: lineData } = useGetAllArtRegimenPhaseQuery()
  const [addOTZEnrollment, { isLoading }] = useAddOTZEnrollmentMutation()

  const artOptions = useCallback(() => {
    return artData?.map((item: any) => ({
      id: item.id, label: item.artName
    }))
  }, [artData])

  const lineOptions = useCallback(() => {
    return lineData?.map((item: any) => ({
      id: item.id,
      label: item.artPhaseDescription
    }))
  }, [lineData])

  const inputValues = {
    patientID,
    dateOfVL,
    vlCopies,
    dateOfEnrollmentToOTZ,
    isVLValid,
    currentARTStartDate,
    currentARTRegimen,
    currentRegimenLine
  }

  return (
    <div className="w-full flex flex-row justify-center p-4">
      <div
        className="w-1/3 flex flex-col items-center
      justify-center rounded-lg  space-y-8 mt-14"
        style={{
          width: '40%'
        }}
      >
        <div className="w-full">
          <p className="text-xl font-bold">Enrollment Status</p>
          <div className='border-b border-slate-200 mt-4' />
        </div>
        <CustomInput
          label="Date of Enrollment"
          type="date"
          value={dateOfEnrollmentToOTZ}
          onChange={setDateOfEnrollmentToOTZ}
        />
        <CustomInput
          label="VL Results (Copies/ml)"
          value={vlCopies}
          onChange={setVLCopies}
        />
        <CustomInput
          label="Date Done"
          value={dateOfVL}
          onChange={setDateOfVL}
          type="date"
        />

        <CustomInput
          label="VL Done Within 12 Months(Yes/No)"
          value={isVLValid}
          onChange={setIsVLValid}
        />

        <CustomSelect
          label="Most Current ART Regimen"
          value={currentARTRegimen}
          onChange={setCurrentARTRegimen}
          data={artOptions()}
        />
        {/* <CustomInput
          label="Most Current ART Regimen"
          value={currentARTRegimen}
          onChange={setCurrentARTRegimen}
        /> */}
        <CustomInput
          label="Date Started on Current Regimen"
          value={currentARTStartDate}
          onChange={setCurrentARTStartDate}
          type="date"
        />

        <CustomSelect
          label="Current Regimen Line"
          value={currentRegimenLine}
          onChange={setCurrentRegimenLine}
          data={lineOptions()}
        />

        {/* <CustomInput label="Select Gender"
      value={gender}
      onChange={setGender}
      /> */}
        <div
        className='w-full flex justify-end'
        >
          <Button
            // w="full"
            // colorScheme="teal"
            // isLoading={isLoading}
            disabled={isLoading}
            onClick={() => addOTZEnrollment(inputValues)}
          >
            {isLoading && <Loader2 className='animate-spin mr-2' size={18} />}
            Enroll
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OTZEnrollment
