import ListCounter from '@/components/ListCounter'
import React, { useState } from 'react'

export interface CorrectAnswerProps {
  onChangeCorrectAnswer: (text: string) => void
}

const CorrectAnswer = ({ onChangeCorrectAnswer }: CorrectAnswerProps) => {
  const [correctAnswerInput, setCorrectAnswerInput] = useState('')
  function handleChangeInput (text: string) {
    const upperText = text.toUpperCase()
    if (upperText === '' || ['A', 'B', 'C', 'D'].includes(upperText)) {
      setCorrectAnswerInput(upperText)
      onChangeCorrectAnswer(upperText)
    }
  }
  return (
    <div className="flex space-x-4 items-start mt-4">
      <div className="flex items-center  space-x-2">
        <ListCounter text={3} />
        <h3 className="font-semibold">Answer</h3>
      </div>

      <input
        className="border border-gray-300 p-2 rounded flex-1"
        value={correctAnswerInput}
        maxLength={1}
        onChange={(e) => {
          handleChangeInput(e.target.value)
        }}
      />
    </div>
  )
}

export default CorrectAnswer
