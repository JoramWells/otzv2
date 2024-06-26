/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import CustomCheckbox from '../../../../components/forms/CustomCheckbox'
import CustomInput from '../../../../components/forms/CustomInput'

export interface TaskOneProps {
  isCorrectAge: boolean
  setIsCorrectAge: (age: boolean) => void
  isWillingToDisclose: boolean
  setIsWillingToDisclose: (willing: boolean) => void
  isKnowledgeable: boolean
  setIsKnowledgeable: (know: boolean) => void
  taskOneComments: string
  setTaskOneComments: (comments: string) => void
}

const TaskOne = ({
  isCorrectAge,
  setIsCorrectAge,
  isWillingToDisclose,
  setIsWillingToDisclose,
  isKnowledgeable,
  setIsKnowledgeable,
  taskOneComments,
  setTaskOneComments
}: TaskOneProps) => (
  <div className="flex flex-col gap-y-2 p-4  ">
    <h1 className='capitalize font-bold'>Task 1: Assess Child for disclosure eligibility.</h1>
    <CustomCheckbox
      label="Child has met age criteria (between 6 and 10 years)?"
      onChange={setIsCorrectAge}
      value={isCorrectAge}
    />

    <CustomCheckbox
      label="Child and caregiver knowledgeable on the benefits of disclosure?"
      value={isWillingToDisclose}
      onChange={setIsWillingToDisclose}
    />

    <CustomCheckbox
      label="Caregiver willing to disclose to the child?"
      value={isKnowledgeable}
      onChange={setIsKnowledgeable}
    />

    <CustomInput
      label="Task 1 comments."
      value={taskOneComments}
      onChange={setTaskOneComments}
    />
  </div>
)

export default TaskOne
