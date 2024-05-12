'use client'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { useState } from 'react'

const genderOptions = [
  {
    id: 'MALE',
    label: 'MALE'
  },
  {
    id: 'FEMALE',
    label: 'FEMALE'
  }
]

interface NextOfKinProps {
  firstName: string
  middleName: string
  lastName: string
  dob: string
  gender: string
  idNo: string
  relationship: string
  nextOfKinPhoneNo: string
  setFirstName: (val: string) => void
  setMiddleName: (val: string) => void
  setLastName: (val: string) => void
  setDOB: (val: string) => void
  setGender: (val: string) => void
  setIDNo: (val: string) => void
  setRelationship: (val: string) => void
  setNextOfKinPhoneNo: (val: string) => void
}

const NextOfKin = ({
  firstName,
  middleName,
  lastName,
  dob,
  gender,
  idNo,
  nextOfKinPhoneNo,
  setFirstName,
  setMiddleName,
  setLastName,
  setDOB,
  setGender,
  setIDNo,
  relationship,
  setRelationship,
  setNextOfKinPhoneNo
}: NextOfKinProps) => {
  const [isTeenager, setIsTeenager] = useState<boolean>(false)
  const [isAdult, setIsAdult] = useState<boolean>(false)

  // useEffect(()=>{
  //   const val = calculateAge(dob)
  //   if(val < 18){
  //     setIsTeenager(true)
  //   }else if(val>18){
  //     setIsAdult(true)
  //   }
  // },[val])
  return (
    <div
      className="bg-white  w-1/3 flex flex-col items-center
      justify-center rounded-lg p-5 gap-y-4 mt-2"
      style={{
        width: '100%'
      }}
    >
      <div className="flex flex-row justify-between space-x-4">
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
          onChange={setLastName}
        />
      </div>
      <CustomInput label="DOB" value={dob} onChange={setDOB} type="date" />
      {/* {calculateAge(dob)} */}
      <CustomSelect
        label="Select Gender"
        data={genderOptions}
        value={gender}
        onChange={setGender}
      />
      {/* <CustomInput label="Select Gender"
      value={gender}
      onChange={setGender}
      /> */}
      <div
        className={`border border-slate-200 rounded-lg w-full
      p-2 bg-slate-50 
      `}
      >
        <CustomCheckbox
          label="Birth Certificate"
          description="Recommended for patients who are below 18 years."
          value={isTeenager}
          onChange={setIsTeenager}
        />
        <div className="w-full pl-7 pt-2">
          {isTeenager && (
            <CustomInput
              label="Certificate No."
              value={idNo}
              onChange={setIDNo}
            />
          )}
        </div>
      </div>

      {/*  */}
      <div
        className={`border border-slate-200 rounded-lg w-full
      p-2 bg-slate-50 
      `}
      >
        <CustomCheckbox
          label="ID No."
          description="Recommended for patients who are above 18 years."
          value={isAdult}
          onChange={setIsAdult}
        />
        <div className="w-full pl-7 pt-2">
          {isAdult && (
            <CustomInput label="ID No." value={idNo} onChange={setIDNo} />
          )}
        </div>
      </div>

      <CustomInput
        label="Phone No."
        value={nextOfKinPhoneNo}
        onChange={setNextOfKinPhoneNo}
      />

      <CustomSelect
        label="Relationship"
        value={relationship}
        onChange={setRelationship}
        data={[
          {
            id: 'Partner',
            label: 'Partner'
          },
          {
            id: 'Spouse',
            label: 'Spouse'
          },
          {
            id: 'Father',
            label: 'Father'
          },
          {
            id: 'Mother',
            label: 'Mother'
          },
          {
            id: 'Sibling',
            label: 'Sibling'
          },
          {
            id: 'child',
            label: 'child'
          },
          {
            id: 'Relative',
            label: 'Relative'
          },
          {
            id: 'Guardian',
            label: 'Guardian'
          },
          {
            id: 'Friend',
            label: 'Friend'
          }
        ]}
      />
    </div>
  )
}

export default NextOfKin
