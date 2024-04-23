/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useGetAllArtRegimenCategoriesQuery } from '@/api/art/artRegimenCategory.api'
import { Badge } from '@/components/ui/badge'

function ArtCategory () {
  const { data: artCategory, isLoading } = useGetAllArtRegimenCategoriesQuery()

  return (
    <div className="flex flex-col items-center space-y-4">
      {artCategory?.map((item: any) => (
        <div key={item.id} className="border border-slate-200 
        w-1/2
        rounded-lg p-4">
          <p className="font-bold text-xl text-slate-700">
            {item.artCategoryDescription}
          </p>
          <p
          className='text-slate-500 text-sm'
          >{item.artRegimenPhase.artPhaseDescription}</p>
          {item.ageLine === "Pediatric" ? (
            <Badge
              className="bg-emerald-50 text-emerald-600
            shadow-none rounded-full
            "
            >
              {item.ageLine}
            </Badge>
          ) : (
            <Badge
              className="bg-orange-50 text-orange-600
            shadow-none rounded-full
            "
            >
              {item.ageLine}
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
}

export default ArtCategory
