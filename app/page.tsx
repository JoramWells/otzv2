/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Bell, HomeIcon, LineChart, NotebookPen, PersonStanding, Pill, Shield, Users } from 'lucide-react'
import './globals.css'
import Link from 'next/link'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const itemList = [
  {
    id: '1',
    label: 'Administrator',
    icon: <Shield color="#f9be7c" />,
    link: '/administrator'
  },
  {
    id: '2',
    label: 'Pill Box',
    icon: <Pill />,
    link: '/pill-box'
  },
  {
    id: '3',
    label: 'Patient',
    icon: <PersonStanding />,
    link: '/patients'
  },
  {
    id: '4',
    label: 'Users',
    icon: <Users />,
    link: '/users'
  },
  {
    id: '5',
    label: 'Notify',
    icon: <Bell />,
    link: '/notify',
    description:
      'Manage patient notifications. All settings for Whatsapp, SMS, Voice Call and App notifications.'
  },
  {
    id: '6',
    label: 'ViraTrack',
    icon: <LineChart />,
    link: '/viratrack'
  },
  {
    id: '7',
    label: 'Pharmacy',
    icon: <NotebookPen />,
    link: '/pharmacy'
  },
  {
    id: '8',
    label: 'Articles',
    icon: <HomeIcon />,
    link: '/home-visits',
    description: 'Upload, manage and add patient learning materials for E-learning'
  },
  {
    id: '9',
    label: 'Lab',
    icon: <HomeIcon />,
    link: '/lab'
  },
  {
    id: '10',
    label: 'Reports',
    icon: <HomeIcon />,
    link: '/reports'
  }
]

export default function Home () {
  return (
    <main className="flex flex-col  items-start w-full h-screen relative">
      <Suspense fallback={<Skeleton className="p-4 w-full" />}>
        <nav className="flex justify-between border-b border-slate-200 p-4 w-full">
          <div>Care +</div>
          <div>Login</div>
        </nav>
      </Suspense>

      <Suspense fallback={<Skeleton className="w-full p-4" />}>
        <div className="flex w-full p-4">
          <h1 className="text-center text-3xl font-extrabold text-teal-600">
            Welcome to CarePlus
          </h1>
        </div>
      </Suspense>

      <section
        className="p-4 flex
      flex-row justify-start flex-wrap gap-4
      "
      >
        {itemList.map((item) => (
          <Suspense
            key={item.id}
            fallback={<Skeleton className="w-[350px] h-[150px]" />}
          >
            <div
              key={item.id}
              className="border border-slate-200 p-4
          rounded-lg w-[350px] h-[150px] hover:bg-slate-50

          "
            >
              <div className="w-full flex justify-end">
                <div
                  className="bg-slate-#f9be7c/50 hover:cursor-pointer
              rounded-lg p-1 hover:bg-slate-100 text-slate-500
              "
                >
                  {item.icon}
                </div>
              </div>
              <Link
                className="text-xl font-bold hover:underline"
                href={item.link}
              >
                {item.label}
              </Link>
              <p className="text-slate-500 text-sm">
                {item.description
                  ? item.description
                  : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime'}
              </p>
            </div>
          </Suspense>
        ))}
      </section>
      <div
      className='absolute bottom-0 p-4 w-full text-center'
      >
        <p
        className='text-slate-700'
        >Powered by Synergy Data Group</p>
        <p
        className='text-sm text-slate-500'
        >Copyright @2024 . Terms and Conditions Applied</p>
      </div>
    </main>
  )
}
