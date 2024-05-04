import { type ReactNode } from 'react'

declare interface CustomInputProps {
  label?: string
  placeholder?: string
  value?: string
  type?: string
  description?: string
  onChange: (value: any) => void
}

declare interface InputEventProps extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    value: string
    name?: string
  }
}

declare interface SideBarCollapseButtonProps {
  icon?: ReactNode
  label: string
  link?: string
  itemList?: Array<{
    id?: string
    link: string
    label: string
  }>
}

// patient column
declare interface PatientProps {
  User: any
  Patient: any
  id: string
  firstName: string
  middleName: string
  sex: string
  cccNo: string
  populationType: string
  phoneNo: string
  dob: string
}
