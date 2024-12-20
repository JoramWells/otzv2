/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React, { useState } from 'react'
// import { CustomTable } from '../table/CustomTable'
import { Map } from 'lucide-react'
import { Button } from '@chakra-ui/react'
// import MapComponent from '../map/MapComponent'
// import useCurrentLocation from '@/hooks/useCurrentLocation'
// import { useGetAllSchoolTermHolidaysQuery } from '@/api/school/schoolTermHoliday.api'
// import { holidaysColumn } from '@/app/administrator/schools/columns'

interface SchoolProps {
  handleClick: (value: number) => void
  value: number
}

const Holidays = ({ handleClick, value }: SchoolProps) => {
  const [isMapVisible, setIsMapVisible] = useState(false)
  // const currentLocation = useCurrentLocation()
  // const { data: holidaysData } = useGetAllSchoolTermHolidaysQuery()

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
            className="h-8 w-8 p-1 bg-slate-200 rounded-md
          hover:cursor-pointer
          "
            onClick={() => {
              setIsMapVisible(!isMapVisible)
            }}
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
      {/* {isMapVisible
        ? (
        <MapComponent center={currentLocation} />
          )
        : ( */}
        {/* <CustomTable columns={holidaysColumn} data={holidaysData ?? []} /> */}
          {/* // )} */}
    </div>
  )
}

export default Holidays
