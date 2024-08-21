/* eslint-disable import/no-extraneous-dependencies */

import CustomCheckbox from '@/components/forms/CustomCheckbox'

export interface TaskThreeProps {
  isReassuredCaregiver: boolean
  setIsReassuredCaregiver: (value: boolean) => void
  isAssessedChildCaregiverComfort: boolean
  setIsAssessedChildCaregiverComfort: (value: boolean) => void
  isAssessedChildSafety: boolean
  setIsAssessedChildSafety: (value: boolean) => void
  isSupportedCaregiverChildToDisclose: boolean
  setIsSupportedCaregiverChildToDisclose: (value: boolean) => void
  isObservedReactions: boolean
  setIsObserved: (value: boolean) => void
  isInvitedChildQuestions: boolean
  setIsInvitedChildQuestions: (value: boolean) => void
  isReviewedBenefitsOfDisclosure: boolean
  setIsReviewedBenefitsOfDisclosure: (value: boolean) => void
  isExplainedCareOptions: boolean
  setIsExplainedCareOptions: (value: boolean) => void
  isConcludedSessionReassured: boolean
  setIsConcludedSessionReassured: (value: boolean) => void
  taskThreeComments: string
  setTaskThreeComments: (comment: string) => void
}
const TaskThree = ({
  isReassuredCaregiver,
  setIsReassuredCaregiver,
  isAssessedChildCaregiverComfort,
  setIsAssessedChildCaregiverComfort,
  isAssessedChildSafety,
  setIsAssessedChildSafety,
  isSupportedCaregiverChildToDisclose,
  setIsSupportedCaregiverChildToDisclose,
  isObservedReactions,
  setIsObserved,
  isInvitedChildQuestions,
  setIsInvitedChildQuestions,
  isReviewedBenefitsOfDisclosure,
  setIsReviewedBenefitsOfDisclosure,
  isExplainedCareOptions,
  setIsExplainedCareOptions,
  isConcludedSessionReassured,
  setIsConcludedSessionReassured,
  taskThreeComments,
  setTaskThreeComments
}: TaskThreeProps) => (
  <div className="flex flex-col border border-slate-200 rounded-lg ">
    <div className="border-b border-slate-200 p-2">
      <p className="capitalize font-semibold">Task 3: Execute Disclosure</p>
    </div>

    <CustomCheckbox
      label="Reassured the caregiver and child?"
      value={isReassuredCaregiver}
      onChange={setIsReassuredCaregiver}
    />

    <hr />

    {/*  */}
    <CustomCheckbox
      label="Assessed child and caregiver comfort?"
      value={isAssessedChildCaregiverComfort}
      onChange={setIsAssessedChildCaregiverComfort}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Assessed safety(environment and timing)?"
      value={isAssessedChildSafety}
      onChange={setIsAssessedChildSafety}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Supported caregiver to disclose using the simplest language the child can understand?"
      value={isSupportedCaregiverChildToDisclose}
      onChange={setIsSupportedCaregiverChildToDisclose}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Observed the immediate reactions of both the child and
          caregivers and addressed concerns or negative reactions?"
      value={isObservedReactions}
      onChange={setIsObserved}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Invited questions from the child?"
      value={isInvitedChildQuestions}
      onChange={setIsInvitedChildQuestions}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Revisited/reviewed the benefits of
          disclosure with the child and caregiver?"
      value={isReviewedBenefitsOfDisclosure}
      onChange={setIsReviewedBenefitsOfDisclosure}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Explained care options available to the child and caregiver?"
      value={isExplainedCareOptions}
      onChange={setIsExplainedCareOptions}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Concluded the session with reassurance to
          both the child and caregiver? Reiterating importance of confidentiality of
          information of ones health with the child and caregiver"
      value={isConcludedSessionReassured}
      onChange={setIsConcludedSessionReassured}
    />

    <p
      style={{
        color: '#434343',
        fontSize: '16px'
      }}
      className="ml-6"
    >
      How ofter do you find difficulty remembering to take all your medications
    </p>
    {/*
    <Select
      style={{
        width: '100%',
        height: '39px'
      }}
      value={isDifficultyRemembering}
      onChange={(val) => setIsDifficultyRemembering(val)}
    >
      <Select.Option>Rarely</Select.Option>
    </Select> */}
  </div>
)

export default TaskThree
