import React, { useState } from 'react'
import CustomCheckbox from '@/app/_components/forms/CustomCheckbox'
import { Button, Divider } from '@chakra-ui/react'

const TBMonitoring = () => {
  const [value, setValue] = useState(false)
  return (
    <div className="flex flex-col gap-y-4 w-[70%] border p-5 rounded-lg">
      <p className="text-lg font-bold">TB Monitoring Test</p>
      <CustomCheckbox
        label="TB (Urine Lipoarabinomannan (LAM))"
        description="The urine LAM assay is primarily used for the diagnosis of active TB in individuals with advanced HIV infection who are suspected of having TB and are seriously ill."
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

export default TBMonitoring
