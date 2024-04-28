'use client'

import Link from 'next/link';
import "react-quill/dist/quill.snow.css";

const ArticlesPage = () => {

  return (
    <div className="border border-slate-200 h-[500px]">
      {/* <EditorContent editor={editor} /> */}
      <Link href={'/articles/add-article'}>No Articles</Link>
    </div>
  );
}

export default ArticlesPage