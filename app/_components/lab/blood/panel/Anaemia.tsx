import React, { useState } from 'react'
import CustomCheckbox from '@/app/_components/forms/CustomCheckbox'
import { Button, Divider } from '@chakra-ui/react'

const Anaemia = () => {
  const [value, setValue] = useState(false)
  return (
    <div className="flex flex-col gap-y-4 w-[80%] border p-5 rounded-lg">
      <p className="text-lg font-bold">Anaemia Tests</p>

      {/* 2 */}
      <CustomCheckbox
        label="Hematocrit"
        description="Detects the presence of human chorionic gonadotropin (hCG), a hormone produced by the placenta during pregnancy, in a woman's urine."
        value={value}
        onChange={setValue}
      />
      <CustomCheckbox
        label="Haemoglobin"
        description="Detects the presence of human chorionic gonadotropin (hCG), a hormone produced by the placenta during pregnancy, in a woman's urine."
        value={value}
        onChange={setValue}
      />
      {/* 2 */}
      <CustomCheckbox
        label="Haemoglobin electrophoresis"
        description="Detects the presence of human chorionic gonadotropin (hCG), a hormone produced by the placenta during pregnancy, in a woman's urine."
        value={value}
        onChange={setValue}
      />
      {/* 2 */}
      <CustomCheckbox
        label="Platelets"
        description="Detects the presence of human chorionic gonadotropin (hCG), a hormone produced by the placenta during pregnancy, in a woman's urine."
        value={value}
        onChange={setValue}
      />

      {/* 2 */}
      <CustomCheckbox
        label="Reticulocytes (%)"
        description="Detects the presence of human chorionic gonadotropin (hCG), a hormone produced by the placenta during pregnancy, in a woman's urine."
        value={value}
        onChange={setValue}
      />

      {/* 2 */}
      <CustomCheckbox
        label="Sickle Cell Screening Test"
        description="Detects the presence of human chorionic gonadotropin (hCG), a hormone produced by the placenta during pregnancy, in a woman's urine."
        value={value}
        onChange={setValue}
      />

      {/* 2 */}

      <Divider />
      <div className="flex flex-row justify-end gap-x-4">
        <Button size={'sm'}>Clear</Button>
        <Button size={'sm'} colorScheme="teal">
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default Anaemia
