'use client'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../_components/forms/CustomInput'
import CustomSelect from '../../forms/CustomSelect'

interface PersonalDetailProps {
  firstName: string
  middleName: string
  lastName: string
  dob: string
  gender: string
  idNo: string
  setFirstName: (val: string) => void
  setMiddleName: (val: string) => void
  setLastName: (val: string) => void
  setDOB: (val: string) => void
  setGender: (val: string) => void
  setIDNo: (val: string) => void
}

const PersonalDetail = ({
  firstName,
  middleName,
  lastName,
  dob,
  gender,
  idNo,
  setFirstName,
  setMiddleName,
  setLastName,
  setDOB, setGender,
  setIDNo
}: PersonalDetailProps) => {
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
        label="First Name"
        value={firstName}
        onChange={setFirstName}
      />
      <CustomInput
        label="Second Name"
        value={middleName}
        onChange={setMiddleName}
      />
      <CustomInput
      label="Last Name"
      value={lastName}
      onChange={setLastName} />
      <CustomInput label="DOB"
      value={dob}
      onChange={setDOB}
      />
      <CustomSelect
      label='Select Gender'
      // data=[]
      value={gender}
      onChange={e => { setGender(e.target.value) }}
      />
      {/* <CustomInput label="Select Gender"
      value={gender}
      onChange={setGender}
      /> */}
      <CustomInput label="ID No."
      value={idNo}
      onChange={setIDNo}
      />
    </div>
  )
}

export default PersonalDetail
