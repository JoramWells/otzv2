/* eslint-disable import/no-extraneous-dependencies */

import CustomInput from '../../../../components/forms/CustomInput'
import CustomSelect from '../../../../components/forms/CustomSelect'

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
  setReturnToClinic
}: TaskThreeProps) => (
  <div className="flex flex-col gap-y-6 border p-4 rounded-lg mt-4">

    {/* DOB */}

    <CustomInput
      label="Medicine Counted"
      value={noOfMedicine}
      onChange={setNoOfMedicine}
    />

    {/*  */}
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
      type='date'
      value={returnToClinic}
      onChange={setReturnToClinic}
    />
  </div>
)

export default TaskThree
