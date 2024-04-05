'use client'
import '../../globals.css'

import { SidebarCollapseButton } from '../dashboard/SidebarCollapseButton'
import { type ReactNode } from 'react'

interface ItemListProps {
  id: string
  link: string
  label: string
}

export interface SidebarListItemsProps {
  id: string
  label: string
  link: string
  icon: ReactNode
  itemList?: ItemListProps[]
}

interface SidebarProps {
  dataList: SidebarListItemsProps[]
}

const SidebarListItemsComponent = ({ dataList }: SidebarProps) => {
  return (
    <>
      {dataList.map((item) => (
        <SidebarCollapseButton
        link={item.link}
          key={item.id}
          label={item.label}
          icon={item.icon}
          itemList={item.itemList}
        />
      ))}
    </>
  )
}

export default SidebarListItemsComponent

// 2.65cm
