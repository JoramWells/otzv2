/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { CustomTable } from '../table/CustomTable'
import { artCategoryColumns } from '@/app/dashboard/art/columns'
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
