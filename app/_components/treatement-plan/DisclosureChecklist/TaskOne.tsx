/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import CustomCheckbox from '../../forms/CustomCheckbox'
import CustomInput from '../../forms/CustomInput'

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
  <div className="flex flex-col gap-y-6 border p-4 rounded-lg mt-4">
    <CustomCheckbox
      label="Child has met age criteria (10 - 6 years)?"
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
