import ListCounter from '@/components/ListCounter'
import { Button } from '@/components/ui/button'
import { PlusIcon, XIcon } from 'lucide-react'
import { type QuestionsInterface } from './QuizBuildQuestion'
export interface ChoicesProps {
  singleQuestion: QuestionsInterface
  questionIndex: number
  quizQuestions: QuestionsInterface[]
  setQuizQuestions: (quizes: QuestionsInterface[]) => void
  onChangeChoice: (
    text: string,
    choiceIndex: number,
    questionIndex: number
  ) => void
  prefixes: string[]
}
const Choices = ({ onChangeChoice, prefixes, questionIndex, quizQuestions, setQuizQuestions, singleQuestion }: ChoicesProps) => {
  const { choices } = singleQuestion
  const alphabets = ['A', 'B', 'C', 'D']
  const positions = ['First', 'Second', 'Third', 'Fourth']

  function addNewChoice () {
    const quizQuestionsCopy = [...quizQuestions]

    // check if prev not empty
    const lastChoicesPosition =
          quizQuestionsCopy[questionIndex].choices.length
    for (let i = lastChoicesPosition - 1; i >= 0; i--) {
      const eachInput =
            quizQuestionsCopy[questionIndex].choices[i].substring(2)
      if (eachInput.trim().length === 0) {
        console.log('empty field')
        return
      }
    }
    if (lastChoicesPosition < 4) {
      const newChoice = `${alphabets[lastChoicesPosition]}. `
      quizQuestionsCopy[questionIndex].choices.push(newChoice)
      setQuizQuestions(quizQuestionsCopy)
    }
    console.log(singleQuestion)
  }

  function deleteChoice (choiceIndex: number) {
    const quizQuestionCopy = [...quizQuestions]
    quizQuestionCopy[questionIndex].choices.splice(choiceIndex, 1)
    setQuizQuestions(quizQuestionCopy)
  }

  function handleChoiceChangeInput (
    text: string,
    choiceIndex: number,
    questionIndex: number
  ) {
    onChangeChoice(text, choiceIndex, questionIndex)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-start space-x-4">
        <div className="flex items-center  space-x-2">
          <ListCounter text={2} />
          <h3 className="font-semibold">Choices</h3>
        </div>
        <div className="flex-1 flex-col space-y-4  rounded-lg p-4 bg-slate-50 ">
          {choices.map((singleChoice: string, idx: number) => (
            <div key={idx} className="flex items-center relative">
              <span className="mr-2">{alphabets[idx]}</span>
              <input
                className="border border-gray-200 p-2 rounded flex-grow"
                type="text"
                placeholder={`Enter your ${positions[idx]} choice`}
                value={singleChoice.substring(prefixes[idx].length + 2)}
                onChange={(e) => {
                  handleChoiceChangeInput(e.target.value, idx, questionIndex)
                }}
              />
              {idx >= 2 && (
                <XIcon
                  className="ml-2 cursor-pointer absolute right-2"
                  onClick={() => {
                    deleteChoice(idx)
                  }}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end">
            <Button
              className="mt-2 bg-slate-200 text-black hover:bg-slate-100"
              onClick={() => {
                addNewChoice()
              }}
            >
                <PlusIcon className='mr-2' size={15} />
              Add a choice
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Choices
