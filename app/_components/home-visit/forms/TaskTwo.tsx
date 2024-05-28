/* eslint-disable import/no-extraneous-dependencies */

import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'

export interface TaskTwoProps {
  patientID: string
  complaints: string
  isARV: boolean
  setIsARV: (val: boolean) => void
  isTB: boolean
  setIsTB: (val: boolean) => void
  currentRegimenBegan: string
  setCurrentRegimenBegan: (val: string) => void
  treatmentStartDate: string
  setTreatmentStartDate: (val: string) => void
  intensivePhaseEndDate: string
  setIntensivePhaseEndDate: (val: string) => void
  currentRegimen: string
  setCurrentRegimen: (val: string) => void
  setComplaints: (val: string) => void
  oralDrugs: string
  setOralDrugs: (val: string) => void
  treatmentEndDate: string
  setTreatmentEndDate: (val: string) => void
}
const TaskTwo = ({
  patientID,
  isARV,
  setIsARV,
  isTB,
  setIsTB,
  currentRegimenBegan,
  setCurrentRegimenBegan,
  treatmentStartDate,
  setTreatmentStartDate,
  intensivePhaseEndDate,
  setIntensivePhaseEndDate,
  currentRegimen,
  setCurrentRegimen,
  oralDrugs,
  setOralDrugs,
  treatmentEndDate,
  setTreatmentEndDate,
  complaints,
  setComplaints
}: TaskTwoProps) => {
  return (
    <div className="flex flex-col gap-y-6 border p-4 rounded-lg mt-4">
      <div
        className="w-full flex-col border p-2 rounded-xl
        border-slate-200 bg-slate-50
        "
      >
        <p className="text-lg p-0 text-slate-500">ART Treatment</p>
        <CustomCheckbox
          label="Patient on ARV (Yes/No)?"
          value={isARV}
          onChange={setIsARV}
        />

        {isARV && (
          <div className="w-full pr-7 pl-7 pb-2">
            <div className="flex flex-row w-full gap-x-4">
              <CustomInput
                label="Regimen"
                value={currentRegimen}
                onChange={setCurrentRegimen}
              />

              <CustomInput
                label="Date Issued"
                value={currentRegimenBegan}
                onChange={setCurrentRegimenBegan}
                type="date"
              />
            </div>
          </div>
        )}
      </div>

      <CustomSelect
        label="Ol drugs"
        value={oralDrugs}
        onChange={setOralDrugs}
        data={[]}
      />

      <CustomInput
        label="Date of Enrollment"
        type="date"
        value={currentRegimenBegan}
        onChange={setCurrentRegimenBegan}
      />

      <div
        className="flex flex-col border-t-gray-200 border p-2
      rounded-xl
      "
      >
        <p
          className="text-lg
        "
        >
          TB Treatment
        </p>

        <div>
          <CustomCheckbox
            label="Patient on Anti-TBS (Yes/No)"
            value={isTB}
            onChange={setIsTB}
          />
          {/*  */}

          {isTB && (
            <div className="pl-7 pr-7 pb-2 rounded-xl">
              <CustomInput
                label="Treatment Start Date"
                type="date"
                value={treatmentStartDate}
                onChange={setTreatmentStartDate}
              />

              {/*  */}
              <div className="flex flex-row gap-x-4 mt-4">
                <CustomInput
                  label="End of Intensive Start Date"
                  type="date"
                  value={intensivePhaseEndDate}
                  onChange={setIntensivePhaseEndDate}
                />
                <CustomInput
                  label="End of intensive phase date"
                  type="date"
                  value={treatmentEndDate}
                  onChange={setTreatmentEndDate}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <CustomSelect
        label="Patient Complaints"
        value={complaints}
        onChange={setComplaints}
        data={[
          {
            id: 'Cough',
            label: 'Cough'
          }
        ]}
      />
    </div>
  )
}

export default TaskTwo
