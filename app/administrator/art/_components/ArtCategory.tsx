/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useGetAllArtRegimenCategoriesQuery } from '@/api/art/artRegimenCategory.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { artCategoryColumns } from '../columns'
import AddArtCategory from './add-art-category/AddArtCategory'

function ArtCategory () {
  const { data: artCategory } = useGetAllArtRegimenCategoriesQuery()
  return (
    <div className="flex flex-row space-x-4 items-start mt-2">
      <div
      className='w-3/5 bg-white rounded-lg p-4'
      >
        <CustomTable
          columns={artCategoryColumns}
          data={artCategory}
          isSearch={false}
        />
      </div>

      {/*  */}
      <div className='w-2/5'>
        <AddArtCategory/>
      </div>
    </div>
  )
}

export default ArtCategory
