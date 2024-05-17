'use client'

import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomSelect from '@/components/forms/CustomSelect'

import { useState } from 'react'

interface InputProps {
  patientID: string
}

const Examination = ({ patientID }: InputProps) => {
  const [isCotrimoxazole, setIsCotrimoxazole] = useState(false)

  //
  return (
    <div>
      <div>Prophylaxis</div>
      <CustomCheckbox
        label="Cotrimoxazole"
        value={isCotrimoxazole}
        onChange={setIsCotrimoxazole}
      />
      {isCotrimoxazole && (
        <div>
          <div>
            <p>Adherence</p>
            <div>
              <CustomSelect
                data={[
                  {
                    id: '1',
                    label: 'good'
                  },
                  {
                    id: '2',
                    label: 'Fair'
                  },
                  {
                    id: '3',
                    label: 'Poor'
                  },
                  {
                    id: '4',
                    label: 'Not applicable (N/A)'
                  }
                ]}
              />
            </div>
          </div>
          <CustomCheckbox label="Dispensed" />
        </div>
      )}

      <div>
{/*  */}

      </div>
    </div>
  )
}

export default Examination
