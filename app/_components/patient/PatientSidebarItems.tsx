'use client'
import '../../globals.css'

import { useId } from 'react'
// import { SidebarButton } from './SidebarButton'
// import { SidebarCollapseButton } from './SidebarCollapseButton'
import {
  BookCopy,
  CalendarDays,
  MessageSquareText,
  Phone
} from 'lucide-react'
import { SidebarCollapseButton } from '../dashboard/SidebarCollapseButton'

const PatientSidebarItems = () => {
  return (
    <>
      <SidebarCollapseButton
        label="Viratrack"
        link='viratrack'
        icon={<CalendarDays size={17} />}
        // itemList={[
        //   {
        //     id: useId(),
        //     link: '/appointments/add-appointment',
        //     label: 'New Appointment'
        //   },
        //   {
        //     id: useId(),
        //     link: '/notify/appointment',
        //     label: 'View Appointments'
        //   }
        // ]}
      />
      <SidebarCollapseButton
        label="Patients"
        link="viratrack/patients"
        icon={<MessageSquareText size={17} />}
        // itemList={[
        //   {
        //     id: useId(),
        //     link: '',
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

      <SidebarCollapseButton label="Reports" icon={<BookCopy size={17} />} />
    </>
  )
}

export default PatientSidebarItems

// 2.65cm
