import React, { useState } from 'react'
import CustomCheckbox from '@/app/_components/forms/CustomCheckbox'
import { Button, Divider } from '@chakra-ui/react'

const BloodCount = () => {
  const [value, setValue] = useState(false)
  return (
    <div className="flex flex-col gap-y-4 w-[80%] border p-5 rounded-lg">
      <p className="text-lg font-bold">Complete Blood Count</p>
      <CustomCheckbox
        label="Combined % of monocytes, eosinophils and basophils"
        description="It is a diagnostic test used to measure the amount of albumin (a protein) present in the urine relative to the concentration of creatinine, a waste product produced by muscle metabolism."
        value={value}
        onChange={setValue}
      />
      <CustomCheckbox
        label="Hematocrit"
        description="It is a laboratory test used to measure the level of bilirubin in the blood or urine."
        value={value}
        onChange={setValue}
      />
      {/* 2 */}
      <CustomCheckbox
        label="Hemoglobin"
        description="It is a laboratory test used to measure the level of bile salts or bile acids in the blood. "
        value={value}
        onChange={setValue}
      />
      {/*  */}
      <CustomCheckbox
        label="Lymphocytes (%) - Microscopic Exam"
        description="The color of urine can vary depending on several factors, including hydration status, diet, medications, and certain medical conditions."
        value={value}
        onChange={setValue}
      />
      {/*  */}
      <CustomCheckbox
        label="Dipstick for blood (hematuria)"
        description="It is a diagnostic test used to detect the presence of red blood cells (RBCs) in the urine"
        value={value}
        onChange={setValue}
      />

      {/*  */}
      <div className="flex flex-col space-y-2">
        <CustomCheckbox
          label="Glucose Measurement"
          description="The presence of these microorganisms in urine can indicate urinary tract infections or other infections."
          value={value}
          onChange={setValue}
        />
        <div className="flex flex-col space-y-2 ml-4">
          <CustomCheckbox
            description="Qualitative"
            value={value}
            onChange={setValue}
          />

          {/*  */}
          <CustomCheckbox
            description="Quantitative"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <CustomCheckbox
        label="Leukocyte Esterase"
        description="It is a comprehensive examination of the urine to assess its physical and chemical properties"
        value={value}
        onChange={setValue}
      />
      {/*  */}
      <CustomCheckbox
        label="Ketone"
        description="Commonly performed in individuals with diabetes, particularly when blood glucose levels are elevated, or when symptoms of ketoacidosis are present."
        value={value}
        onChange={setValue}
      />
      {/*  */}
      <CustomCheckbox
        label="Urine specific gravity"
        description="It reflects the kidneys ability to concentrate or dilute urine, which is essential for maintaining fluid and electrolyte balance in the body"
        value={value}
        onChange={setValue}
      />
      {/*  */}

      <CustomCheckbox
        label="Nitrite"
        description="Nitrite-positive urine, along with leukocyte esterase positivity (indicating the presence of white blood cells), is highly suggestive of a bacterial UTI"
        value={value}
        onChange={setValue}
      />

      {/*  */}
      <CustomCheckbox
        label="pH"
        description="Provides information about urinary tract health"
        value={value}
        onChange={setValue}
      />
      {/*  */}
      <CustomCheckbox
        label="Turbidity"
        description="Significant turbidity may indicate underlying medical conditions or abnormalities in the urine."
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

export default BloodCount
