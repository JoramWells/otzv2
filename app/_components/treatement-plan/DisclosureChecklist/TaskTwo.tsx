/* eslint-disable import/no-extraneous-dependencies */

import CustomInput from '@/components/forms/CustomInput'
import CustomCheckbox from '../../../../components/forms/CustomCheckbox'

export interface TaskTwoProps {
  isFreeFromSevereIllness: boolean
  setIsFreeFromSevereIllness: (val: boolean) => void
  isFamilySupport: boolean
  setIsFamilySupport: (val: boolean) => void
  isEnvironmentInterest: boolean
  setIsEnvironmentInterest: (val: boolean) => void
  isAware: boolean
  setIsAware: (val: boolean) => void
  isSchoolFree: boolean
  setIsSchoolFree: (val: boolean) => void
  isDisclosureReady: boolean
  setIsDisclosureReady: (val: boolean) => void
  isChildCommunicated: boolean
  setIsChildCommunicated: (val: boolean) => void
  isSecuredPatientInfo: boolean
  setIsSecuredPatientInfo: (val: boolean) => void
  taskTwoComments: string
  setTaskTwoComments: (val: string) => void
}
const TaskTwo = ({
  isFreeFromSevereIllness,
  setIsFreeFromSevereIllness,
  isFamilySupport,
  setIsFamilySupport,
  isEnvironmentInterest,
  setIsEnvironmentInterest,
  isAware,
  setIsAware,
  isSchoolFree,
  setIsSchoolFree,
  isDisclosureReady,
  setIsDisclosureReady,
  isChildCommunicated,
  setIsChildCommunicated,
  isSecuredPatientInfo,
  setIsSecuredPatientInfo,
  taskTwoComments,
  setTaskTwoComments
}: TaskTwoProps) => (
  <div className="flex flex-col border border-slate-200 rounded-lg ">
    <div className="border-b border-slate-200 p-2">
      <p className="capitalize font-semibold">
        Task 2: Assess child and caregiver for readiness.
      </p>
    </div>
    <CustomCheckbox
      label="Child/ caregiver free from severe
          physical illness, trauma, psychological illness or psychiatric illness?"
      value={isFreeFromSevereIllness}
      onChange={setIsFreeFromSevereIllness}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Child has consistent family, peer or social support?"
      value={isFamilySupport}
      onChange={setIsFamilySupport}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Child demonstrates interest in the environment and playing activities?"
      value={isEnvironmentInterest}
      onChange={setIsEnvironmentInterest}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Assessed what the child already
          knows about the medicines and illness and addressed needs and concerns?"
      value={isAware}
      onChange={setIsAware}
    />

    {/*  */}
    <hr />

    {/*  */}
    <CustomCheckbox
      label=" Assessed functional school engagement by the child consistent, attendance, interacts well with the school community, able to freely discuss school activities?"
      value={isSchoolFree}
      onChange={setIsSchoolFree}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Assessed caregiver readiness for disclosure to the child?"
      value={isDisclosureReady}
      onChange={setIsDisclosureReady}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Assessed what the caregiver has communicated to the child?"
      value={isChildCommunicated}
      onChange={setIsChildCommunicated}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Discussed management of confidentiality of information regarding one
          health with the child and caregiver?"
      value={isSecuredPatientInfo}
      onChange={setIsSecuredPatientInfo}
    />
    <hr />

    <div
    className='p-2 w-full'
    >
      <CustomInput
        label="Task 2 comments."
        value={taskTwoComments}
        onChange={setTaskTwoComments}
      />
    </div>
  </div>
)

export default TaskTwo
