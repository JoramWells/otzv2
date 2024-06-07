/* eslint-disable import/no-extraneous-dependencies */

import CustomCheckbox from '../../../../components/forms/CustomCheckbox'

export interface TaskFourProps {
  isCountedPills: boolean
  setIsCountedPills: (val: boolean) => void
  isClinicVisits: boolean
  setIsClinicVisits: (val: boolean) => void
  isDisclosure: boolean
  setIsDisclosure: (val: boolean) => void
  isGuardianSupport: boolean
  setIsGuardianSupport: (val: boolean) => void
  isSupportGroupAttendance: boolean
  setIsSupportGroupAttendance: (val: boolean) => void
  isHouseholdTested: boolean
  setIsHouseholdTested: (val: boolean) => void
}
const TaskFour = ({
  isCountedPills,
  setIsCountedPills,
  isClinicVisits,
  setIsClinicVisits,
  isDisclosure,
  setIsDisclosure,
  isGuardianSupport,
  setIsGuardianSupport,
  isSupportGroupAttendance,
  setIsSupportGroupAttendance,
  isHouseholdTested,
  setIsHouseholdTested
}: TaskFourProps) => (
  <div className="flex flex-col gap-y-4">
    <CustomCheckbox
      value={isCountedPills}
      onChange={setIsCountedPills}
      label="Pill Counted(YES/NO)"
    />

    {/*  */}

    <CustomCheckbox
      value={isClinicVisits}
      onChange={setIsClinicVisits}
      label="Clinic Visits(Yes/No)?"
    />

    {/*  */}
    <CustomCheckbox
      value={isDisclosure}
      onChange={setIsDisclosure}
      label="Disclosure (Yes/No)?"
    />

    {/*  */}
    <CustomCheckbox
      value={isGuardianSupport}
      onChange={setIsGuardianSupport}
      label="Guardian Support (Yes/No)?"
    />

    {/*  */}
    <CustomCheckbox
      value={isSupportGroupAttendance}
      onChange={setIsSupportGroupAttendance}
      label="Support Group Attendance(Yes/No)?"
    />

    {/*  */}
    <CustomCheckbox
      value={isHouseholdTested}
      onChange={setIsHouseholdTested}
      label="Household members tested(Yes/No)?"
    />
  </div>
)

export default TaskFour
