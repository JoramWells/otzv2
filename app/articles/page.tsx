'use client'

import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ArticlesPage = () => {
  const [value, setValue] = useState('')

  return (
    <div className="border border-slate-200 h-[500px]">
      {/* <EditorContent editor={editor} /> */}
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
}

export default ArticlesPage