/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import { useGetPrescriptionDetailQuery } from '@/api/pillbox/prescription.api'
import CustomInput from '../../../../components/forms/CustomInput'
import CustomSelect from '../../../../components/forms/CustomSelect'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'

export interface TaskThreeProps {
  dateHomeVisitRequested: string
  setDateHomeVisitRequested: (val: string) => void
  noOfMedicine: string
  setNoOfMedicine: (val: string) => void
  medicineStatus: string
  setMedicineStatus: (val: string) => void
  actionTaken: string
  setActionTaken: (val: string) => void
  evaluationOfAction: string
  setEvaluationOfAction: (val: string) => void
  returnToClinic: string
  patientID: string
  setReturnToClinic: (val: string) => void
}
const TaskThree = ({
  dateHomeVisitRequested,
  setDateHomeVisitRequested,
  noOfMedicine,
  setNoOfMedicine,
  medicineStatus,
  setMedicineStatus,
  actionTaken,
  setActionTaken,
  evaluationOfAction,
  setEvaluationOfAction,
  returnToClinic,
  setReturnToClinic,
  patientID
}: TaskThreeProps) => {
  const { data: pData } = useGetPrescriptionDetailQuery(patientID)
  console.log(pData, 'PDATA')

  const [medicineCount, setMedicineCount] = useState(0)

  useEffect(() => {
    if (pData) {
      setMedicineCount(pData?.expectedNoOfPills)
    }
  }, [pData])

  return (
    <div className="flex flex-col gap-y-4">
      {/* DOB */}

      <div className="flex space-x-4 justify-between relative">
        <div>
          Medicine Counted
          {medicineCount}
          {medicineCount === parseInt(noOfMedicine, 10)
            ? <Badge>Adequate</Badge>
            : <Badge>Inadequate</Badge>}
        </div>
        <div>
          Computed Medicine Count
          {pData?.computedNoOfPills}
        </div>
      </div>

      <CustomInput
        label="Medicine Counted"
        value={noOfMedicine}
        onChange={setNoOfMedicine}
      />

      {/*  */}

      <div>
        {noOfMedicine === pData?.expectedNoOfPills ? 'Adequate' : 'Inadequate'}
      </div>
      <CustomSelect
        label="Medicine Status"
        value={medicineStatus}
        onChange={setMedicineStatus}
        data={[
          {
            id: 'Adequate',
            label: 'Adequate'
          },
          {
            id: 'Inadequate',
            label: 'Inadequate'
          }
        ]}
      />

      {/*  */}
      <CustomInput
        label="Action Taken"
        value={actionTaken}
        onChange={setActionTaken}
      />

      {/*  */}
      <CustomInput
        label="Evaluation of Action"
        value={evaluationOfAction}
        onChange={setEvaluationOfAction}
      />

      {/*  */}
      <CustomInput
        label="Return to Clinic"
        type="date"
        value={returnToClinic}
        onChange={setReturnToClinic}
      />
    </div>
  )
}

export default TaskThree
