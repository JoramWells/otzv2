import { CaseManagerDialog } from '@/app/_components/patient/casemanager/CaseManagerDialog'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const Vaccination = () => {
  const [isPatientComplaining, setIsPatientComplaining] = useState(false)
  const [isVaccineTaken, setIsVaccineTaken] = useState(false)
  return (
    <CaseManagerDialog label="Add New Vaccination">
      <CustomCheckbox
        label="Patient having any complaints today?"
        value={isPatientComplaining}
        onChange={setIsPatientComplaining}
      />

      {/* <label htmlFor="">Present Complaints</label>
      <CustomSelect label="Select Complain" data={[]} />
      <CustomInput type="date" label="Started" /> */}

      <label htmlFor="">Vaccination history</label>
      <CustomCheckbox
        label="Vaccine taken"
        value={isVaccineTaken}
        onChange={setIsVaccineTaken}
      />

      <label htmlFor="">Other history</label>
      <CustomCheckbox
        label="Any history of trauma/associated accidents?"
        value={isVaccineTaken}
        onChange={setIsVaccineTaken}
      />
      <Button>Save</Button>
    </CaseManagerDialog>
  )
}

export default Vaccination
