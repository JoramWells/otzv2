/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { CustomTable } from '../table/CustomTable'
import { artCategoryColumns } from '@/app/administrator/art/columns'
import { useGetAllArtRegimenCategoriesQuery } from '@/api/art/artRegimenCategory.api'

function ArtCategory () {
  const { data: artCategory } = useGetAllArtRegimenCategoriesQuery()

  return (
    <div>
        <CustomTable
        columns={artCategoryColumns}
        data={artCategory || []}
        />
    </div>
  )
}

export default ArtCategory
