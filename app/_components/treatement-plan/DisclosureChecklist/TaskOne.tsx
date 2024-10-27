/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import Progress from '@/components/Progress'
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
}: TaskOneProps) => {
  return (
    <div className="flex flex-col border border-slate-200 rounded-lg ">
      <div className="border-b border-slate-200 p-2 flex flex-row justify-between items-center">
        <p className="capitalize font-bold text-[14px] ">
          Task 1: Assess Child for disclosure eligibility.
        </p>
        <Progress data={{ isCorrectAge, isWillingToDisclose, isKnowledgeable }} />
      </div>
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

      <div className="p-2 w-full">
        <CustomInput
          label="Task 1 comments."
          value={taskOneComments}
          onChange={setTaskOneComments}
        />
      </div>
    </div>
  )
}

export default TaskOne
