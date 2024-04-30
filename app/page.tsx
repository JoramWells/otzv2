/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Bell, HomeIcon, LineChart, NotebookPen, PersonStanding, Pill, Shield, Users } from 'lucide-react'
import './globals.css'
import Link from 'next/link'
import { type ReactNode, Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { MenuSelect } from './_components/MenuSelect'

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
        link: '/administrator/patients'
      },
      {
        id: '3',
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
    label: 'Patients',
    icon: <PersonStanding />,
    link: '/patients/dashboard',
    listItem: [
      {
        id: '1',
        label: 'Dashboard',
        link: '/patients/dashboard'
      },
      {
        id: '2',
        label: 'Patients',
        link: '/patients/patients'
      },
      {
        id: '3',
        label: 'Enrollment',
        link: '/patients/enrollment'
      }
    ]
  },
  {
    id: '4',
    label: 'Users',
    icon: <Users />,
    link: '/users',
    listItem: [
      {
        id: '4',
        label: 'Dashboard',
        link: '/administrator/dashboard'
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
        id: '5',
        label: 'Dashboard',
        link: '/administrator/dashboard'
      }
    ]
  },
  {
    id: '6',
    label: 'ViraTrack',
    icon: <LineChart />,
    link: '/viratrack',
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
    <div className=" h-screen relative">
      <Suspense fallback={<Skeleton className="p-4 w-full" />}>
        <nav className="flex justify-between border-b border-slate-200 p-4 w-full">
          <div>Care +</div>
          <div>Login</div>
        </nav>
      </Suspense>

      {/* main */}
      <main className="flex flex-col  items-start w-full">
        <Suspense fallback={<Skeleton className="w-full p-4" />}>
          <div className="flex w-full p-4">
            <h1 className="text-center text-3xl font-extrabold text-teal-600">
              Welcome to CarePlus
            </h1>
          </div>
        </Suspense>

        <section
          className="p-4 flex w-full
      flex-row justify-start flex-wrap gap-4
      "
        >
          {itemList.map((item) => (
            <Suspense
              key={item.id}
              fallback={<Skeleton className="w-[430px] h-[250px]" />}
            >
              <div
                key={item.id}
                tabIndex={0}
                className="border border-slate-200 p-4 transition ease-in-out delay-150
          rounded-lg w-[420px] h-[170px] hover:cursor-pointer"
              >
                <div className="w-full flex justify-end">
                  <div
                    className="bg-slate-#f9be7c/50 hover:cursor-pointer transition ease-in-out delay-150
              rounded-lg p-1 hover:bg-slate-100 text-slate-500
              "
                  >
                    <MenuSelect dataList={item.listItem} />
                  </div>
                </div>
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
            </Suspense>
          ))}
        </section>
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
