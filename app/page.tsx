/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Bell, HomeIcon, LineChart, NotebookPen, Pill, Search, Shield, Users } from 'lucide-react'
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
    link: '/administrator',
    listItem: [
      {
        id: '1',
        label: 'Dashboard',
        link: '/administrator/dashboard'
      },
      {
        id: '2',
        label: 'Patients',
        link: '/administrator/users'
      },
      {
        id: '3',
        label: 'Caregiver',
        link: '/users/caregiver'
      },
      {
        id: '5',
        label: 'Enrollment',
        link: '/administrator/enrollment'
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
        id: '2',
        label: 'Dashboard',
        link: '/administrator/dashboard'
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
    link: '/notify',
    description:
      'Manage patient notifications. All settings for Whatsapp, SMS, Voice Call and App notifications.',
    listItem: [
      {
        id: '1',
        label: 'Appointments',
        link: '/notify/appointments'
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
  },
  {
    id: '7',
    label: 'Pharmacy',
    icon: <NotebookPen />,
    link: '/pharmacy',
    listItem: [
      {
        id: '7',
        label: 'Dashboard',
        link: '/administrator/dashboard'
      }
    ]
  },
  {
    id: '8',
    label: 'Articles',
    icon: <HomeIcon />,
    link: '/articles',
    description:
      'Upload, manage and add patient learning materials for E-learning',
    listItem: [
      {
        id: '8',
        label: 'Dashboard',
        link: '/administrator/dashboard'
      }
    ]
  },
  {
    id: '9',
    label: 'Lab',
    icon: <HomeIcon />,
    link: '/lab',
    listItem: [
      {
        id: '9',
        label: 'Dashboard',
        link: '/administrator/dashboard'
      }
    ]
  },
  {
    id: '10',
    label: 'Reports',
    icon: <HomeIcon />,
    link: '/reports',
    listItem: [
      {
        id: '10',
        label: 'Dashboard',
        link: '/administrator/dashboard'
      }
    ]
  }
]

export default function Home () {
  return (
    <div className="min-h-screen relative">
      <Suspense fallback={<Skeleton className="p-4 w-full" />}>
        <nav className="flex justify-between border-b border-slate-200 p-4 w-full">
          <div>Care +</div>
          <div>Login</div>
        </nav>
      </Suspense>

      {/* main */}
      <main className="flex flex-col  items-start w-full">
        <div className="flex flex-col justify-center items-center w-full">
          <Suspense fallback={<Skeleton className="w-3/4 p-4" />}>
            <div className="flex w-3/4 p-4 justify-between items-center">
              <h1 className="text-center text-3xl font-extrabold text-teal-600">
                Welcome to CarePlus
              </h1>

              <div
                className="w-[410px] flex flex-row items-center
              justify-between space-x-4"
              >
                <Input
                  className="shadow-none rounded-full p-4 h-10"
                  placeholder="Search.."
                />
                <Button className="bg-slate-50 hover:bg-slate-50 shadow-none">
                  <Search className="text-slate-500" />
                </Button>
              </div>
            </div>
          </Suspense>
          <div
            className="p-4 flex w-3/4 lg:w-full items-center
      flex-row justify-start flex-wrap gap-4
      "
          >
            {itemList.map((item) => (
              <Suspense
                key={item.id}
                fallback={<Skeleton className="w-[380px] h-[150px]" />}
              >
                <div
                  key={item.id}
                  tabIndex={0}
                  className="border border-slate-200 p-4 transition ease-in-out delay-150
          rounded-lg w-[380px] h-[150px] hover:cursor-pointer"
                >
                  <div className="w-full flex justify-end">

                      <MenuSelect dataList={item.listItem} />
                  </div>
                  <div
                  className='w-full flex flex-row space-x-4 justify-start items-start'
                  >
                                  <div
                      className="bg-slate-100 hover:cursor-pointer transition ease-in-out delay-150
                    p-1 hover:bg-slate-100 text-slate-500 rounded-full
              "
                    >

                      {item.icon}</div>
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
      <footer className="absolute bottom-0 p-4 w-full text-center">
        <p className="text-slate-700">Powered by Synergy Data Group</p>
        <p className="text-sm text-slate-500">
          Copyright @2024 . Terms and Conditions Applied
        </p>
      </footer>
    </div>
  )
}
