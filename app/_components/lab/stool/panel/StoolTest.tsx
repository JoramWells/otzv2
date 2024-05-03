import React, { useState } from 'react'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import { Button, Divider } from '@chakra-ui/react'

const StoolTest = () => {
  const [value, setValue] = useState(false)
  return (
    <div className="flex flex-col gap-y-4 w-[80%] border p-5 rounded-lg">
      <p className="text-lg font-bold">HIV Monitoring Tests</p>
      <CustomCheckbox
        label="Fecal Occult Blood Test"
        description="Detects the presence of human chorionic gonadotropin (hCG), a hormone produced by the placenta during pregnancy, in a woman's urine."
        value={value}
        onChange={setValue}
      />
      {/* 2 */}
      <CustomCheckbox
        label="Stool Exam"
        description="Detects the presence of human chorionic gonadotropin (hCG), a hormone produced by the placenta during pregnancy, in a woman's urine."
        value={value}
        onChange={setValue}
      />
      {/* 2 */}
      <CustomCheckbox
        label="Stool fat test semi-quantitative"
        description="Detects the presence of human chorionic gonadotropin (hCG), a hormone produced by the placenta during pregnancy, in a woman's urine."
        value={value}
        onChange={setValue}
      />

      {/* 2 */}
      <CustomCheckbox
        label="Stool microscopy wit concentration"
        description="Detects the presence of human chorionic gonadotropin (hCG), a hormone produced by the placenta during pregnancy, in a woman's urine."
        value={value}
        onChange={setValue}
      />

      {/* 2 */}
      <CustomCheckbox
        label="Stool fat test semi-quantitative"
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

export default StoolTest
