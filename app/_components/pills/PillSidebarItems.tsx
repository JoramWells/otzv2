'use client'
import '../../globals.css'

// import { useId } from 'react'
// import { SidebarButton } from './SidebarButton'
// import { SidebarCollapseButton } from './SidebarCollapseButton'
import {
  BookCopy,
  CalendarDays,
  MessageSquareText
} from 'lucide-react'
import { SidebarCollapseButton } from '../dashboard/SidebarCollapseButton'

const PillSidebarItems = () => {
  return (
    <>
      <SidebarCollapseButton
        label="Dashboard"
        link="pill-box"
       icon={<CalendarDays size={17} />}
      />
      <SidebarCollapseButton
        label="Patients"
        link="pill-box/patient"
        icon={<MessageSquareText size={17} />}
        // itemList={[
        //   {
        //     id: useId(),
        //     label: 'SMSes'
        //   },
        //   {
        //     id: useId(),
        //     link: '/ovc',
        //     label: 'Whatsapp'
        //   }
        // ]}
      />

      <SidebarCollapseButton
        label="Daily Uptake"
        icon={<BookCopy size={17} />}
        link="pill-box/daily-uptake"
      />
      <SidebarCollapseButton label="Reports" icon={<BookCopy size={17} />} />
    </>
  )
}

export default PillSidebarItems

// 2.65cm
