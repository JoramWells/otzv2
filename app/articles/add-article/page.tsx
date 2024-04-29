'use client'

import { useAddArticlesMutation } from '@/api/articles/articles.api';
import { useAddArticlesCategoryMutation, useGetAllArticlesCategoryQuery } from '@/api/articles/articlesCategory.api';
import CustomInput from '@/app/_components/forms/CustomInput';
import CustomSelect from '@/app/_components/forms/CustomSelect';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ArticlesPage = () => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
  
  const [addArticlesCategory,{isLoading}] = useAddArticlesCategoryMutation();
  const { data, isLoading: isLoadingData } = useGetAllArticlesCategoryQuery();

  // 
  const [addArticles, { isLoading: isLoadingArticles }] = useAddArticlesMutation();
  const categoryOptions = useCallback(()=>{
    return data?.map(item=>({
      id:item.id, label:item.description
    }))
  },[data])

  const [value, setValue] = useState('')
  const [category, setCategory] = useState("");
  const [articleCategoryID, setArticleCategoryID] = useState("");

  const inputValues = {
    description:category
  }

  const inputValues2 = {
    articleCategoryID,
    description:value
  };

  return (
    <div className="mt-12 p-4 flex flex-col space-y-4">
      {/* <EditorContent editor={editor} /> */}
      <div className="p-4 w-1/2 border flex flex-col space-y-4">
        <p className="text-xl font-bold text-slate-700">New Category</p>

        <CustomInput
          value={category}
          onChange={setCategory}
          label="Enter Category Description"
        />
        <Button
          className="shadow-none bg-teal-600 hover:bg-teal-700"
          onClick={() => addArticlesCategory(inputValues)}
        >
          {isLoading && <Loader2 className="mr-2 animate-spin" size={18} />}
          ADD
        </Button>
      </div>
      <div
        className="w-1/2 border border-slate-200 rounded-lg 
      p-4 flex flex-col space-y-4 "
      >
        <p className="font-bold text-xl text-slate-700">New Article</p>
        <CustomInput
          value={category}
          onChange={setCategory}
          label="Enter Title"
        />

        <CustomSelect
          label="Select Category"
          value={articleCategoryID}
          onChange={setArticleCategoryID}
          data={categoryOptions()}
        />
        <div className="h-[250px] ">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="rounded-xl h-[200px] "
          />
        </div>
        <CustomInput label="Select Image" type="file" />

        <Button
          className="shadow-none bg-teal-600 hover:bg-teal-700"
          onClick={() => addArticles(inputValues2)}
        >
          {isLoadingArticles && <Loader2 className="mr-2 animate-spin" size={18} />}
          SAVE
        </Button>
      </div>
    </div>
  );
}

export default ArticlesPage