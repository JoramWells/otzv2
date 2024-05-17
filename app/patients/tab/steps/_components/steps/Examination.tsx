import { useGetAllArtRegimenQuery } from '@/api/art/artRegimen.api.'
import { useGetVitalSignQuery } from '@/api/vitalsigns/vitalSigns.api'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface InputProps {
  patientID: string
}

const Examination = ({ patientID }: InputProps) => {
  const [isCotrimoxazole, setIsCotrimoxazole] = useState(false)
  const { data } = useGetAllArtRegimenQuery()
  const { data: vsData } = useGetVitalSignQuery(patientID)
  console.log(vsData, 'dtmx')
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
        <CaseManagerDialog label="NEW ART">
          <CustomInput label="Start Date" type="date" />
          <div>
            <p>Regimen</p>
          <div>
            <CustomSelect label="Regimen Line"
            data={[
              {
                id: '1',
                label: 'First Line'
              }, {
                id: '2',
                label: 'Second Line'
              }, {
                id: '3',
                label: 'Third Line'
              }
            ]}
            />
          </div>

            <CustomCheckbox label="Standard Regimen" />
            <CustomCheckbox label="Non Standard Regimen" />
          </div>

        </CaseManagerDialog>
      </div>
    </div>
  )
}

export default Examination
