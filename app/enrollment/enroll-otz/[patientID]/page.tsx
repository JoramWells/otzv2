/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useCallback, useState } from 'react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../_components/forms/CustomInput'
import { Button } from '@chakra-ui/react'
import { useAddOTZEnrollmentMutation } from '@/api/enrollment/otzEnrollment.api'
import { useGetAllArtRegimenQuery } from '@/api/art/artRegimen.api.'
import CustomSelect from '@/app/_components/forms/CustomSelect'
import { useGetAllArtRegimenPhaseQuery } from '@/api/art/artRegimenPhase.api'
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
    <div className="w-full flex flex-row justify-center p-3">
      <div
        className="border border-gray-200
        w-1/3 flex flex-col items-center
      justify-center rounded-lg p-5 gap-y-4 mt-12"
        style={{
          width: '40%'
        }}
      >
        <div className="w-full">
          <p className="text-xl ">Enrollment Status</p>
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
          type='date'
        />

        <CustomInput
          label="VL Done Within 12 Months(Yes/No)"
          value={isVLValid}
          onChange={setIsVLValid}
        />

        <CustomSelect
        label='Most Current ART Regimen'
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
          type='date'
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
        <Button
          w="full"
          colorScheme="teal"
          isLoading={isLoading}
          onClick={() => addOTZEnrollment(inputValues)}
        >
          Enroll
        </Button>
      </div>
    </div>
  )
}

export default OTZEnrollment
