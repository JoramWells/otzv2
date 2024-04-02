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
  PersonStanding,
  Tablets,
  ActivitySquare
} from 'lucide-react'

const SidebarItems = () => {
  return (
    <div className="z-40">
      {/* <SidebarButton /> */}
      <SidebarCollapseButton
        label="Dashboard"
        icon={<LayoutDashboard size={17} />}
        itemList={[
          {
            id: useId(),
            link: '/dashboard',
            label: 'Dashboard'
          },
          {
            id: useId(),
            link: '/dashboard/appointment',
            label: 'Appointment'
          },
          {
            id: useId(),
            link: '/dashboard/art',
            label: 'Drugs'
          },
          {
            id: useId(),
            link: '/dashboard/home-visit',
            label: 'Home Visit'
          },
          {
            id: useId(),
            link: '/dashboard/lab',
            label: 'Lab'
          },
          {
            id: useId(),
            link: '/dashboard/location',
            label: 'Location'
          },
          {
            id: useId(),
            link: '/dashboard/matrons',
            label: 'Matrons'
          },
          {
            id: useId(),
            link: '/dashboard/occupations',
            label: 'Occupations'
          },
          {
            id: useId(),
            link: '/dashboard/schools',
            label: 'Schools'
          },
          {
            id: useId(),
            link: '/dashboard/users',
            label: 'Users'
          }
        ]}
      />
      <SidebarCollapseButton
        label="Accounts"
        icon={<HandCoins size={17} />}
        itemList={[
          {
            id: useId(),
            link: '/',
            label: 'Petty Cash'
          }
        ]}
      />
      <SidebarCollapseButton
        label="Notify"
        link='notify'
        icon={<CalendarDays size={17} />}
        itemList={[
          {
            id: useId(),
            link: '/notify',
            label: 'Appointments'
          },
          {
            id: useId(),
            link: '/notify',
            label: 'SMS & Messages'
          },
          {
            id: useId(),
            link: '/notify',
            label: 'Voice Call'
          }
        ]}
      />
      <SidebarCollapseButton
        label="Enrollment"
        icon={<BookCheck size={17} />}
        itemList={[
          {
            id: useId(),
            link: '/enrollment/otz',
            label: 'OTZ'
          },
          {
            id: useId(),
            link: '/ovc',
            label: 'OVC'
          }
        ]}
      />
      <SidebarCollapseButton
        label="Facilities"
        icon={<Warehouse size={17} />}
      />
      <SidebarCollapseButton
        label="Home-Visits"
        icon={<Home size={17} />}
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
      <SidebarCollapseButton
        label="Lab"
        icon={<TestTubes size={17} />}
        itemList={[
          {
            id: useId(),
            link: '/lab',
            label: 'View Lab Requests'
          },
          {
            id: useId(),
            link: '/lab/lab-visits',
            label: 'Lab Visits'
          }
        ]}
      />
      <SidebarCollapseButton label="Pharmacy" icon={<Tablets size={17} />} />
      <SidebarCollapseButton label="PMTCT" icon={<Baby size={17} />} />
      <SidebarCollapseButton
        label="Treatment Plan"
        icon={<Syringe size={17} />}
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
        icon={<Users size={17} />}
        itemList={[
          {
            id: useId(),
            link: '/patients',
            label: 'View Patients'
          },
          {
            id: useId(),
            link: '/patients/add-patients',
            label: 'Add Patients'
          }
        ]}
      />

      <SidebarCollapseButton
        label="Pill-Box"
        icon={<Pill size={17} />}
        itemList={[
          {
            id: useId(),
            link: '/pill-box',
            label: 'View Pill Box'
          }
        ]}
      />
      <SidebarCollapseButton
        label="Support Group"
        icon={<PersonStanding size={17} />}
        itemList={[
          {
            id: useId(),
            link: '/',
            label: 'New Support Group'
          }
        ]}
      />

      {/*  */}
      <SidebarCollapseButton
        label="ViraTrack"
        link='viratrack'
        icon={<ActivitySquare size={17} />}
        itemList={[
          {
            id: useId(),
            link: '/track-tests',
            label: 'Tests'
          }
          // {
          //   id: useId(),
          //   link: "/patients/add-patients",
          //   label: "Add Patients",
          // },
        ]}
      />
    </div>
  )
}

export default SidebarItems
