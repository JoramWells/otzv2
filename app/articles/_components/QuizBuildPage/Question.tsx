import ListCounter from '@/components/ListCounter'
import { forwardRef } from 'react'

const Question = forwardRef(function Question (
  {
    questionIndex,
    value,
    onChange
  }: {
    questionIndex: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  },
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <div className="flex space-x-4 items-center w-full justify-between">
      <div className="flex items-center  space-x-2">
        <ListCounter text={1} />
      </div>

      <h3 className="font-semibold">Quiz {questionIndex}</h3>
      <input
        className="border border-gray-300 p-2 rounded w-full"
        // className='shadow-none flex-1'
        placeholder="Enter question"
        value={value}
        onChange={onChange}
        ref={ref}
      />
    </div>
  )
})

export default Question
