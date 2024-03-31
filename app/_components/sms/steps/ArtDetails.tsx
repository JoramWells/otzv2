'use client'
import { useGetAllArtRegimenPhaseQuery } from '@/api/art/artRegimenPhase.api'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../forms/CustomInput'
import CustomSelect from '../../forms/CustomSelect'
import { useCallback, useState } from 'react'
import { useGetAllArtRegimenQuery } from '@/api/art/artRegimen.api.'

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
  const { data: artData } = useGetAllArtRegimenQuery()

  const phaseOptions = useCallback(() => {
    return phaseData?.map((item: PhaseProps) => ({
      id: item.id,
      label: item.artPhaseDescription
    }))
  }, [phaseData])

  const artOptions = useCallback(() => {
    return artData?.map((item: any) => ({
      id: item.id,
      label: item.artName
    }))
  }, [artData])

  const clinicOptions = [
    {
      id: '1',
      label: 'Adolescent Clinic'
    },
    {
      id: '2',
      label: 'CCC'
    },
    {
      id: '3',
      label: 'Paeds Clinic'
    },
    {
      id: '4',
      label: 'PMTCT'
    },
    {
      id: '5',
      label: 'TB-HIV'
    }
  ]

  const [clinic, setClinic] = useState('')

  return (
    <div
      className="border border-gray-200
        w-1/3 flex flex-col items-center
      justify-center rounded-lg p-5 gap-y-4 mt-2"
      style={{
        width: '100%'
      }}
    >

      <CustomSelect
      label='Entry Point'
      data={clinicOptions}
      value={clinic}
      onChange={setClinic}
      />

      <CustomSelect
        label="Current ART Regimen"
        value={artName}
        onChange={setArtName}
        data={artOptions()}
      />

      <CustomInput
        label="Date Issued"
        type="date"
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
