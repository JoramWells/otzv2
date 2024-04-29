'use client'

import CustomInput from '@/app/_components/forms/CustomInput';
import CustomSelect from '@/app/_components/forms/CustomSelect';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react'
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ArticlesPage = () => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

  const [value, setValue] = useState('')
  const [category, setCategory] = useState("");

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
        <Button className="shadow-none bg-teal-600 hover:bg-teal-700">
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
          value=""
          onChange={() => {}}
          data={[]}
        />
        <div
        className='h-[250px] '
        >
          <ReactQuill theme="snow" value={value} onChange={setValue} 
          className='rounded-xl h-[200px] '
          />
        </div>
        <CustomInput label="Select Image" type="file" />

        <Button className="shadow-none bg-teal-600 hover:bg-teal-700">
          SAVE
        </Button>
      </div>
    </div>
  );
}

export default ArticlesPage