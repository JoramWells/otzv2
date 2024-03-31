/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { type OccupationProps, useGetAllOccupationQuery } from '@/api/occupation.api'
// import { Button } from '@chakra-ui/react'
import CustomInput from '../../forms/CustomInput'
import { useCallback, useId, useState } from 'react'
import CustomSelect from '../../forms/CustomSelect'
import { type CountyProps, useGetAllCountiesQuery } from '@/api/location/county.api'
import { type SubCountyProps, useGetAllSubCountiesQuery } from '@/api/location/subCounty.api'
import { type WardProps, useGetAllWardsQuery } from '@/api/location/ward.api'
import { useGetAllSchoolsQuery } from '@/api/school/school.api'
import { Button } from '@/components/ui/button'
import { Tag } from '@chakra-ui/react'
import CustomCheckbox from '../../forms/CustomCheckbox'

export interface LocationDetailsProps {
  phoneNo: string
  occupation: string
  residence: string
  subCountyName: string
  setSubCountyName: (subCounty: string) => void
  setPhoneNo: (phone: string) => void
  setOccupation: (occupation: string) => void
  setResidence: (residence: string) => void
}

const LocationDetails = ({
  phoneNo, occupation, residence, subCountyName,
  setPhoneNo, setOccupation, setResidence, setSubCountyName
}: LocationDetailsProps) => {
  const { data } = useGetAllOccupationQuery()
  const { data: countyData } = useGetAllCountiesQuery()
  const { data: subCountyData } = useGetAllSubCountiesQuery()
  const { data: wardData } = useGetAllWardsQuery()
  const { data: schoolsData } = useGetAllSchoolsQuery()

  console.log(schoolsData, 'dtc')
  const occupationOptions = useCallback(() => {
    return data?.map((item: OccupationProps) => ({
      id: item.id,
      label: item.occupationDescription
    }))
  }, [data])

  // county
  const countyOptions = useCallback(() => {
    return countyData?.map((item: CountyProps) => ({
      id: item.id,
      label: item.countyName
    }))
  }, [countyData])

  // sub counties
  const subCountyOptions = useCallback(() => {
    const tempData = subCountyData?.filter((item: any) =>
      item.county.id.includes(residence)
    )
    return tempData?.map((item: SubCountyProps) => ({
      id: item.id,
      label: item.subCountyName
    }))
  }, [subCountyData, residence])

  const schoolOptions = useCallback(() => {
    return schoolsData?.map((item: any) => ({
      id: item.id,
      label: item.schoolName
    }))
  }, [schoolsData])

  // ward options
  // const wardOptions = useCallback(() => {
  //   const tempData = wardData?.filter((item: any) =>
  //     item.subCountyName === subCountyName.label.toLowerCase()
  //   )
  //   console.log(subCountyName.label.toLowerCase(), 'trr')
  //   return tempData?.map((item: WardProps) => ({
  //     id: item.id,
  //     label: item.ward
  //   }))
  // }, [wardData, subCountyName])

  // const nos = [{
  //   value
  // }]

  const [numbers, setNumbers] = useState<string[]>([])
  const handleAddNumbers = () => {
    if (phoneNo.trim() !== '') {
      setNumbers([...numbers, phoneNo])
      setPhoneNo('')
    }
  }

  const [isOccupation, setIsOccupation] = useState<boolean>(false)
  const [iSStudent, setIsStudent] = useState<boolean>(false)

  return (
    <div
      className="border border-gray-200
        w-1/3 flex flex-col items-center
      justify-center rounded-lg p-5 gap-y-6 mt-2"
      style={{
        width: '100%'
      }}
    >
      <div className="w-full">
        <CustomInput
          label="Phone No."
          description="You can enter more than one phone number."
          value={phoneNo}
          onChange={setPhoneNo}
        />
        <div
          className="w-full flex justify-between
        items-center
        mt-2"
        >
          <Button
            size={'sm'}
            variant={'outline'}
            className="border-teal-600 shadow-none
          font-bold text-teal-600 uppercase
          "
            onClick={handleAddNumbers}
          >
            Add
          </Button>
          <div className="flex flex-row space-x-2">
            {numbers.map((item, idx) => (
              <Tag key={idx}> {item} </Tag>
            ))}
          </div>
        </div>
      </div>
      {/* {occupation} */}
      <div
        className={`w-full border border-slate-200 rounded-lg bg-slate-50 p-2 ${
          isOccupation && 'bg-white'
        }`}
      >
        <CustomCheckbox
          label="Occupation"
          description="Recommended for patients that are workin"
          value={isOccupation}
          onChange={setIsOccupation}
        />

        {isOccupation && (
          <div className="w-full pl-7 pt-2">
            <CustomSelect
              label="Select Occupation."
              value={occupation}
              onChange={setOccupation}
              data={occupationOptions()}
            />
          </div>
        )}
      </div>

      <div
        className={`w-full border border-slate-200  rounded-lg bg-slate-50 p-2 ${
          iSStudent && 'bg-white'
        }`}
      >
        <CustomCheckbox
          label="Student"
          description="Recommended for patients that are studyin"
          value={iSStudent}
          onChange={setIsStudent}
        />

        {iSStudent && (
          <div className="w-full pl-7 pt-2 pb-2 flex flex-col space-y-2">
            <CustomSelect
              label="School Name"
              value={occupation}
              onChange={setOccupation}
              data={occupationOptions()}
            />
            <CustomSelect
              label="Level"
              value={occupation}
              onChange={setOccupation}
              data={occupationOptions()}
            />
          </div>
        )}
      </div>

      {occupation === '8b326c14-2ee6-491d-a8b5-c1c2c55a5a07' && (
        <div className="w-full bg-gray-50 rounded-md border p-2">
          <CustomSelect
            label="School Name"
            value={occupation}
            onChange={setOccupation}
            data={schoolOptions()}
          />
        </div>
      )}

      <CustomSelect
        label="Select County"
        value={residence}
        onChange={setResidence}
        data={countyOptions()}
      />

      {/* sun county */}
      <CustomSelect
        label="Select Sub County"
        value={subCountyName}
        onChange={setSubCountyName}
        data={subCountyOptions()}
      />

      {/* select ward */}
      {/* <CustomSelect
        label="Select Ward"
        value={subCountyName}
        onChange={setSubCountyName}
        data={wardOptions()}
      /> */}
    </div>
  )
}

export default LocationDetails
