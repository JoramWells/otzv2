'use client'

import React, { useEffect, useRef, useState } from 'react'
import {Editor, EditorState} from 'draft-js'

const ArticlesPage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const editor = useRef('')
 

      const focusEditor = ()=>{
        editor.current.focus()
      }

      useEffect(()=>{
        focusEditor()
      },[])

  return (
    <div>
      {/* <EditorContent editor={editor} /> */}

      <Editor 
      ref={editor}
      editorState={editorState}
      onChange={editorState=> setEditorState(editorState)}
      />
    </div>
  );
}

export default ArticlesPage