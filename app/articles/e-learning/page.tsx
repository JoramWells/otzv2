/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import { useDeleteQuestionsMutation, useGetAllQuestionsQuery } from '@/api/articles/questions.api'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Edit2Icon, Loader2, PlusCircle, Trash2Icon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)

const dataList = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '1',
    label: 'Dashboard',
    link: '/administrator/dashboard'
  }
]

const EPage = () => {
  const { data, isLoading: isLoadingData } = useGetAllQuestionsQuery()
  const [deleteQuestions, { isLoading }] = useDeleteQuestionsMutation()
  console.log(data, 'lom')
  return (
    <div>
      <BreadcrumbComponent dataList={dataList} />

      <div className="w-full justify-end flex bg-white p-2 mt-2">
        <Button className="bg-teal-600 font-bold shadow-none hover:bg-teal-700">
          <PlusCircle className="mr-2" size={18} />
          <Link href={'/articles/add-e-learning'}>New Quiz</Link>
        </Button>
      </div>

      {/*  */}
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-5 p-4 md:grid-cols-2">
        {isLoadingData
          ? [1, 2, 3, 4, 5].map((idx) => (
              <Skeleton key={idx} className="flex-1 h-[150px] " />
            ))
          : data?.map((item: any) => (
              <div key={item.id} className="bg-white rounded-lg flex-1">
                <Image
                  // w={0}
                  alt="im"
                  // placeholder="data:image/..."
                  width={0}
                  height={0}
                  // quality={100}
                  // fill
                  // objectFit='contain'
                  // priority
                  // layout='fill'
                  className="rounded-t-lg"
                  src={`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${item?.Article?.image}`}
                  style={{
                    width: '300px',
                    height: '150px'
                    // objectFit: 'cover'
                  }}
                  // loader={loaderProp}
                />
                <div className="flex flex-col space-y-1 p-2">
                  <h2 className="font-bold">{item?.Article.title} </h2>
                  <h3
                  className='text-slate-500 font-bold '
                  >{item?.question}</h3>
                  <p className='text-slate-500' >{item?.choices.length} choices</p>

                  <hr />
                  <div
                  className='flex justify-end space-x-2'
                  >
                    <Button
                      className=""
                      size={'sm'}
                      variant="outline"
                      onClick={async () => await deleteQuestions(item.id)}
                    >
                      {isLoading && (
                        <Loader2 className="animate-spin mr-2" size={15} />
                      )}
                      <Edit2Icon size={15}
                      className='text-blue-500'
                      />
                    </Button>
                    <Button
                      className=""
                      size={'sm'}
                      variant="outline"
                      onClick={async () => await deleteQuestions(item.id)}
                    >
                      {isLoading && (
                        <Loader2 className="animate-spin mr-2" size={15} />
                      )}
                      <Trash2Icon size={15} className='text-red-500' />
                    </Button>
                  </div>
                </div>
              </div>
          ))}
      </div>

    </div>
  )
}

export default EPage
