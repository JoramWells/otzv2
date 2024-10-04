/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useCallback, useState } from 'react'
import {
  type CountyProps,
  useGetAllCountiesQuery
} from '@/api/location/county.api'
import {
  type SubCountyProps,
  useGetAllSubCountiesQuery
} from '@/api/location/subCounty.api'
import { useGetAllWardsQuery } from '@/api/location/ward.api'
// import { useGetAllSchoolsQuery } from '@/api/school/school.api'
import { type SingleValue } from 'react-select'
import CustomSelect2 from '@/components/forms/CustomSelect2'
import CustomInput2 from '@/components/forms/CustomInput2'
import { FormProvider, useForm } from 'react-hook-form'
import { z, type ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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

interface FormInputProps {
  hospitalName: string
}

const AddFacility = () => {
  const { data: countyData } = useGetAllCountiesQuery()
  const { data: subCountyData } = useGetAllSubCountiesQuery()
  const { data: wardData } = useGetAllWardsQuery()

  const [county, setCounty] = useState<string>()
  const [subCounty, setSubCounty] = useState<string>()

  const Schema: ZodType<FormInputProps> = z.object({
    hospitalName: z.string().nonempty({ message: 'Input Required' })
  })

  // const { data: schoolsData } = useGetAllSchoolsQuery()

  // useEffect(() => {
  //   setLocation({
  //     county, subCounty, ward
  //   })
  // }, [county, setLocation, subCounty, ward])

  // county
  const countyOptions = useCallback(() => {
    return countyData?.map((item: CountyProps) => ({
      id: item.countyName,
      label: item.countyName
    }))
  }, [countyData])

  // sub counties
  const subCountyOptions = useCallback(() => {
    const tempData = subCountyData?.filter((item: any) =>
      item.county.countyName
        .toString()
        ?.toLowerCase()
        .includes(county?.toLowerCase())
    )
    return tempData?.map((item: SubCountyProps) => ({
      id: item.subCountyName,
      label: item.subCountyName
    }))
  }, [subCountyData, county])

  // const schoolOptions = useCallback(() => {
  //   return schoolsData?.map((item: any) => ({
  //     id: item.id,
  //     label: item.schoolName
  //   }))
  // }, [schoolsData])

  // ward options
  const wardOptions = useCallback(() => {
    const tempData = wardData?.filter((item: any) =>
      item.subCounty?.subCountyName
        ?.toLowerCase()
        .toString()
        .includes(subCounty?.toLowerCase())
    )
    return tempData?.map((item: any) => ({
      id: item.ward,
      label: item.ward
    }))
  }, [subCounty, wardData])

  const methods = useForm<FormInputProps>({
    resolver: zodResolver(Schema)
  })

  return (
    <>
      <div className='p-2' >
        <div className="p-4 border rounded-lg border-slate-200 bg-white w-1/2 ">
          <FormProvider {...methods}>
            <form action="" className='flex flex-col space-y-4' >
              {/* <Autocomplete
        className="border"
        apiKey="AIzaSyDSg2RZcb6i3EohltpyGWSd4GGnfWpA4bQ"
        onPlaceSelected={(place) => {
          console.log(place);
        }}
      /> */}

              <CustomInput2
                label="Facility Name"
                name="hospitalName"
                placeholder='Enter facility name'
                // onChange={setDOB}
              />

              <CustomSelect2
                label="Select County"
                // className="w-full mt-2 rounded-lg border-slate-200"
                // value={county}
                // onChange={setCounty}
                data={countyOptions()}
                name="county"
              />

              {/* sun county */}

              <CustomSelect2
                label="Select Sub County"
                // className="w-full mt-2"
                // value={subCounty}
                // onChange={setSubCounty}
                data={subCountyOptions()}
                name="subCounty"
              />

              {/* select ward */}

              <CustomSelect2
                label="Select Ward"
                // className="w-full mt-2"
                // value={ward}
                // onChange={setWard}
                data={wardOptions()}
                name="ward"
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  )
}

export default AddFacility