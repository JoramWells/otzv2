'use client'
import { useGetAllArtRegimenPhaseQuery } from '@/api/art/artRegimenPhase.api'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../forms/CustomInput'
import CustomSelect from '../../forms/CustomSelect'
import { useCallback } from 'react'

export interface ARTProps {
  artName: string
  dateIssued: string
  currentRegimeLine: string
  setArtName: (art: string) => void
  setDateIssued: (art: string) => void
  setCurrentRegimenLine: (art: string) => void
}

interface PhaseProps {
  id: string
  artPhaseDescription: string
}

const ArtDetails = ({
  artName, dateIssued, currentRegimeLine,
  setArtName, setDateIssued, setCurrentRegimenLine
}: ARTProps) => {
  const { data: phaseData } = useGetAllArtRegimenPhaseQuery()
  const phaseOptions = useCallback(() => {
    return phaseData?.map((item: PhaseProps) => ({
      id: item.id,
      label: item.artPhaseDescription
    }))
  }, [phaseData])
  return (
    <div
      className="border border-gray-200
        w-1/3 flex flex-col items-center
      justify-center rounded-lg p-5 gap-y-4 mt-2"
      style={{
        width: '100%'
      }}
    >
      <CustomInput
        label="Current ART Regimen"
        value={artName}
        onChange={setArtName}
      />
      <CustomInput
        label="Date Issued"
        value={dateIssued}
        onChange={setDateIssued}
      />
      <CustomSelect
        label="Current Regimen Line"
        value={currentRegimeLine}
        data={phaseOptions()}
        onChange={setCurrentRegimenLine}
      />
    </div>
  )
}

export default ArtDetails
