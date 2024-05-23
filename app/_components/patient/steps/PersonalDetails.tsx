'use client'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../../../components/forms/CustomInput'
import CustomSelect from '../../../../components/forms/CustomSelect'
import CustomCheckbox from '../../../../components/forms/CustomCheckbox'
import { useState } from 'react'
import { calculateAge } from '@/utils/calculateAge'

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

interface PersonalDetailProps {
  firstName: string
  middleName: string
  lastName: string
  dob: string
  entryPoint: string
  gender: string
  maritalStatus: string
  idNo: string
  cccNo: string
  mflCode: string
  setFirstName: (val: string) => void
  setMiddleName: (val: string) => void
  setLastName: (val: string) => void
  setDOB: (val: string) => void
  setMaritalStatus: (val: string) => void
  setGender: (val: string) => void
  setIDNo: (val: string) => void
  setCCCNo: (val: string) => void
  setMFLCode: (val: string) => void
  setEntryPoint: (val: string) => void
}

const PersonalDetail = ({
  firstName,
  middleName,
  lastName,
  dob,
  gender,
  idNo,
  cccNo,
  mflCode,
  setFirstName,
  setMiddleName,
  setLastName,
  setDOB, setGender,
  setIDNo,
  setMFLCode,
  setCCCNo, maritalStatus,
  setMaritalStatus,
  entryPoint,
  setEntryPoint
}: PersonalDetailProps) => {
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
      <div className="flex flex-row w-full justify-between space-x-4">
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
      {calculateAge(dob) > 18 && (
        <CustomSelect
          label="Marital Status"
          value={maritalStatus}
          onChange={setMaritalStatus}
          data={[
            {
              id: 'Divorced',
              label: 'Divorced'
            },
            {
              id: 'Married',
              label: 'Married'
            },
            {
              id: 'Single',
              label: 'Single'
            },
            {
              id: 'Separated',
              label: 'Separated'
            },
            {
              id: 'Widowed',
              label: 'Widowed'
            }
          ]}
        />
      )}
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

      <CustomInput label="CCC No." value={cccNo} onChange={setCCCNo} />

      {/*  */}
      <CustomSelect
      label='Entry Point'
      value={entryPoint}
      onChange={setEntryPoint}
        data={[
          {
            id: 'GBV Care Units',
            label: 'GBV Care Units'
          },
          {
            id: 'Inpatient',
            label: 'Inpatient'
          },
          {
            id: 'MCH clinics',
            label: 'MCH Clinics'
          },
          {
            id: 'Outpatient',
            label: 'Outpatient'
          },
          {
            id: 'SRH/Family Planning clinics',
            label: 'SRH/Family Planning Clinics'
          }, {
            id: 'TB Clinics',
            label: 'TB Clinics'
          },
          {
            id: 'Specialty Clinics',
            label: 'Specialty Clinics'
          }
        ]}
      />
    </div>
  )
}

export default PersonalDetail
