import CustomCheckbox from '@/components/forms/CustomCheckbox'
import { useState } from 'react'
import Select from 'react-select'

const WHOStaging = () => {
  const [isStage1, setIsStage1] = useState(false)
  const [isStage2, setIsStage2] = useState(false)
  const [isStage3, setIsStage3] = useState(false)
  const [isStage4, setIsStage4] = useState(false)
  const option1 = [
    {
      id: 'asymptomatic',
      label: 'Asymptomatic'
    },
    {
      id: 'Persistent generalized lymphadenopathy',
      label: 'Persistent generalized lymphadenopathy'
    }
  ]

  const option2 = [
    {
      id: 'Moderate unexplained weight loss (Less tan 10% of presumed or measured body weight)',
      label:
        'Moderate unexplained weight loss (Less tan 10% of presumed or measured body weight)'
    },
    {
      id: 'Minor mucocutaneous manifestations (seborrheic dermatitis, papular pruritic eruptions, fungal nail infections, recurrent oral ulcerations, angular cheilitis)',
      label:
        'Minor mucocutaneous manifestations (seborrheic dermatitis, papular pruritic eruptions, fungal nail infections, recurrent oral ulcerations, angular cheilitis)'
    },
    {
      id: 'Herpes zoster',
      label: 'Herpes zoster'
    },
    {
      id: 'Recurrent upper respiratory tract infections(sinusistis, tonsilitis, bronchitis, otitis media, pharyngitis) ',
      label:
        'Recurrent upper respiratory tract infections(sinusistis, tonsilitis, bronchitis, otitis media, pharyngitis) '
    }
  ]
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <p className="text-lg text-slate-700 font-semibold">WHO Staging</p>

        <CustomCheckbox
          label="WHO Stage 1"
          value={isStage1}
          onChange={setIsStage1}
        />

        {isStage1 && <Select options={option1} />}
        <CustomCheckbox
          label="WHO Stage 2"
          value={isStage2}
          onChange={setIsStage2}
        />
        {isStage2 && <Select options={option2} />}
        <CustomCheckbox
          label="WHO Stage 3"
          value={isStage3}
          onChange={setIsStage3}
        />
        {isStage3 && <Select options={option2} />}
        <CustomCheckbox
          label="WHO Stage 4"
          value={isStage4}
          onChange={setIsStage4}
        />
        {isStage4 && <Select options={option2} />}
      </div>

    </div>
  )
}

export default WHOStaging
