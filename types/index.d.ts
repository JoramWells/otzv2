import { type ReactNode } from 'react'

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
