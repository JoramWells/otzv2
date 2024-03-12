/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useId, useState } from 'react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../../_components/forms/CustomInput'
import { Button } from '@chakra-ui/react'
import { useAddViralLoadTestMutation } from '@/api/enrollment/viralLoadTests.api'
import CustomSelect from '@/app/_components/forms/CustomSelect'
// import { useRouter } from 'next/router'

const ARTSwitch = ({ params }: any) => {
  // const router = useRouter()
  const patientID = params.otzID

  const [currentRegimen, setCurrentRegimen] = useState('')
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
          <p className="text-xl ">Switch ART Regimen</p>
        </div>

        <CustomSelect
          label="Current Regimen"
          value={currentRegimen}
          onChange={setCurrentRegimen}
          data={[
            {
              id: useId(),
              label: 'art'
            }
          ]}
        />

        <CustomSelect
          label="Current Regimen Regimen Line"
          value={currentRegimen}
          onChange={setCurrentRegimen}
          data={[
            {
              id: useId(),
              label: 'art'
            }
          ]}
        />

        <CustomInput
          label="Select Date"
          value={vlCopies}
          onChange={setVLCopies}
          type='date'
        />

        <CustomSelect
          label="Reasons"
          value={vlCopies}
          onChange={setVLCopies}
          data={[
            {
              id: useId(),
              label: 'Treatment Failure'
            }
          ]}
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

export default ARTSwitch
