/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
import { type RefObject, createRef, forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
interface CorrectAnswerProps {
  onChangeCorrectAnswer: (text: string) => void
}

function CorrectAnswer ({ onChangeCorrectAnswer }: CorrectAnswerProps) {
  const [correctAnswerInput, setCorrectAnswerInput] = useState('')
  function handleChangeInput (text: string) {
    const upperText = text.toUpperCase()
    if (upperText === '' || ['A', 'B', 'C', 'D'].includes(upperText)) {
      setCorrectAnswerInput(upperText)
      onChangeCorrectAnswer(upperText)
    }
  }
  return <div className="mt-4">
    <input
      className="border border-gray-300 p-2 rounded"
      value={correctAnswerInput}
      maxLength={1}
      onChange={e => {
        handleChangeInput(e.target.value)
      }}
    />
  </div>
}

interface QuestionsInterface {
  id: string
  mainQuestion: string
  choices: string[]
  correctAnswer: string
}

interface ChoicesProps {
  singleQuestion: QuestionsInterface
  questionIndex: number
  quizQuestions: QuestionsInterface[]
  setQuizQuestions: (quizes: QuestionsInterface[]) => void
  onChangeChoice: (text: string, choiceIndex: number, questionIndex: number) => void
  prefixes: string[]
}

function Choices ({ singleQuestion, questionIndex, quizQuestions, setQuizQuestions, onChangeChoice, prefixes }: ChoicesProps) {
  const { choices } = singleQuestion
  const alphabets = ['A', 'B', 'C', 'D']
  const positions = ['First', 'Second', 'Third', 'Fourth']

  function addNewChoice () {
    const quizQuestionsCopy = [...quizQuestions]

    // check if prev not empty
    const lastChoicesPosition = quizQuestionsCopy[questionIndex].choices.length
    for (let i = lastChoicesPosition - 1; i >= 0; i--) {
      const eachInput = quizQuestionsCopy[questionIndex].choices[i].substring(2)
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

  function handleChoiceChangeInput (text: string, choiceIndex: number, questionIndex: number) {
    onChangeChoice(text, choiceIndex, questionIndex)
  }

  return (
    <div className="mt-4">
      <h3 className="font-semibold">Choices</h3>
      {choices.map((singleChoice: string, idx: number) => (
        <div key={idx} className="flex items-center mt-2">
          <span className="mr-2">{alphabets[idx]}</span>
          <input
            className="border border-gray-300 p-2 rounded flex-grow"
            type="text"
            placeholder={`Enter your ${positions[idx]} choice`}
            value={singleChoice.substring(prefixes[idx].length + 2)}
            onChange={(e) => {
              handleChoiceChangeInput(
                e.target.value,
                idx,
                questionIndex
              )
            }}
          />
          {idx >= 2 && (
            <XIcon
              className="ml-2 cursor-pointer"
              onClick={() => {
                deleteChoice(idx)
              }}
            />
          )}
        </div>
      ))}
      <Button
        className="mt-2"
        onClick={() => {
          addNewChoice()
        }}
      >
        Add a choice
      </Button>
    </div>
  )
}

const SingleQuestion = forwardRef(function SingleQuestion ({
  questionIndex,
  value,
  onChange
}: {
  questionIndex: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}, ref: React.Ref<HTMLInputElement>) {
  return (
    <div className="mt-4">
      <h3 className="font-semibold">Question: {questionIndex}</h3>
      <input
        className="border border-gray-300 p-2 rounded w-full"
        placeholder="Enter question"
        value={value}
        onChange={onChange}
        ref={ref}
      />
    </div>
  )
})

const QuizBuildQuestion = () => {
  const endOfListRef = useRef<HTMLDivElement | null>(null)
  const prefixes = ['A', 'B', 'C', 'D']
  const [quizQuestions, setQuizQuestions] = useState<QuestionsInterface[]>([
    {
      id: uuidv4(),
      mainQuestion: '',
      choices: prefixes.slice(0, 2).map((prefix: string) => prefix + ' '),
      correctAnswer: ''
    }
  ])

  function addNewQuestion () {
    const lastIndexQuizQuestions = quizQuestions.length - 1
    if (
      quizQuestions[lastIndexQuizQuestions].mainQuestion.trim().length === 0
    ) {
      console.log('Cannot be empty')
      return
    }

    // access all elements in the choices array
    for (const choice of quizQuestions[lastIndexQuizQuestions].choices) {
      const singleChoice = choice.substring(2)
      if (singleChoice.trim().length === 0) {
        console.log('Fill all empty choices')
        return
      }
    }

    if (quizQuestions[lastIndexQuizQuestions].correctAnswer.length === 0) {
      console.log('Incorrect!!')
      return
    }

    const newQuestion: QuestionsInterface = {
      id: uuidv4(),
      mainQuestion: '',
      choices: prefixes.slice(0, 2).map((prefix) => prefix + ' '),
      correctAnswer: ''
    }
    setQuizQuestions([...quizQuestions, newQuestion])
    textRefs.current = [...textRefs.current, createRef<HTMLInputElement>()]
  }

  function deleteQuestion (singleQuestion: QuestionsInterface) {
    const quizesCopy = [...quizQuestions]
    const filterQuestionToDelete = quizesCopy.filter(
      (question) => singleQuestion.id !== question.id
    )
    setQuizQuestions(filterQuestionToDelete)
  }

  function handleInputChange (index: number, text: string) {
    const updateQuestions = quizQuestions.map((question, i) => {
      if (index === i) {
        return { ...question, mainQuestion: text }
      }
      return question
    })
    setQuizQuestions(updateQuestions)
  }

  const textRefs = useRef<Array<RefObject<HTMLInputElement>>>(
    quizQuestions.map(() => createRef<HTMLInputElement>())
  )

  function updateChoicesArray (
    text: string,
    choiceIndex: number,
    questionIndex: number
  ) {
    console.log(text)
    const updatedQuestions = quizQuestions.map((question, i) => {
      if (questionIndex === i) {
        const updatedChoices = question.choices.map((choice, j) => {
          if (choiceIndex === j) {
            return prefixes[j] + '. ' + text
          } else {
            return choice
          }
        })

        return { ...question, choices: updatedChoices }
      }
      return question
    })
    setQuizQuestions(updatedQuestions)
  }

  function updateCorrectAnswer (text: string, questionIndex: number) {
    const questionsCopy = [...quizQuestions]
    questionsCopy[questionIndex].correctAnswer = text
    setQuizQuestions(questionsCopy)
  }

  useLayoutEffect(() => {
    if (endOfListRef.current) {
      setTimeout(() => {
        endOfListRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [quizQuestions])

  useEffect(() => {
    const lastTextAreaIndex = quizQuestions.length - 1
    if (lastTextAreaIndex >= 0) {
      const lastTextArea = textRefs.current[lastTextAreaIndex]?.current
      if (lastTextArea) {
        lastTextArea.focus()
      }
    }
  }, [quizQuestions.length])

  console.log(quizQuestions)

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      {quizQuestions.map((singleQuestion, questionIndex) => (
        <div
          key={questionIndex + 1}
          className="mb-4 p-4 bg-white rounded-lg shadow"
          ref={quizQuestions.length - 1 === questionIndex ? endOfListRef : null}
        >
          <SingleQuestion
            questionIndex={(questionIndex + 1).toString()}
            value={singleQuestion.mainQuestion}
            ref={textRefs.current[questionIndex]}
            onChange={(e) => {
              handleInputChange(questionIndex, e.target.value)
            }}
          />
          {questionIndex !== 0 && (
            <XIcon
              className="ml-2 cursor-pointer text-red-500"
              onClick={() => {
                deleteQuestion(singleQuestion)
              }}
            />
          )}
          <Choices
            questionIndex={questionIndex}
            singleQuestion={singleQuestion}
            quizQuestions={quizQuestions}
            setQuizQuestions={setQuizQuestions}
            prefixes={prefixes}
            onChangeChoice={(text, choiceIndex, questionIndex) => {
              updateChoicesArray(text, choiceIndex, questionIndex)
            }}
          />
          <CorrectAnswer
            onChangeCorrectAnswer={(text: string) => {
              updateCorrectAnswer(text, questionIndex)
            }}
          />
        </div>
      ))}
      <Button className="mt-4" onClick={addNewQuestion}>
        ADD
      </Button>
    </div>
  )
}

export default QuizBuildQuestion
