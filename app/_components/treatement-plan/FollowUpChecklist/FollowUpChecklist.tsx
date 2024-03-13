import React, { type Dispatch, type SetStateAction, useState } from 'react'
import CustomInput from '../../forms/CustomInput'
import CustomCheckbox from '../../forms/CustomCheckbox'
import CustomSelect from '../../forms/CustomSelect'

const FollowUpChecklist = () => {
  const [bmi, setBMI] = useState('')
  const [tannerStaging, setTannerStaging] = useState(false)
  const [disclosure, setDisclosure] = useState('')
  const [adherenceCounselling, setAdherenceCounselling]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isPAMA, setIsPAMA]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isOVC, setIsOVC]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isActiveSupportGroup, setIsActiveSupportGroup]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isVLValid, setIsVLValid]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isOptimizationDone, setIsOptimizationDone]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  return (
    <div className="flex flex-col gap-y-6 border p-4 rounded-lg mt-4">
      <CustomInput label="BMI Z for Age"
      value={bmi}
      onChange={setBMI}
      />

      {/*  */}
      <CustomCheckbox
        label="Tanner Staging (every 6 months)?"
        value={tannerStaging}
        onChange={setTannerStaging}
      />
      {/*  */}

      <CustomSelect
      label='Disclosure done?'
      value={disclosure}
      onChange={setDisclosure}
      data={[
        { id: '1', label: 'Full' },
        { id: '2', label: 'Partial' }
      ]}
      />

      {/*  */}
      <CustomCheckbox
        label="Adherence Counselling Done?"
        value={adherenceCounselling}
        onChange={setAdherenceCounselling}
      />

      {/*  */}
      <CustomCheckbox
        label="Enrolled in PAMA?"
        value={isPAMA}
        onChange={setIsPAMA}
      />

      {/*  */}
      <CustomCheckbox
        label="Enrolled in OVC??"
        value={isOVC}
        onChange={setIsOVC}
      />

      {/*  */}
      <CustomCheckbox
        label="Active in Support Group?"
        value={isActiveSupportGroup}
        onChange={setIsActiveSupportGroup}
      />

      {/*  */}
      <CustomCheckbox
        label="With a Valid VL?"
        value={isVLValid}
        onChange={setIsVLValid}
      />

      {/*  */}
      <CustomCheckbox
        label="Optimization Done?"
        value={isOptimizationDone}
        onChange={setIsOptimizationDone}
      />
    </div>
  )
}

export default FollowUpChecklist
