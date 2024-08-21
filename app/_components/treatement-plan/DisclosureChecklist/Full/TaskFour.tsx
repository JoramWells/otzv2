/* eslint-disable import/no-extraneous-dependencies */

import CustomCheckbox from '@/components/forms/CustomCheckbox'

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
  <div className="flex flex-col border border-slate-200 rounded-lg ">
    <div className="border-b border-slate-200 p-2">
      <p className="capitalize font-semibold">
        Task 4 : Post Disclosure Assessment
      </p>
    </div>
    <CustomCheckbox
      label="Assessed family, social and peer relationship and support after disclose?"
      value={isPeerRelationshipAssessed}
      onChange={setIsPeerRelationshipAssessed}
    />
    <hr />

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
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Addressed negative body or self-image issues?"
      value={isAddressedNegativeImage}
      onChange={setIsAddressedNegativeImage}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Have you assessed the child for moodiness and negative behaviors?"
      value={isAssessedMoodiness}
      onChange={setIsAssessedMoodiness}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Referred appropriately for psychiatrical and other
          complications developed post disclosure if indicated?"
      value={isReferredForPhysic}
      onChange={setIsReferredForPhysic}
    />
    <hr />

    {/*  */}
    <CustomCheckbox
      label="Given age appropriate adherence information?"
      value={isGivenInfo}
      onChange={setIsGivenInfo}
    />
    <hr />

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
