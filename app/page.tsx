/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Bell, BookIcon, CalendarCheck, LineChart, Pill, SaveAll, Search, Shield, Users } from 'lucide-react'
import './globals.css'
import Link from 'next/link'
import { type ReactNode, Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { MenuSelect } from './_components/MenuSelect'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ListItemProps {
  id: string
  label: string
  link: string
}

interface ItemListProps {
  id: string
  label: string
  icon: ReactNode
  description?: string
  link: string
  listItem: ListItemProps[]
}

const itemList: ItemListProps[] = [
  {
    id: '1',
    label: 'Administrator',
    icon: <Shield color="#f9be7c" />,
    link: '/administrator/dashboard',
    listItem: [
      {
        id: '2',
        label: 'Patients',
        link: '/administrator/users'
      },
      {
        id: '3',
        label: 'Drugs',
        link: '/users/drugs'
      },
      {
        id: '5',
        label: 'Facilities',
        link: '/administrator/facilities'
      },
      {
        id: '6',
        label: 'Home Visit',
        link: '/administrator/home Visit'
      },
      {
        id: '7',
        label: 'Lab',
        link: '/administrator/lab'
      },
      {
        id: '8',
        label: 'Location',
        link: '/administrator/location'
      },
      {
        id: '9',
        label: 'Notifications',
        link: '/administrator/notifications'
      },
      {
        id: '10',
        label: 'Users',
        link: '/administrator/users'
      }
    ]
  },
  {
    id: '9',
    label: 'Appointments',
    icon: <CalendarCheck />,
    link: '/appointments/dashboard',
    description:
      'Manage Appointments',
    listItem: [
      {
        id: '8',
        label: 'Appointments',
        link: '/appointments?tab=all'
      }
    ]
  },
  {
    id: '8',
    label: 'Articles',
    icon: <BookIcon />,
    link: '/articles/dashboard',
    description:
      'Upload, manage and add patient learning materials for E-learning',
    listItem: [
      {
        id: '8',
        label: 'Articles',
        link: '/articles/dashboard'
      }
    ]
  },
  {
    id: '12',
    label: 'Enrollments',
    icon: <SaveAll />,
    link: '/enrollment/dashboard',
    listItem: [
      {
        id: '1',
        label: 'OTZ',
        link: '/administrator/dashboard'
      },
      {
        id: '2',
        label: 'OVC',
        link: '/administrator/dashboard'
      },
      {
        id: '3',
        label: 'PAMA',
        link: '/administrator/dashboard'
      },
      {
        id: '3',
        label: 'PMTCT',
        link: '/administrator/dashboard'
      }
    ]
  },
  {
    id: '2',
    label: 'Pill Box',
    icon: <Pill />,
    link: '/pill-box/dashboard',
    listItem: [
      {
        id: '1',
        label: 'Prescription',
        link: '/pill-box/prescriptions'
      },
      {
        id: '2',
        label: 'Reminder',
        link: '/pill-box/reminder'
      }
    ]
  },
  {
    id: '3',
    label: 'Users',
    icon: <Users />,
    link: '/users/dashboard',
    listItem: [
      {
        id: '2',
        label: 'Patients',
        link: '/users/patients'
      },
      {
        id: '3',
        label: 'Case manager',
        link: '/users/casemanager'
      },
      {
        id: '4',
        label: 'Caregiver',
        link: '/users/caregiver'
      },
      {
        id: '5',
        label: 'Enrollment',
        link: '/users/enrollment'
      }
    ]
  },
  {
    id: '5',
    label: 'Notify',
    icon: <Bell />,
    link: '/notify/dashboard',
    description:
      'Manage patient notifications. All settings for Whatsapp, SMS, Voice Call and App notifications.',
    listItem: [
      {
        id: '1',
        label: 'Appointments',
        link: '/notify/appointments?tab=all'
      },
      {
        id: '2',
        label: 'Chats',
        link: '/notify/chats'
      },
      {
        id: '3',
        label: 'Messaging',
        link: '/notify/messaging'
      },
      {
        id: '4',
        label: 'Notifications',
        link: '/notify/notifications'
      }
    ]
  },
  {
    id: '6',
    label: 'ViraTrack',
    icon: <LineChart />,
    link: '/viratrack/dashboard',
    listItem: [
      {
        id: '6',
        label: 'Dashboard',
        link: '/administrator/dashboard'
      }
    ]
  }
]

export default function Home () {
  return (
    <div className="min-h-screen relative bg-slate-50">
      <Suspense fallback={<Skeleton className="p-4 w-full" />}>
        <nav
          className="flex justify-between
        bg-white
        border-slate-200 p-4 w-full"
        >
          <div>Care +</div>
          <Button className="bg-teal-600 shadow-none hover:bg-teal-700">
            Login
          </Button>
        </nav>
      </Suspense>

      {/* main */}
      <main className="flex flex-col  items-start w-full">
        <div className="flex flex-col justify-center items-center w-full">
          <Suspense fallback={<Skeleton className="w-3/4 p-2" />}>
            <div className="flex w-full p-4 xl:p-2 justify-between items-center bg-white mt-2 mb-2 rounded-lg">
              <h1 className="text-center text-2xl lg:text-2xl min-[1920px]:text-sm font-extrabold text-teal-600">
                Welcome to CarePlus +
              </h1>

              <div
                className="w-[410px] flex flex-row items-center
              justify-between space-x-4 "
              >
                <Input
                  className="shadow-none rounded-full p-4 h-10 bg-slate-50 border-none"
                  placeholder="Search.."
                />
                <Button className="bg-slate-50 hover:bg-slate-50 shadow-none">
                  <Search className="text-slate-500" />
                </Button>
              </div>
            </div>
          </Suspense>
          <div className="grid w-full grid-cols-4 gap-4 xl:gap-4">
            {itemList.map((item) => (
              <Suspense
                key={item.id}
                fallback={<Skeleton className="w-[335px] xl:w-[300px] h-[150px]" />}
              >
                <div
                  key={item.id}
                  tabIndex={0}
                  className="border-slate-200 p-4 transition ease-in-out delay-150
          rounded-lg w-[335px] h-[150px] hover:cursor-pointer bg-white shadow-slate-100 shadow-lg"
                >
                  <div className="w-full flex justify-end">
                    <MenuSelect dataList={item.listItem} />
                  </div>
                  <div className="w-full flex flex-row space-x-4 justify-start items-start">
                    <div
                      className="bg-slate-100 hover:cursor-pointer transition ease-in-out delay-150
                    p-1 hover:bg-slate-100 text-slate-500 rounded-full
              "
                    >
                      {item.icon}
                    </div>
                    <div>
                      <Link
                        className="text-xl font-bold hover:underline"
                        href={item.link}
                      >
                        {item.label}
                      </Link>
                      <p className="text-slate-500 text-sm mt-2">
                        {item.description
                          ? item.description
                          : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime'}
                      </p>
                    </div>
                  </div>
                </div>
              </Suspense>
            ))}
          </div>
        </div>
      </main>
      <footer className="absolute bottom-0 p-4 w-full text-center bg-white">
        <p className="text-slate-700 font-bold">
          Powered by Synergy Data Group
        </p>
        <p className="text-sm text-slate-500">
          Copyright @2024 . Terms and Conditions Applied
        </p>
      </footer>
    </div>
  )
}
