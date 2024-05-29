/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useState } from 'react'
import { CustomTable } from '../table/CustomTable'
import { type ColumnDef } from '@tanstack/react-table'
import { Map } from 'lucide-react'
import { Button } from '@chakra-ui/react'
import MapComponent from '../map/MapComponent'
import useCurrentLocation from '@/hooks/useCurrentLocation'

interface ColumnProps {
  schoolTerm: any
  schoolCategory: any
  schoolSubCategory: any
  header: string
  //   accessorKey?: keyof CurriculumProps
  render?: (props: any) => React.ReactNode
}

interface SchoolProps {
  column: Array<ColumnDef<ColumnProps>>
  data: ColumnProps[]
  handleClick: (value: number) => void
  value: number
}

const School = ({ column, data, handleClick, value }: SchoolProps) => {
  const [isMapVisible, setIsMapVisible] = useState(false)
  const currentLocation = useCurrentLocation()
  // get current location
  return (
    <div>
      <div
        className="flex flex-row
      items-center justify-between mb-4 mt-4
      "
      >
        <p className="text-lg font-bold">Registered Schools</p>
        <div className="flex flex-row space-x-4 items-center">
          <Map
          className='h-8 w-8 p-1 bg-slate-200 rounded-md
          hover:cursor-pointer
          '
          onClick={() => { setIsMapVisible(!isMapVisible) }}
          />

          <Button
            size={'sm'}
            colorScheme="green"
            // variant={'outline'}
            onClick={() => {
              handleClick(value)
            }}
            // leftIcon={<FaPlus />}
          >
            NEW
          </Button>
        </div>
      </div>
      {isMapVisible
        ? <MapComponent
        center={currentLocation || undefined}
        />
        : <CustomTable columns={column} data={data ?? []} />}
    </div>
  )
}

export default School
