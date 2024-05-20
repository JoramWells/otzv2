'use client'
import { type OccupationProps, useGetAllOccupationQuery } from '@/api/occupation.api'
import { useCallback, useEffect, useState } from 'react'
import { type CountyProps, useGetAllCountiesQuery } from '@/api/location/county.api'
import { type SubCountyProps, useGetAllSubCountiesQuery } from '@/api/location/subCounty.api'
import { useGetAllWardsQuery } from '@/api/location/ward.api'
import { useGetAllSchoolsQuery } from '@/api/school/school.api'
import CustomCheckbox from '@/components/forms/CustomCheckbox'
import CustomInput from '@/components/forms/CustomInput'
import CustomSelect from '@/components/forms/CustomSelect'
import Select, { type SingleValue } from 'react-select'
export interface WardProps {
  ward: SingleValue<SelectOption>
}

export interface InputProps {
  county: {
    name: string
    subCounty: {
      id: string
      name: string
      ward: SelectOption

    }
  }
}

interface SelectOption {
  id: string
  label: string
}

export interface InputSubCountyProps {
  subCounty: SingleValue<WardProps>
}

export interface InputCountyProps {
  county: SingleValue<SelectOption>
  subCounty: SingleValue<SelectOption>
  ward: SingleValue<SelectOption>
}

export interface LocationDetailsProps {
  phoneNo: string
  occupation: string
  schoolName: string
  setPhoneNo: (phone: string) => void
  setOccupation: (occupation: string) => void
  setSchoolName: (residence: string) => void
  setLocation: (val: InputCountyProps) => void
}

const LocationDetails = ({
  phoneNo, occupation, schoolName, setLocation,
  setPhoneNo, setOccupation, setSchoolName
}: LocationDetailsProps) => {
  const { data } = useGetAllOccupationQuery()
  const { data: countyData } = useGetAllCountiesQuery()
  const { data: subCountyData } = useGetAllSubCountiesQuery()
  const { data: wardData } = useGetAllWardsQuery()
  const { data: schoolsData } = useGetAllSchoolsQuery()

  const [county, setCounty] = useState<SingleValue<SelectOption>>(null)
  const [subCounty, setSubCounty] = useState<SingleValue<SelectOption>>(null)
  const [ward, setWard] = useState<SingleValue<SelectOption>>(null)

  useEffect(() => {
    setLocation({
      county, subCounty, ward
    })
  }, [county, setLocation, subCounty, ward])

  console.log(wardData, 'dtc')
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
      item.county.id.toString().includes(county?.id)
    )
    return tempData?.map((item: SubCountyProps) => ({
      id: item.id,
      label: item.subCountyName
    }))
  }, [subCountyData, county])

  const schoolOptions = useCallback(() => {
    return schoolsData?.map((item: any) => ({
      id: item.id,
      label: item.schoolName
    }))
  }, [schoolsData])

  // ward options
  const wardOptions = useCallback(() => {
    const tempData = wardData?.filter((item: any) =>
      item.subCounty?.id.toString().includes(subCounty?.id)
    )
    return tempData?.map((item: any) => ({
      id: item.id,
      label: item.ward
    }))
  }, [subCounty?.id, wardData])

  // const nos = [{
  //   value
  // }]

  // const [numbers, setNumbers] = useState<string[]>([])
  // const handleAddNumbers = () => {
  //   if (phoneNo.trim() !== '') {
  //     setNumbers([...numbers, phoneNo])
  //     setPhoneNo('')
  //   }
  // }

  const [isOccupation, setIsOccupation] = useState<boolean>(false)
  const [iSStudent, setIsStudent] = useState<boolean>(false)

  return (
    <div
      className="bg-white w-1/3 flex flex-col items-center
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
          description="Recommended for patients that are studying"
          value={iSStudent}
          onChange={setIsStudent}
        />

        {iSStudent && (
          <div className="w-full pl-7 pt-2 pb-2 flex flex-col space-y-2">
            <CustomSelect
              label="School Name"
              value={occupation}
              onChange={setOccupation}
              data={schoolOptions()}
            />
          </div>
        )}
      </div>

      <Select
      className='w-full'
        value={county}
        onChange={setCounty}
        options={countyOptions()}
      />

      {/* sun county */}
      <Select
      className='w-full'
        value={subCounty}
        onChange={setSubCounty}
        options={subCountyOptions()}
      />

      {/* select ward */}
      <Select
      className='w-full'
        value={ward}
        onChange={setWard}
        options={wardOptions()}
      />
    </div>
  )
}

export default LocationDetails
