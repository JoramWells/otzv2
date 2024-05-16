import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

const History = () => {
  const [isNormal, setIsNormal] = useState(false)
  const [isStage1, setIsStage1] = useState(false)
  const [isStage2, setIsStage2] = useState(false)
  const [isStage3, setIsStage3] = useState(false)
  const [isStage4, setIsStage4] = useState(false)
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <p className="text-lg font-bold text-slate-700">General Examination</p>
      </div>

      <div>
        <p className="text-lg font-bold text-slate-700">System Examination</p>
        <CustomCheckbox
          label="Findings on system review?"
          description="Patient is not normal? "
          value={isNormal}
          onChange={setIsNormal}
        />

        {isNormal && (
          <div className="pl-6 flex flex-col space-y-4 mt-4">
            <div className="flex flex-row justify-between space-x-4">
              <p>Skin</p>
              <CustomSelect />
              <Textarea />
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <p>Eyes</p>
              <CustomSelect />
              <Textarea />
            </div>
            {/*  */}
            <div className="flex flex-row justify-between space-x-4">
              <p>ENT</p>
              <CustomSelect />
              <Textarea />
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <p>Chest</p>
              <CustomSelect />
              <Textarea />
            </div>

            {/*  */}
            <div className="flex flex-row justify-between space-x-4">
              <p>CVS</p>
              <CustomSelect />
              <Textarea />
            </div>

            {/*  */}
            <div className="flex flex-row justify-between space-x-4">
              <p>Abdomen</p>
              <CustomSelect />
              <Textarea />
            </div>

            {/*  */}
            <div className="flex flex-row justify-between space-x-4">
              <p>CNS</p>
              <CustomSelect />
              <Textarea />
            </div>

            {/*  */}
            <div className="flex flex-row justify-between space-x-4">
              <p>Genitourinary</p>
              <CustomSelect />
              <Textarea />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-lg text-slate-700 font-semibold">WHO Staging</p>

        <CustomCheckbox
          label="WHO Stage 1"
          value={isStage1}
          onChange={setIsStage1}
        />
        {isStage1 && (
          <div className="pl-8 flex flex-col space-y-1">
            <CustomCheckbox label="Asymptomatic" />

            <CustomCheckbox label="Persistent generalized lymphadenopathy" />
          </div>
        )}
        <CustomCheckbox
          label="WHO Stage 2"
          value={isStage2}
          onChange={setIsStage2}
        />
        {isStage2 && (
          <div className="pl-8 flex flex-col space-y-1">
            <CustomCheckbox description="Moderate unexplained weight loss (Less tan 10% of presumed or measured body weight)" />
            <CustomCheckbox description="Minor mucocutaneous manifestations (seborrheic dermatitis, papular pruritic eruptions, fungal nail infections, recurrent oral ulcerations, angular cheilitis)" />
            <CustomCheckbox description="Herpes zoster" />
            <CustomCheckbox description="Recurrent upper respiratory tract infections(sinusistis, tonsilitis, bronchitis, otitis media, pharyngitis) " />
          </div>
        )}
        <CustomCheckbox
          label="WHO Stage 3"
          value={isStage3}
          onChange={setIsStage3}
        />
        {isStage3 && (
          <div className="pl-8">
            <CustomCheckbox description="Persistent oral candidiasis" />
          </div>
        )}
        <CustomCheckbox
          label="WHO Stage 4"
          value={isStage4}
          onChange={setIsStage4}
        />
        {isStage4 && (
          <div className="pl-8">
            <CustomCheckbox description="HIV wasting syndrome" />
          </div>
        )}
      </div>

      <div>
        <p className="text-lg font-bold text-slate-700">Treatment Plan</p>
        <div className="flex flex-row space-x-4 justify-between ">
          <CustomInput label="Diagnosis" />
          <div className="w-full flex flex-col space-y-2">
            <label htmlFor="" className="font-bold text-[14px] ">
              Description
            </label>
            <Textarea placeholder="diagnosis" className="shadow-none" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default History
