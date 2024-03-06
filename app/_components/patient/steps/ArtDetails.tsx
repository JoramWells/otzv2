'use client'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../forms/CustomInput'

export interface ARTProps {
  artName: string
  dateIssued: string
  currentRegimeLine: string
  setArtName: (art: string) => void
  setDateIssued: (art: string) => void
  setCurrentRegimenLine: (art: string) => void
}

const ArtDetails = ({
  artName, dateIssued, currentRegimeLine,
  setArtName, setDateIssued, setCurrentRegimenLine
}: ARTProps) => {
  return (
    <div
      className="border border-gray-200
        w-1/3 flex flex-col items-center
      justify-center rounded-lg p-5 gap-y-4 mt-2"
      style={{
        width: '100%'
      }}
    >
      <CustomInput label="Current ART Regimen"
      value={artName}
      onChange={setArtName}
      />
      <CustomInput label="Date Issued"
      value={dateIssued}
      onChange={setDateIssued}
      />
      <CustomInput label="Current Regimen Line"
      value={currentRegimeLine}
      onChange={setCurrentRegimenLine}
      />
    </div>
  )
}

export default ArtDetails
