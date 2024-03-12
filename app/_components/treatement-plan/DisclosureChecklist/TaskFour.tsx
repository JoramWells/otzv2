/* eslint-disable import/no-extraneous-dependencies */

import CustomCheckbox from '../../forms/CustomCheckbox'

export interface TaskFourProps {
  isPeerRelationshipAssessed: boolean
  setIsPeerRelationshipAssessed: (val: boolean) => void
  isChildActivityAssessed: boolean
  setIsChildActivityAssessed: (val: boolean) => void
  isChildQuestionsAllowed: boolean
  setIsChildQuestionsAllowed: (val: boolean) => void
  isAddressedNegativeImage: boolean
  setIsAddressedNegativeImage: (val: boolean) => void
  isAssessedMoodiness: boolean
  setIsAssessedMoodiness: (val: boolean) => void
  isReferredForPhysic: boolean
  setIsReferredForPhysic: (val: boolean) => void
  isGivenInfo: boolean
  setIsGivenInfo: (val: boolean) => void
  taskFourComments: string
  setTaskFourComments: (val: string) => void
  finalComments: string
  setFinalComments: (val: string) => void
}
const TaskFour = ({
  isPeerRelationshipAssessed,
  setIsPeerRelationshipAssessed,
  isChildActivityAssessed,
  setIsChildActivityAssessed,
  isChildQuestionsAllowed,
  setIsChildQuestionsAllowed,
  isAddressedNegativeImage,
  setIsAddressedNegativeImage,
  isAssessedMoodiness,
  setIsAssessedMoodiness,
  isReferredForPhysic,
  setIsReferredForPhysic,
  isGivenInfo,
  setIsGivenInfo,
  taskFourComments,
  setTaskFourComments,
  finalComments,
  setFinalComments
}: TaskFourProps) => (
  <div className="flex flex-col gap-y-6 border p-4 rounded-lg mt-4">
    <CustomCheckbox
      label="Assessed family, social and peer relationship and support after disclose?"
      value={isPeerRelationshipAssessed}
      onChange={setIsPeerRelationshipAssessed}
    />

    {/*  */}
    <CustomCheckbox
      label="Assessed the child interest and engagement in children activities like playing?"
      value={isChildActivityAssessed}
      onChange={setIsChildActivityAssessed}
    />

    {/*  */}
    <CustomCheckbox
      label="Allowed questions from the child and assessed self-perception and outlook?"
      value={isChildQuestionsAllowed}
      onChange={setIsChildQuestionsAllowed}
    />

    {/*  */}
    <CustomCheckbox
      label="Addressed negative body or self-image issues?"
      value={isAddressedNegativeImage}
      onChange={setIsAddressedNegativeImage}
    />

    {/*  */}
    <CustomCheckbox
      label="Have you assessed the child for moodiness and negative behaviors?"
      value={isAssessedMoodiness}
      onChange={setIsAssessedMoodiness}
    />

    {/*  */}
    <CustomCheckbox
      label="Referred appropriately for psychiatrical and other
          complications developed post disclosure if indicated?"
      value={isReferredForPhysic}
      onChange={setIsReferredForPhysic}
    />

    {/*  */}
    <CustomCheckbox
      label="Given age appropriate adherence information?"
      value={isGivenInfo}
      onChange={setIsGivenInfo}
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

export default TaskFour
