/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useGetAllArtRegimenCategoriesQuery } from '@/api/art/artRegimenCategory.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { artCategoryColumns } from '../columns'

function ArtCategory () {
  const { data: artCategory } = useGetAllArtRegimenCategoriesQuery()

  return (
    <div className="flex flex-col items-center space-y-4">

      <CustomTable
      columns={artCategoryColumns}
      data={artCategory}
      />

    </div>
  )
}

export default ArtCategory
