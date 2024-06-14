/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import { useDeleteQuestionsMutation, useGetAllQuestionsQuery } from '@/api/articles/questions.api'
import { Button } from '@/components/ui/button'
import { Loader2, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const EPage = () => {
  const { data } = useGetAllQuestionsQuery()
  const [deleteQuestions, { isLoading }] = useDeleteQuestionsMutation()
  console.log(data, 'lom')
  return (
    <div>
      <Button className="bg-teal-600 font-bold shadow-none hover:bg-teal-700">
        <PlusCircle className="mr-2" size={18} />
        <Link href={'/articles/add-e-learning'}>Add Articles Category</Link>
      </Button>

      {/*  */}
      {data?.map((item: any) => (
        <div key={item.id}>
          <Image
            // w={0}
            alt="im"
            // placeholder="data:image/..."
            width={300}
            height={150}
            // quality={100}
            // fill
            // objectFit='contain'
            // priority
            // layout='fill'
            className="rounded-t-lg"
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${item?.Article?.image}`}
            style={{
              width: '300px',
              height: '150px',
              objectFit: 'cover'
            }}
            // loader={loaderProp}
          />
          <h2>{item?.title} </h2>
          <h3>{item?.question}</h3>
          <p>Choices: {item?.choices.length}</p>
          <Button
            className=""
            variant="outline"
            onClick={async () => await deleteQuestions(item.id)}
          >
            {isLoading && <Loader2 className="animate-spin mr-2" size={15} />}
            del
          </Button>
        </div>
      ))}
      <div
      // key={item.id}
      >
        {/* {item?.question} */}q
      </div>
    </div>
  )
}

export default EPage
