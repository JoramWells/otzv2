/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useGetAllArticlesCategoryQuery } from '@/api/articles/articlesCategory.api'
import { useGetAllChaptersQuery } from '@/api/articles/chapters.api'
import { useAddQuestionsMutation } from '@/api/articles/questions.api'
import { Button } from '@/components/ui/button'
import { Loader2, XIcon } from 'lucide-react'
import { type RefObject, createRef, useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { type CategoryInputProps } from '../../add-article/page'
import { useGetAllArticlesQuery } from '@/api/articles/articles.api'
import InitialPage from '../InitialPage'
import CorrectAnswer from './CorrectAnswer'
import Choices from './Choices'
import Question from './Question'

export interface QuestionsInterface {
  id: string
  articleID: string
  question: string
  choices: string[]
  correctAnswer: string
}

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
      question: '',
      choices: prefixes.slice(0, 2).map((prefix: string) => prefix + ' '),
      correctAnswer: ''
    }
  ])

  const [addQuestions, { isLoading: loadingQuiz }] = useAddQuestionsMutation()

  //
  const { data: chapterData } = useGetAllChaptersQuery()
  const { data } = useGetAllArticlesCategoryQuery()

  //
  const { data: articlesData } = useGetAllArticlesQuery()
  const articlesOption = useCallback(() => {
    const tempData = articlesData?.filter((item: any) => item.Chapter.id === chapterID)
    return tempData?.map((item: any) => ({
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
      quizQuestions[lastIndexQuizQuestions].question.trim().length === 0
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
      question: '',
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
        return { ...question, question: text, articleID }
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
      <div className="w-1/2 bg-white rounded-lg p-4">
        {tab === 1 && (
          <InitialPage
            articleCategoryID={articleCategoryID}
            articleData={articlesOption()}
            articleID={articleID}
            bookData={categoryOptions()}
            chapterID={chapterID}
            chapterData={chapterOptions()}
            setArticleCategoryID={setArticleCategoryID}
            setArticleID={setArticleID}
            setChapterID={setChapterID}
          />
        )}

        {tab === 2 && (
          <>
            <div
              className="border border-dashed rounded-lg relative

            "
            >
              <h1>{book.length > 0 && book[0]?.label}</h1>
              <h3 className="font-bold mb-2">
                {chapterOptions2() &&
                  chapterOptions2().length > 0 &&
                  chapterOptions2()[0]?.label}
              </h3>
              {quizQuestions.map((singleQuestion, questionIndex) => (
                <div
                  key={questionIndex + 1}
                  className="relative"
                  ref={
                    quizQuestions.length - 1 === questionIndex
                      ? endOfListRef
                      : null
                  }
                >
                  <div className="p-4 flex flex-col space-y-4 ">
                    <div className="p-4 border border-s-slate-200 rounded-lg">
                      <Question
                        questionIndex={(questionIndex + 1).toString()}
                        value={singleQuestion.question}
                        ref={textRefs.current[questionIndex]}
                        onChange={(e) => {
                          handleInputChange(questionIndex, e.target.value)
                        }}
                      />
                    </div>
                    <div className="p-4 border ">
                      {questionIndex !== 0 && (
                        <XIcon
                          className="ml-2 cursor-pointer text-red-500 absolute right-0 top-0"
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
                <Button
                  className="bg-white border-2 border-slate-200 text-black"
                  onClick={addNewQuestion}
                >
                  Add Question
                </Button>
              </div>
            </div>
          </>
        )}

        <div className="flex space-x-4 justify-end p-4">
          <Button onClick={handleBack}
          disabled={tab === 1}
          >Prev</Button>
          {tab === 2
            ? (
            <Button
              onClick={async () => await addQuestions(quizQuestions)}
              className=""
            >
              {loadingQuiz && <Loader2 className="animate-spin mr-2 " />}
              Save
            </Button>
              )
            : (
            <Button onClick={handleNext}>Next</Button>
              )}
        </div>
      </div>
    </div>
  )
}

export default QuizBuildQuestion
