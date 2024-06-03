'use client'
import { type OccupationProps, useGetAllOccupationQuery } from '@/api/occupation.api'
import { useCallback } from 'react'
import { type CountyProps, useGetAllCountiesQuery } from '@/api/location/county.api'
import { type SubCountyProps, useGetAllSubCountiesQuery } from '@/api/location/subCounty.api'
import { useGetAllWardsQuery } from '@/api/location/ward.api'
// import { useGetAllSchoolsQuery } from '@/api/school/school.api'
import { type SingleValue } from 'react-select'
import CustomSelect2 from '@/components/forms/CustomSelect2'
import CustomInput2 from '@/components/forms/CustomInput2'
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

const LocationDetails = ({ county, subCounty }: { county: string, subCounty: string }) => {
  const { data } = useGetAllOccupationQuery()
  const { data: countyData } = useGetAllCountiesQuery()
  const { data: subCountyData } = useGetAllSubCountiesQuery()
  const { data: wardData } = useGetAllWardsQuery()
  // const { data: schoolsData } = useGetAllSchoolsQuery()

  // useEffect(() => {
  //   setLocation({
  //     county, subCounty, ward
  //   })
  // }, [county, setLocation, subCounty, ward])

  const occupationOptions = useCallback(() => {
    return data?.map((item: OccupationProps) => ({
      id: item.occupationDescription,
      label: item.occupationDescription
    }))
  }, [data])

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
      item.county.countyName.toString()?.toLowerCase().includes(county?.toLowerCase())
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
      item.subCounty?.subCountyName?.toLowerCase().toString().includes(subCounty?.toLowerCase())
    )
    return tempData?.map((item: any) => ({
      id: item.ward,
      label: item.ward
    }))
  }, [subCounty, wardData])

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

  // const [isOccupation] = useState<boolean>(false)
  // const [iSStudent] = useState<boolean>(false)

  return (
    <>
      <CustomInput2
        label="Phone No."
        description="You can enter more than one phone number."
        name="phoneNo"
        // onChange={setPhoneNo}
      />
      {/* {occupation} */}

      <CustomSelect2
        label="Select Occupation."
        name={'occupation'}
        // onChange={setOccupation}
        data={occupationOptions()}
      />

      <CustomSelect2
        label="Select Education Level."
        name={'educationLevel'}
        // onChange={setOccupation}
        data={[
          {
            id: 'Pre-Primary Education',
            label: 'Pre-Primary Education'
          },
          {
            id: 'Lower Primary Education',
            label: 'Lower Primary Education'
          },
          {
            id: 'Upper Primary',
            label: 'Upper Primary'
          }
        ]}
      />

      {/* <CustomSelect2
            label="School Name"
            name='schoolName'
            // onChange={setOccupation}
            data={schoolOptions()}
          /> */}

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
    </>
  )
}

export default LocationDetails
