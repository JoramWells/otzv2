/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Search } from 'lucide-react'
import './globals.css'
import Link from 'next/link'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { MenuSelect } from './_components/MenuSelect'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Footer from '@/components/Footer'

interface ListItemProps {
  id: string
  label: string
  link: string
}

interface ItemListProps {
  id: string
  label: string
  src: string
  description?: string
  link: string
  listItem: ListItemProps[]
}

const itemList: ItemListProps[] = [
  {
    id: '1',
    label: 'Administrator',
    link: '/administrator/dashboard',
    src: '/img/admin.png',
    description: 'Manage user registration, medicine, schools...',
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
    src: '/img/calendar.png',
    link: '/appointments/dashboard',
    description: 'Manage System, Patient and Users Appointments',
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
    src: '/img/book.png',

    link: '/articles/books',
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
    src: '/img/clipboard.png',

    link: '/enrollment/dashboard',
    description: 'Manage patient enrollment (OTZ, OVC & PAMA) ',
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
    id: '13',
    label: 'ETL',
    src: '/img/database.png',

    link: '/etl/dashboard',
    description: 'Extract, Transform & Load CSV Data',
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
    id: '11',
    label: 'Home Visit',
    src: '/img/home.png',

    link: '/home-visit',
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
    id: '2',
    label: 'Pill Box',
    link: '/pill-box/dashboard',
    src: '/img/pill.png',

    description:
      'Patient Prescription, track drug uptake, reminders. Manage daily pill reminders.',
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
    link: '/users/dashboard',
    src: '/img/user.png',

    description: 'Manage patient, caregiver and case managers registration',
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
    link: '/notify/dashboard',
    src: '/img/notification-bell.png',

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
    link: '/viratrack/dashboard',
    src: '/img/graph.png',

    description: 'Track patient Viral load',
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
          <Image
            src={'/img/logo1.svg'}
            alt="img"
            width={0}
            height={0}
            style={{ width: '90px', height: 'auto' }}

            // quality={100}
          />
          <Button className="bg-teal-600 shadow-none hover:bg-teal-700">
            Login
          </Button>
        </nav>
      </Suspense>

      {/* main */}
      <main className="flex flex-col  items-center w-full">
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
          <div className="grid p-2 w-full grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
            {itemList.map((item) => (
              <Suspense
                key={item.id}
                fallback={<Skeleton className="h-[150px]" />}
              >
                <div
                  key={item.id}
                  tabIndex={0}
                  className="border-slate-200 p-4 transition ease-in-out delay-150
          rounded-lg h-[150px] hover:cursor-pointer bg-white shadow-slate-100 shadow-lg"
                >
                  <div className="w-full flex justify-end">
                    <MenuSelect dataList={item.listItem} />
                  </div>
                  <div className="w-full flex flex-row space-x-4 justify-start items-start">
                    <Image
                      src={item.src}
                      alt="img"
                      width={80}
                      height={80}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'contain'
                      }}

                      // quality={100}
                    />
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
<Footer/>
    </div>
  )
}
