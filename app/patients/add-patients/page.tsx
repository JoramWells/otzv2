'use client'

import CustomButton from '../../_components/forms/CustomButton'
import CustomInput from '../../_components/forms/CustomInput'

const AddPatient = () => {
  return (
    <div
      className="flex w-screen h-screen
      justify-center items-center flex-row text-gray-800
      "
    >
      <div
        className="border border-gray-200
        w-1/3 flex flex-col items-center
      justify-center rounded-lg p-5"
      >
        <CustomInput label="First Name" />
        <CustomInput label="Second Name" />
        <CustomInput label="Last Name" />
        <CustomInput label="DOB" />
        <CustomInput label="NUPI" />
        <CustomInput label="MFL Code" />
        <CustomInput label="CCC No." />

        <CustomButton/>

      </div>
    </div>
  )
}

export default AddPatient
