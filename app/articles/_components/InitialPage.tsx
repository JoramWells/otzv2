import CustomSelect, { type DataItem } from '@/components/forms/CustomSelect'

interface InitialPageProps {
  articleCategoryID: string
  setArticleCategoryID: (val: string) => void
  bookData: DataItem[]
  chapterID: string
  setChapterID: (val: string) => void
  chapterData: DataItem[]
  articleID: string
  setArticleID: (val: string) => void
  articleData: DataItem[]
}

const InitialPage = ({
  articleCategoryID, setArticleCategoryID, bookData, chapterID,
  setChapterID, articleID, chapterData, setArticleID, articleData
}: InitialPageProps) => {
  return (
    <div className="flex flex-col space-y-4 p-4 rounded-lg">
      <CustomSelect
        label="Select Book"
        value={articleCategoryID}
        onChange={setArticleCategoryID}
        data={bookData}
      />

      <CustomSelect
        label="Select Chapter"
        value={chapterID}
        onChange={setChapterID}
        data={chapterData}
      />
      <CustomSelect
        label="Select Article"
        data={articleData}
        value={articleID}
        onChange={setArticleID}
      />
    </div>
  )
}

export default InitialPage
