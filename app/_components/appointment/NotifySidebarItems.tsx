'use client'
import '../../globals.css'

import { useId } from 'react'
// import { SidebarButton } from './SidebarButton'
// import { SidebarCollapseButton } from './SidebarCollapseButton'
import {
  BarChartBig,
  BookCopy,
  CalendarDays,
  MessageSquareText,
  Phone
} from 'lucide-react'
import { SidebarCollapseButton } from '../dashboard/SidebarCollapseButton'

const NotifySidebarItems = () => {
  return (
    <>
      <SidebarCollapseButton
        label="Appointment"
        icon={<CalendarDays size={17} />}
        itemList={[
          {
            id: useId(),
            link: '/appointments/add-appointment',
            label: 'New Appointment'
          },
          {
            id: useId(),
            link: '/notify',
            label: 'View Appointments'
          }
        ]}
      />
      <SidebarCollapseButton
        label="SMS & Whatsapp"
        icon={<MessageSquareText size={17} />}
        itemList={[
          {
            id: useId(),
            link: '/notify/sms',
            label: 'SMSes'
          },
          {
            id: useId(),
            link: '/ovc',
            label: 'Whatsapp'
          }
        ]}
      />
      <SidebarCollapseButton
        label="Voice Call"
        icon={<Phone size={17} />}
        itemList={[
          {
            id: useId(),
            link: '/home-visits',
            label: 'Home Visit'
          },
          {
            id: useId(),
            link: '/add-home-visit',
            label: 'New Home Visit'
          }
        ]}
      />

      {/*  */}
      {/* <SidebarSubButton label="Insights"
      link="/appointment/insights"
      /> */}

      <div className="flex-1 border border-slate-200 ml-2 mr-2" />

      {/* s */}
      <SidebarCollapseButton
        label="Insights"
        link="appointment/insights"
        icon={<BarChartBig size={17} />}
      />
      <SidebarCollapseButton label="Reports" icon={<BookCopy size={17} />} />
    </>
  )
}

export default NotifySidebarItems

// 2.65cm
