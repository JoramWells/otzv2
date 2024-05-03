import React, { useState } from 'react'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import { Button, Divider } from '@chakra-ui/react'

const RenalFunction = () => {
  const [value, setValue] = useState(false)
  return (
    <div className="flex flex-col gap-y-4 w-[80%] border p-5 rounded-lg">
      <p className="text-lg font-bold">Choose Renal Function Test</p>
      <CustomCheckbox
        label="Blood Urea Nitrogen (BUN) (mg/dL)"
        description="Elevated levels of BUN in the blood may indicate impaired kidney function, as the kidneys normally excrete urea nitrogen from the body."
        value={value}
        onChange={setValue}
      />
      {/* 2 */}
      <CustomCheckbox
        label="Random Blood Sugar (RBS)"
        description="It is a measure of the amount of glucose present in the bloodstream at any given time, regardless of when the individual last ate.
         Used to screen for diabetes or monitor glucose control.
        "
        value={value}
        onChange={setValue}
      />

      {/*  */}
      <CustomCheckbox
        label="Serum Creatinine (umol/L)"
        description=" Elevated levels of serum creatinine in the blood can indicate impaired kidney function, as the kidneys normally filter and excrete creatinine from the body."
        value={value}
        onChange={setValue}
      />

      {/*  */}
      <CustomCheckbox
        label="Urea measurement (calculated)"
        description="The presence of spores in a urine test could be indicative of a urinary tract infection (UTI)."
        value={value}
        onChange={setValue}
      />

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

export default RenalFunction
