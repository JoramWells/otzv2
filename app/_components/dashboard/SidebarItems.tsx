'use client'
import '../../globals.css'

import { useId } from 'react'
// import { SidebarButton } from './SidebarButton'
import { SidebarCollapseButton } from './SidebarCollapseButton'
import {
  LayoutDashboard,
  HandCoins,
  CalendarDays,
  BookCheck,
  Warehouse,
  TestTubes,
  Pill,
  Baby,
  Users,
  Syringe,
  Home,
  PersonStanding
} from 'lucide-react'

const SidebarItems = () => {
  return (
    <div className="z-40">
      <div className="h-12 flex items-center justify-center font-xl font-extrabold">
        <p>OTZ</p>
      </div>
      {/* <SidebarButton /> */}
      <SidebarCollapseButton
        label="Dashboard"
        icon={<LayoutDashboard size={18} />}
        itemList={[
          {
            id: useId(),
            link: '/dashboard',
            label: 'Dashboard'
          },
          {
            id: useId(),
            link: '/art',
            label: 'Drugs'
          },
          {
            id: useId(),
            link: '/dashboard/users',
            label: 'Users'
          },
          {
            id: useId(),
            link: '/dashboard/home-visit',
            label: 'Home Visit'
          }
        ]}
      />
      <SidebarCollapseButton
        label="Accounts"
        icon={<HandCoins size={18} />}
        itemList={[
          {
            id: useId(),
            link: '/',
            label: 'Petty Cash'
          }
        ]}
      />
      <SidebarCollapseButton
        label="Appointments"
        icon={<CalendarDays size={18} />}
        itemList={[
          {
            id: useId(),
            link: '/',
            label: 'New Appointment'
          },
          {
            id: useId(),
            link: '/',
            label: 'View Appointments'
          }
        ]}
      />
      <SidebarCollapseButton
        label="Enrollments"
        icon={<BookCheck size={18} />}
      />
      <SidebarCollapseButton
        label="Facilities"
        icon={<Warehouse size={18} />}
      />
      <SidebarCollapseButton
        label="Home Visits"
        icon={<Home size={18} />}
        itemList={[
          {
            id: useId(),
            link: '/add-home-visit',
            label: 'New Home Visit'
          }
        ]}
      />
      <SidebarCollapseButton label="Lab" icon={<TestTubes size={18} />} />
      <SidebarCollapseButton label="Pharmacy" icon={<Pill size={18} />} />
      <SidebarCollapseButton label="PMTCT" icon={<Baby size={18} />} />
      <SidebarCollapseButton
        label="Treatment Plan"
        icon={<Syringe size={18} />}
        itemList={[
          {
            id: useId(),
            link: '/add-treatment-plan',
            label: 'New Treatment Plan'
          }
        ]}
      />
      <SidebarCollapseButton
        label="Patients"
        icon={<Users size={18} />}
        itemList={[
          {
            id: useId(),
            link: '/patients',
            label: 'View Patients'
          },
          {
            id: useId(),
            link: '/patents/add-patients',
            label: 'Add Patients'
          }
        ]}
      />
      <SidebarCollapseButton label="Charges" />
      <SidebarCollapseButton
        label="Support Group"
        icon={<PersonStanding size={18} />}
        itemList={[
          {
            id: useId(),
            link: '/',
            label: 'New Support Group'
          }
        ]}
      />
    </div>
  )
}

export default SidebarItems
