'use client'

import CustomInput2 from '@/components/forms/CustomInput2'
import CustomSelect2 from '@/components/forms/CustomSelect2'

const genderOptions = [
  {
    id: 'M',
    label: 'MALE'
  },
  {
    id: 'F',
    label: 'FEMALE'
  }
]

const PersonalDetail = () => {
  // const [isTeenager, setIsTeenager] = useState<boolean>(false)
  // const [isAdult, setIsAdult] = useState<boolean>(false)

  // useEffect(()=>{
  //   const val = calculateAge(dob)
  //   if(val < 18){
  //     setIsTeenager(true)
  //   }else if(val>18){
  //     setIsAdult(true)
  //   }
  // },[val])
  return (
    <>
      <div className="flex flex-row w-full justify-between space-x-4">
        <CustomInput2
          label="First Name"
          name="firstName"
          // onChange={setFirstName}
        />
        <CustomInput2
          label="Second Name"
          name="middleName"
          // onChange={setMiddleName}
        />
        <CustomInput2
          label="Last Name"
          name="lastName"
          // onChange={setLastName}
        />
      </div>
      <CustomInput2
        label="DOB"
        name="dob"
        // onChange={setDOB}

        type="date"
      />
      {/* {calculateAge(dob)} */}
      <CustomSelect2
        label="Select Gender"
        data={genderOptions}
        name="sex"
        // onChange={setGender}
      />
      <CustomSelect2
        label="Marital Status"
        name="maritalStatus"
        // onChange={setMaritalStatus}
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

      <CustomInput2
        label="Certificate No."
        name="idNo"
        // onChange={setIDNo}
      />

      <CustomInput2
        label="ID No."
        name="idNo"
        // onChange={setIDNo}
      />

      <CustomInput2
        label="CCC No."
        name="cccNo"
        // onChange={setCCCNo}
      />

      {/*  */}
      <CustomSelect2
        label="Entry Point"
        name='entryPoint'
        // onChange={setEntryPoint}
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
          },
          {
            id: 'TB Clinics',
            label: 'TB Clinics'
          },
          {
            id: 'Specialty Clinics',
            label: 'Specialty Clinics'
          }
        ]}
      />
    </>
  )
}

export default PersonalDetail
