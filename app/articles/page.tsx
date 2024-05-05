'use client'

import { useGetAllArticlesQuery } from '@/api/articles/articles.api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import 'react-quill/dist/quill.snow.css'

const ArticlesPage = () => {
  const { data } = useGetAllArticlesQuery()

  return (
    <div className="p-4">
      {/* <EditorContent editor={editor} /> */}
      <div className="w-full flex justify-between mt-4 mb-4">
        <p
          className="text-2xl font-bold text-slate-700
        items-center
        "
        >
          Manage Articles
        </p>
        <Button className="bg-teal-600 font-bold">
          <PlusCircle className="mr-2" size={18} />
          <Link href={'/articles/add-article'}>Add Articles</Link>
        </Button>
      </div>
      <div className="flex flex-row flex-wrap w-full justify-between  gap-y-8">
        {data?.map((item: any) => (
          <div
            key={item.id}
            className="w-[500px] border border-slate-200 rounded-xl p-4"
          >
            <p className="text-lg font-bold">Learn About Prep</p>

            <div
              dangerouslySetInnerHTML={{
                __html: item.description?.substring(0, 350).concat('..')
              }}
            />
            <Badge className="shadow-none rounded-full bg-slate-200 text-slate-700 hover:bg-slate-200 ">
              {/* {item.} */}
              Prep
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArticlesPage
