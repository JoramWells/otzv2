'use client'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../forms/CustomInput'

export interface LocationDetailsProps {
  phoneNo: string
  occupation: string
  residence: string
  setPhoneNo: (phone: string) => void
  setOccupation: (occupation: string) => void
  setResidence: (residence: string) => void
}

const LocationDetails = ({
  phoneNo, occupation, residence,
  setPhoneNo, setOccupation, setResidence
}: LocationDetailsProps) => {
  return (
    <div
      className="border border-gray-200
        w-1/3 flex flex-col items-center
      justify-center rounded-lg p-5 gap-y-4 mt-2"
      style={{
        width: '100%'
      }}
    >
      <CustomInput label="Phone No."
      value={phoneNo}
      onChange={setPhoneNo}
      />
      <CustomInput label="Select Occupation."
      value={occupation}
      onChange={setOccupation}
      />
      <CustomInput label="Select Residence."
      value={residence}
      onChange={setResidence}
      />
    </div>
  )
}

export default LocationDetails
