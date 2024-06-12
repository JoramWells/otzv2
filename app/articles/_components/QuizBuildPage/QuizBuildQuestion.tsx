/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useGetAllArticlesCategoryQuery } from '@/api/articles/articlesCategory.api'
import { useGetAllChaptersQuery } from '@/api/articles/chapters.api'
import { useAddQuestionsMutation } from '@/api/articles/questions.api'
import CustomSelect from '@/components/forms/CustomSelect'
import { Button } from '@/components/ui/button'
import { CheckCheck, Loader2, XIcon } from 'lucide-react'
import { type RefObject, createRef, forwardRef, useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { type CategoryInputProps } from '../../add-article/page'
import { useGetAllArticlesQuery } from '@/api/articles/articles.api'
import ListCounter from '@/components/ListCounter'
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
  return (
    <div className="flex space-x-4 items-start mt-4">
      <div className="flex items-center  space-x-2">
        <ListCounter
        text={3}
        />
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

interface QuestionsInterface {
  id: string
  articleID: string
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
              Add a choice
            </Button>
          </div>
        </div>
      </div>
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
    <div className="flex space-x-4 items-center w-full justify-between">
        <div className="flex items-center  space-x-2">
          <ListCounter
          text={1}
          />
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

const QuizBuildQuestion = () => {
  const [categoryData, setCategoryData] = useState<CategoryInputProps[]>([])
  const [articleCategoryID, setArticleCategoryID] = useState('')
  const [chapterID, setChapterID] = useState('')
  const [articleID, setArticleID] = useState('')

  const endOfListRef = useRef<HTMLDivElement | null>(null)
  const prefixes = ['A', 'B', 'C', 'D']
  const [quizQuestions, setQuizQuestions] = useState<QuestionsInterface[]>([
    {
      id: uuidv4(),
      articleID,
      mainQuestion: '',
      choices: prefixes.slice(0, 2).map((prefix: string) => prefix + ' '),
      correctAnswer: ''
    }
  ])

  const [addQuestions, { isLoading: loadingQuiz }] = useAddQuestionsMutation()

  //
  const { data: chapterData } = useGetAllChaptersQuery()
  const { data, isLoading: isLoadingData } = useGetAllArticlesCategoryQuery()

  //
  const { data: articlesData } = useGetAllArticlesQuery()
  const articlesOption = useCallback(() => {
    const tempData = articlesData?.filter(item => item.Chapter.id === chapterID)
    return tempData?.map(item => ({
      id: item.id,
      label: item.title
    }))
  }, [articlesData, chapterID])

  console.log(articlesOption(), 'articles')

  const chapterOptions = useCallback(() => {
    const tempData = chapterData?.filter(
      (item: any) => item.ArticleCategory?.id === articleCategoryID
    )
    return tempData?.map((item: any) => ({
      id: item.id,
      label: item.description
    }))
  }, [chapterData, articleCategoryID])

  //
  const chapterOptions2 = useCallback(() => {
    const tempData = chapterData?.filter(
      (item: any) => item?.id === articleCategoryID
    )
    return tempData?.map((item: any) => ({
      id: item.id,
      label: item.description
    }))
  }, [chapterData, articleCategoryID])

  const categoryOptions = useCallback(() => {
    return categoryData.map((item: any) => ({
      id: item.id,
      label: item.description
    }))
  }, [categoryData])

  //
  const book = useCallback(() => {
    const tempData = categoryData?.filter(
      (item) => item.id === articleCategoryID
    )
    console.log(categoryData, 'sert')
    return (
      tempData?.map((item) => ({
        id: item.id,
        label: item.description
      })) || []
    )
  }, [articleCategoryID, categoryData])()

  //
  useEffect(() => {
    if (data) {
      setCategoryData(data)
    }
  }, [data])

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
      correctAnswer: '',
      articleID
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
        return { ...question, mainQuestion: text, articleID }
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

  const [tab, setTab] = useState(1)

  const handleNext = () => {
    setTab(prev => prev + 1)
  }

  const handleBack = () => {
    setTab(prev => prev - 1)
  }

  return (
    <div className="p-4 flex flex-col items-center ">
      <div className="w-1/2 bg-white rounded-lg">
        {tab === 1 && (
          <div className="">
            <CustomSelect
              label="Select Category"
              value={articleCategoryID}
              onChange={setArticleCategoryID}
              data={categoryOptions()}
            />

            <CustomSelect
              label="Select Chapter"
              value={chapterID}
              onChange={setChapterID}
              data={chapterOptions()}
            />
            <CustomSelect
              label="Select Article"
              data={articlesOption()}
              value={articleID}
              onChange={setArticleID}
            />
          </div>
        )}

        {tab === 2 && (
          <>
            <div className="">
              <h1>{book.length > 0 && book[0]?.label}</h1>
              <h3 className="font-bold mb-2">
                {chapterOptions2() &&
                  chapterOptions2().length > 0 &&
                  chapterOptions2()[0]?.label}
              </h3>
              {quizQuestions.map((singleQuestion, questionIndex) => (
                <div
                  key={questionIndex + 1}
                  // className="mb-4"
                  ref={
                    quizQuestions.length - 1 === questionIndex
                      ? endOfListRef
                      : null
                  }
                >
                  <div className="flex flex-col space-y-2"></div>
                  <div className="p-4">
                    <div className="p-4 border border-s-slate-200 rounded-lg">
                      <SingleQuestion
                        questionIndex={(questionIndex + 1).toString()}
                        value={singleQuestion.mainQuestion}
                        ref={textRefs.current[questionIndex]}
                        onChange={(e) => {
                          handleInputChange(questionIndex, e.target.value)
                        }}
                      />
                    </div>
                    <div className="p-4 border">
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
                  </div>
                </div>
              ))}
              <div className="flex justify-end p-4">
                <Button className="" onClick={addNewQuestion}>
                  Add Question
                </Button>
              </div>
            </div>
            <Button onClick={async () => await addQuestions(quizQuestions)}>
              {loadingQuiz && <Loader2 className="animate-spin mr-2" />}
              Save
            </Button>
          </>
        )}

        <div className="flex space-x-4">
          <Button onClick={handleBack}>Prev</Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </div>
  )
}

export default QuizBuildQuestion
