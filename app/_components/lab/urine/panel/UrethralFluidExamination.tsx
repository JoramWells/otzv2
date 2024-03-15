import React, { useState } from 'react'
import CustomCheckbox from '@/app/_components/forms/CustomCheckbox'
import { Button, Divider } from '@chakra-ui/react'

const UrethralFluidExamination = () => {
  const [value, setValue] = useState(false)
  return (
    <div className="flex flex-col gap-y-4 w-[70%] border p-5 rounded-lg">

      <p
      className='text-lg font-bold'
      >Select Urethral Fluid Examination Tests </p>
      <CustomCheckbox
        label="Erythrocytes (RBCs)"
        description=" It may indicate the presence of a urinary tract infection, kidney stones, urinary tract trauma, kidney disease, or other medical conditions."
        value={value}
        onChange={setValue}
      />
      {/* 2 */}
      <CustomCheckbox
        label="Epithelial"
        description="These are cells that line the urinary tract. Their presence in the urine may indicate inflammation or damage to the urinary tract."
        value={value}
        onChange={setValue}
      />

      {/*  */}
      <CustomCheckbox
        label="Yeast"
        description="The presence of these microorganisms in urine can indicate urinary tract infections or other infections."
        value={value}
        onChange={setValue}
      />

      {/*  */}
      <CustomCheckbox
        label="Spore"
        description="The presence of spores in a urine test could be indicative of a urinary tract infection (UTI)."
        value={value}
        onChange={setValue}
      />

      {/*  */}
      <CustomCheckbox
        label="Casts"
        description="Casts are cylindrical structures formed from proteins secreted by kidney tubules. Different types of casts can indicate different kidney conditions."
        value={value}
        onChange={setValue}
      />

      {/*  */}
      <CustomCheckbox
        label="Leukocytes"
        description="The presence of leukocytes indicates inflammation or infection in the urinary tract"
        value={value}
        onChange={setValue}
      />

      {/*  */}
      <CustomCheckbox
        label="Bacteriuria"
        description="The presence of these microorganisms in urine can indicate urinary tract infections or other infections."
        value={value}
        onChange={setValue}
      />

      {/*  */}
      <CustomCheckbox
        label="Yeast hyphae"
        description="The presence in typically suggest the presence of a fungal infection caused by Candida species."
        value={value}
        onChange={setValue}
      />

      {/*  */}
      <CustomCheckbox
        label="Trichomonas Vaginalis"
        description="A common sexually transmitted infection (STI) diagnosed both in men and women"
        value={value}
        onChange={setValue}
      />

      {/*  */}
      <CustomCheckbox
        label="Crystals"
        description="Crystals can form in urine due to various reasons such as dehydration, diet, or certain medical conditions. The type of crystals present can give clues about the underlying cause."
        value={value}
        onChange={setValue}
      />
<Divider/>
      <div className='flex flex-row justify-end gap-x-4'>
        <Button
        size={'sm'}
        >Clear</Button>
        <Button
        size={'sm'}
        colorScheme='teal'
        >Confirm</Button>
      </div>
    </div>
  )
}

export default UrethralFluidExamination
