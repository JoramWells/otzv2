import CustomTab from '../../../../components/tab/CustomTab'

interface DataProps {
  data: CategoryListProps[]
  value: string | null
  setValue: (val: string) => void
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
