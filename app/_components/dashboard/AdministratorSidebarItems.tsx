'use client'
import '../../globals.css'

import { useId } from 'react'
// import { SidebarButton } from './SidebarButton'
import { SidebarCollapseButton } from './SidebarCollapseButton'
import {
  LayoutDashboard,
  CalendarDays,
  BookCheck,
  Warehouse,
  TestTubes,
  Baby,
  Users,
  Syringe,
  Home,
  PersonStanding,
  Tablets,
  ActivitySquare
} from 'lucide-react'

const AdministratorSidebarItems = () => {
  return (
    <div className="z-40">
      {/* <SidebarButton /> */}
      <SidebarCollapseButton
        link="administrator"
        label="Administrator"
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
        label="Appointment"
        link="administrator/appointment"
        icon={<CalendarDays size={17} />}
        itemList={[
          {
            id: useId(),
            link: '/notify',
            label: 'Aenda'
          },
          {
            id: useId(),
            link: '/notify',
            label: 'Status'
          }
        ]}
      />
      <SidebarCollapseButton
        label="ART"
        link="administrator/art"
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
      <SidebarCollapseButton label="Location" icon={<Tablets size={17} />} />
      <SidebarCollapseButton label="Scools" icon={<Baby size={17} />} />
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
        label="Users"
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
        label="Occupation"
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
        label="Matrons"
        link="viratrack"
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

export default AdministratorSidebarItems
