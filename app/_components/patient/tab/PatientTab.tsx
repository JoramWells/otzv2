import CustomTab from '../../tab/CustomTab'

interface DataProps {
  data: CategoryListProps[]
  value: number
  setValue: (val: number) => void
}

export interface CategoryListProps {
  id: number
  label: string
}

const PatientTab = ({ data, value, setValue }: DataProps) => {
  return <CustomTab categoryList={data} setValue={setValue} value={value} />
}

export default PatientTab
