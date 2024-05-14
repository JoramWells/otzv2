/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useCallback, useState } from 'react'
// import { Button } from '@chakra-ui/react'
import { useAddOTZEnrollmentMutation } from '@/api/enrollment/otzEnrollment.api'
import { useGetAllArtRegimenQuery } from '@/api/art/artRegimen.api.'
import CustomSelect from '@/components/forms/CustomSelect'
import CustomInput from '../../../components/forms/CustomInput'
import Select from 'react-select'
import { useGetCaregiverQuery } from '@/api/caregiver/caregiver.api'
// import { useRouter } from 'next/router'

const PrimaryCareGiver = ({ patientID }: { patientID: string }) => {
  // const router = useRouter()
  // const patientID = params.patientID

  const { data: caregiverData } = useGetCaregiverQuery(patientID)

  const [dateOfEnrollmentToOTZ, setDateOfEnrollmentToOTZ] = useState('')
  const [vlCopies, setVLCopies] = useState('')
  const [dateOfVL, setDateOfVL] = useState('')
  const [isVLValid, setIsVLValid] = useState('')
  const [currentARTStartDate, setCurrentARTStartDate] = useState('')
  const [currentARTRegimen, setCurrentARTRegimen] = useState('')
  const [currentRegimenLine, setCurrentRegimenLine] = useState('')

  const { data: artData } = useGetAllArtRegimenQuery()
  // const { data: lineData } = useGetAllArtRegimenPhaseQuery()

  const artOptions = useCallback(() => {
    return artData?.map((item: any) => ({
      id: item.id, label: item.artName
    }))
  }, [artData])

  const caregiverOptions = useCallback(() => {
    return caregiverData?.map((item: any) => ({
      id: item.id,
      label: `${item.firstName} ${item.middleName}`
    }))
  }, [caregiverData])

  const inputValues = {
    // patientID,
    dateOfVL,
    vlCopies,
    dateOfEnrollmentToOTZ,
    isVLValid,
    currentARTStartDate,
    currentARTRegimen,
    currentRegimenLine
  }

  return (
    <div
      className="bg-white w-full flex flex-col items-center mt-2
      justify-center rounded-lg p-5 gap-y-6">

      <div
      className='w-full'
      >
        <p className='text-xl
        font-bold
        '>Search Patient Name</p>
        <p
        className='mb-2 text-slate-500'
        >The patient need to be registered as in order to be a caregiver</p>
        <Select
        options={caregiverOptions()}
        />
      </div>

      <CustomInput
        label="Total Number of caregivers"
        value={dateOfEnrollmentToOTZ}
        onChange={setDateOfEnrollmentToOTZ}
      />
      <CustomInput
        label="VL Results"
        value={isVLValid}
        onChange={setIsVLValid}
      />
      <CustomInput
        label="VL Done Within 6 months"
        value={isVLValid}
        onChange={setIsVLValid}
      />
      <CustomInput
        label="Date Started on Current Regimen"
        value={currentARTStartDate}
        onChange={setCurrentARTStartDate}
        type="date"
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
