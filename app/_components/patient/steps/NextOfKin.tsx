'use client'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'

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
  kinFirstName: string
  kinLastName: string
  kinDOB: string
  kinGender: string
  kinIDNo: string
  relationship: string
  nextOfKinPhoneNo: string
  setKinFirstName: (val: string) => void
  setKinLastName: (val: string) => void
  setKinDOB: (val: string) => void
  setKinGender: (val: string) => void
  setKinIDNo: (val: string) => void
  setKinRelationship: (val: string) => void
  setNextOfKinPhoneNo: (val: string) => void
}

const NextOfKin = ({
  kinFirstName,
  kinLastName,
  kinDOB,
  kinGender,
  kinIDNo,
  nextOfKinPhoneNo,
  setKinFirstName,
  setKinLastName,
  setKinDOB,
  setKinGender,
  setKinIDNo,
  relationship,
  setKinRelationship,
  setNextOfKinPhoneNo
}: NextOfKinProps) => {
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
      <div className="flex flex-row justify-between space-x-4 w-full">
        <CustomInput
          label="First Name"
          value={kinFirstName}
          onChange={setKinFirstName}
        />
        <CustomInput
          label="Last Name"
          value={kinLastName}
          onChange={setKinLastName}
        />
      </div>
      <CustomInput label="DOB" value={kinDOB} onChange={setKinDOB} type="date" />
      {/* {calculateAge(dob)} */}
      <CustomSelect
        label="Select Gender"
        data={genderOptions}
        value={kinGender}
        onChange={setKinGender}
      />

      {/*  */}

            <CustomInput label="ID No." value={kinIDNo} onChange={setKinIDNo} />

      <CustomInput
        label="Phone No."
        value={nextOfKinPhoneNo}
        onChange={setNextOfKinPhoneNo}
      />

      <CustomSelect
        label="Relationship"
        value={relationship}
        onChange={setKinRelationship}
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
