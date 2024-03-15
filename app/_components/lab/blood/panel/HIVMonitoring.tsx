import React, { useState } from 'react'
import CustomCheckbox from '@/app/_components/forms/CustomCheckbox'
import { Button, Divider } from '@chakra-ui/react'

const HIVMonitoring = () => {
  const [value, setValue] = useState(false)
  return (
    <div className="flex flex-col gap-y-4 w-[80%] border p-5 rounded-lg">
      <p className="text-lg font-bold">HIV Monitoring Tests</p>
      <CustomCheckbox
        label="CD4 Percentage"
        description="Detects the presence of human chorionic gonadotropin (hCG), a hormone produced by the placenta during pregnancy, in a woman's urine."
        value={value}
        onChange={setValue}
      />
      {/* 2 */}
      <CustomCheckbox
        label="CD4 Count"
        description="Detects the presence of human chorionic gonadotropin (hCG), a hormone produced by the placenta during pregnancy, in a woman's urine."
        value={value}
        onChange={setValue}
      />
      {/* 2 */}
      <CustomCheckbox
        label="Viral Load"
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

export default HIVMonitoring
