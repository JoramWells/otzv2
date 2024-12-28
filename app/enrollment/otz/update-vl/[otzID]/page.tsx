/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useState } from 'react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../../../components/forms/CustomInput'
import { Button } from '@chakra-ui/react'
import { useAddViralLoadTestMutation } from '@/api/lab/viralLoadTests.api'
// import { useRouter } from 'next/router'

const OTZEnrollment = ({ params }: any) => {
  // const router = useRouter()
  const patientID = params.otzID

  const [dateOfVL, setDateOfVL] = useState('')
  const [vlCopies, setVLCopies] = useState('')
  const [addViralLoadTest, { isLoading }] = useAddViralLoadTestMutation()

  const inputValues = {
    patientID,
    vlCopies,
    dateOfVL
  }

  return (
    <div className="w-full flex flex-row justify-center p-3">
      <div
        className="border border-gray-200
        w-1/3 flex flex-col items-center
      justify-center rounded-lg p-5 gap-y-6 mt-12"
        style={{
          width: '40%'
        }}
      >
        <div className="w-full">
          <p className="text-xl ">Update VL</p>
        </div>
        <CustomInput
          label="VL Results (Copies/ml)"
          value={vlCopies}
          onChange={setVLCopies}
        />
        <CustomInput
          label="Date of Enrollment"
          type="date"
          value={dateOfVL}
          onChange={setDateOfVL}
        />

        <Button
          w="full"
          colorScheme="teal"
          isLoading={isLoading}
          onClick={() => addViralLoadTest(inputValues)}
        >
          Update Viral Load
        </Button>
      </div>
    </div>
  )
}

export default OTZEnrollment
