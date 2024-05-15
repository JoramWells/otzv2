import { CustomTable } from '@/app/_components/table/CustomTable'
import { artSwitchReasonColumns } from '../../columns'
import { useGetAllArtSwitchReasonsQuery } from '@/api/art/artSwitchReason.api'
import AddArtSwitchReason from '../add-art-switch-reason/AddArtSwitchReason'

const ArtSwitchReason = () => {
  const { data: artSwitchReasonsData } = useGetAllArtSwitchReasonsQuery()

  return (
    <div className="w-full flex flex-row space-x-2 mt-4 items-start">
      <div className="w-3/5 bg-white rounded-lg p-4">
        <CustomTable
          columns={artSwitchReasonColumns}
          data={artSwitchReasonsData ?? []}
          isSearch={false}
        />
      </div>

      {/*  */}
      <div className="w-2/5">
        <AddArtSwitchReason />
      </div>
    </div>
  )
}

export default ArtSwitchReason
