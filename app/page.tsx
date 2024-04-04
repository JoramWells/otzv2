import { Bell, HomeIcon, LineChart, NotebookPen, PersonStanding, Pill, Shield, Users } from 'lucide-react'
import './globals.css'
import Link from 'next/link'

const itemList = [
  {
    id: '1',
    label: 'Administrator',
    icon: <Shield />,
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
    link: '/notify'
  },
  {
    id: '6',
    label: 'ViraTrack',
    icon: <LineChart />,
    link: '/viratrack'
  },
  {
    id: '7',
    label: 'Treatment Plan',
    icon: <NotebookPen />,
    link: '/treatment-plan'
  },
  {
    id: '8',
    label: 'Home Visit',
    icon: <HomeIcon />,
    link: '/home-visits'
  }
]

export default function Home () {
  return (
    <main className="flex screen flex-col justify-between">
      <nav className="flex justify-between border-b border-slate-200 p-4">
        <div>Care +</div>
        <div>Login</div>
      </nav>
      <div
      className='flex w-full p-4'
      >
        <h1 className="text-center text-xl">welcome</h1>
      </div>

      <div
        className="p-4 flex
      flex-row justify-start flex-wrap gap-4
      "
      >
        {itemList.map((item) => (
          <div
            key={item.id}
            className="border border-slate-200 p-4
          rounded-lg w-[350px] h-[150px]

          "
          >
            <div className="w-full flex justify-end">
              <div
                className="bg-slate-200 hover:cursor-pointer
              rounded-lg p-1 hover:bg-slate-100 text-slate-500
              "
              >
                {item.icon}
              </div>
            </div>
            <Link className="text-xl font-semibold"
            href={item.link}
            >{item.label}</Link>
            <p className="text-slate-500 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
