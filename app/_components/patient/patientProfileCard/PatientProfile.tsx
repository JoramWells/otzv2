import React from 'react'
import PatientProfileCard from './PatientProfileCard'
import Settings from '@/app/_components/patient/settings/Settings'

interface InputProps {
  patientID: string
}

const PatientProfile = ({ patientID }: InputProps) => {
  return (
    <div
    className='w-full flex flex-row space-x-4'
    >
        <PatientProfileCard patientID={patientID} userData={{}} />
    <Settings
    patientID={patientID}
    />

    </div>
  )
}

export default PatientProfile
