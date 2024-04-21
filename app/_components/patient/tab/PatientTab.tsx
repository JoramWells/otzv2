import CustomTab from '../../tab/CustomTab'
import { type InputTabProps } from './PatientDetailsContent'

interface DataProps {
  data: CategoryListProps[]
  value: {
    id: number
    params?: string
  }
  setValue: (val: InputTabProps) => void
}

export interface CategoryListProps {
  id: number
  label: string
}

const PatientTab = ({ data, value, setValue }: DataProps) => {
  return (

      <CustomTab categoryList={data} setValue={setValue} value={value} />
  )
}

export default PatientTab
