import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import React from 'react'

const VisitDetails = () => {
  return (
    <div>
      <p>Type of Visit</p>
      <CustomCheckbox label="Scheduled" />

      <CustomSelect
        label="Visit by"
        data={[
          {
            id: '1',
            label: 'Self'
          },
          {
            id: '2',
            label: 'Treatment supporter'
          }
        ]}
      />

      <p>Vitals</p>
      <CustomInput label="Temperature" />
      <CustomInput label="Pulse Rate" />

      <p>Blood Pressure</p>

      <CustomInput label="Systolic" />
      <CustomInput label="Diastolic" />

      <CustomInput
      label='Weit'

      />
      <CustomInput
      label='Eit'
      />
      <CustomInput
      label='MUAC'
      />

      <CustomInput
      label='Population Type'
      />
    </div>
  )
}

export default VisitDetails
