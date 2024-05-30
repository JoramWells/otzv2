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

const NextOfKin = () => {
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
      <div className="flex flex-row justify-between space-x-4 w-full">
        <CustomInput2
          label="First Name"
          name="kinFirstName"
          // onChange={setKinFirstName}
        />
        <CustomInput2
          label="Last Name"
          name={'kinLastName'}
          // onChange={setKinLastName}
        />
      </div>
      <CustomInput2
        label="DOB"
        name="kinDOB"
        // onChange={setKinDOB}
        type="date"
      />
      {/* {calculateAge(dob)} */}
      <CustomSelect2
        label="Select Gender"
        data={genderOptions}
        name="kinGender"
        // onChange={setKinGender}
      />

      {/*  */}

      <CustomInput2
        label="ID No."
        name="kinIDNo"
        // onChange={setKinIDNo}
      />

      <CustomInput2
        label="Phone No."
        name='nextOfKinPhoneNo'
        // onChange={setNextOfKinPhoneNo}
      />

      <CustomSelect2
        label="Relationship"
        name='relationship'
        // onChange={setKinRelationship}
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
    </>
  )
}

export default NextOfKin
