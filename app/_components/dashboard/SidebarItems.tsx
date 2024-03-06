'use client'

import { useId } from 'react'
// import { SidebarButton } from './SidebarButton'
import { SidebarCollapseButton } from './SidebarCollapseButton'
const SidebarItems = () => {
  return (
    <div className="z-40">
      <div className="h-12 flex items-center justify-center font-xl font-extrabold">
        <p>OTZ</p>
      </div>
      {/* <SidebarButton /> */}
      <SidebarCollapseButton
        label="Dashboard"
        itemList={[
          {
            id: useId(),
            link: '/dashboard',
            label: 'Dashboard'
          }
        ]}
      />
      <SidebarCollapseButton
        label="Accounts"
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
      <SidebarCollapseButton label="Bike Mileage" />
      <SidebarCollapseButton label="Enrollments" />
      <SidebarCollapseButton label="Facilities" />
      <SidebarCollapseButton
        label="Home Visits"
        itemList={[
          {
            id: useId(),
            link: '/add-home-visit',
            label: 'New Home Visit'
          }
        ]}
      />
      <SidebarCollapseButton label="HEI" />
      <SidebarCollapseButton label="Lab" />
      <SidebarCollapseButton label="Pharmacy" />
      <SidebarCollapseButton label="PMTCT" />
      <SidebarCollapseButton
        label="Treatment Plan"
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
