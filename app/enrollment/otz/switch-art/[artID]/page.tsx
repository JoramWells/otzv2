/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use client'
import { useCallback, useId, useState } from 'react'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../../../components/forms/CustomInput'
import { Button } from '@chakra-ui/react'
import { useAddViralLoadTestMutation } from '@/api/enrollment/viralLoadTests.api'
import CustomSelect from '@/components/forms/CustomSelect'
import { useGetAllArtSwitchReasonsQuery } from '@/api/art/artSwitchReason.api'
import { useGetAllArtRegimenPhaseQuery } from '@/api/art/artRegimenPhase.api'
import { useGetAllArtRegimenQuery } from '@/api/art/artRegimen.api.'
import { useAddArtRegimenSwitchMutation } from '@/api/art/artRegimenSwitch.api'
// import { useRouter } from 'next/router'

const ARTSwitch = ({ params }: any) => {
  // const router = useRouter()
  const patientID = params.otzID

  const [artID, setArtID] = useState('')
  const [regimenLineID, setRegimenLineID] = useState('')
  const [switchDate, setSwitchDate] = useState('')
  const [switchReasonID, setSwitchReasonID] = useState('')
  const { data: reasonData } = useGetAllArtSwitchReasonsQuery()
  const { data: lineData } = useGetAllArtRegimenPhaseQuery()
  const { data: artData } = useGetAllArtRegimenQuery()

  const reasonOptions = useCallback(() => {
    return reasonData?.map((item: any) => ({
      id: item.id, label: item.reason
    }))
  }, [reasonData])

  const lineOptions = useCallback(() => {
    return lineData?.map((item: any) => ({
      id: item.id,
      label: item.artPhaseDescription
    }))
  }, [lineData])

  const artOptions = useCallback(() => {
    return artData?.map((item: any) => ({
      id: item.id,
      label: item.artName
    }))
  }, [artData])

  const [addArtRegimenSwitch, { isLoading }] = useAddArtRegimenSwitchMutation()

  const inputValues = {
    patientID,
    artID,
    regimenLineID,
    switchDate,
    switchReasonID
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
          label="ART Regimen"
          value={artID}
          onChange={setArtID}
          data={artOptions()}
        />

        <CustomSelect
          label="Regimen Line"
          value={regimenLineID}
          onChange={setRegimenLineID}
          data={lineOptions()}
        />

        <CustomInput
          label="Select Date"
          value={switchDate}
          onChange={setSwitchDate}
          type="date"
        />

        <CustomSelect
          label="Reasons"
          value={switchReasonID}
          onChange={setSwitchReasonID}
          data={reasonOptions()}
        />

        <Button
          w="full"
          colorScheme="teal"
          isLoading={isLoading}
          onClick={() => addArtRegimenSwitch(inputValues)}
        >
          Update Viral Load
        </Button>
      </div>
    </div>
  )
}

export default ARTSwitch
