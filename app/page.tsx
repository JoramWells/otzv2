/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { Clock, Search } from 'lucide-react'
import './globals.css'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
// import { MenuSelect } from './_components/MenuSelect'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AuthenticateLoader from '@/components/AuthenticateLoader'
import { UserAccount } from '@/components/users/UserAccount'
import { AppModuleSessionInterface, type AppModuleInterface, type UserInterface } from 'otz-types'
import axios from 'axios'
import { type Url } from 'url'
import { ExtendedAppModuleSession } from '@/api/appModules/appModuleSession.api'
import moment from 'moment'

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

const administrator: AppModuleInterface[] = [{
  id: '1',
  title: 'Administrator',
  link: '/administrator/dashboard',
  img: '/img/admin.png',
  description: 'Manage user registration, medicine, schools...'
}]

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

const fetchData = async (): Promise<AppModuleInterface[] | undefined> => {
  try {
    const { data } = await axios.get<AppModuleInterface[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/root/app-modules/fetchAll`
    )
    return data
  } catch (e) {
    console.log(e)
  }
}

const fetchRecentData = async (id: string): Promise<ExtendedAppModuleSession[] | undefined> => {
  try {
    const { data } = await axios.get<ExtendedAppModuleSession[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/root/app-module-session/detail/${id}`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default function Home () {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<UserInterface>()
  const [data, setData] = useState<AppModuleInterface[]>([])
  const [recentSession, setRecentSession] = useState<
    ExtendedAppModuleSession[] | undefined
  >([]);
  const [error, setError] = useState()

  useEffect(() => {
    void (async () => {
      const resp = await fetchData()
      if (resp) {
        setData(administrator.concat(resp))
        // console.log(resp, 'response')
      }
    })()
  }, [])

  const router = useRouter()
  useEffect(() => {
    if (status === 'loading') {
      return
    }

    if (session) {
      const { user } = session
      setUser(user as UserInterface);
      (async () => {
        const dtm = await fetchRecentData(user?.id as string);
        setRecentSession(dtm);
        console.log(dtm, 'dtm')
      })();

    }

    if (status === 'unauthenticated') {
    // setTimeout(() => {
    //   router.push('/login')
    // }, 2000)
      router.push('/login')
    }
  }, [status, router, session])
  if (session != null) {
    return (
      <>
        <div className=" bg-slate-50 h-100vh flex-1 ">
          <Suspense fallback={<Skeleton className="p-4 w-full" />}>
            <nav
              className="flex justify-between
        bg-white
        border-slate-200 p-1 pl-4 pr-4 w-full"
            >
              <Image
                src={"/img/logo1.svg"}
                alt="img"
                width={0}
                height={0}
                style={{ width: "90px", height: "auto" }}

                // quality={100}
              />

              <UserAccount user={user as UserInterface} />
            </nav>
          </Suspense>

          {/* main */}
          <main className="flex flex-col  items-center w-full">
            <div className="flex flex-col justify-center items-center w-full">
              <Suspense fallback={<Skeleton className="w-3/4 p-2" />}>
                <div className="flex w-full p-4 xl:p-2 justify-between items-center bg-white mt-2 mb-2 rounded-lg">
                  <div className="  text-teal-600 pl-4">
                    <p className="">
                      Hello{" "}
                      <span className="font-bold underline">
                        {user?.firstName}
                      </span>
                      ,{" "}
                    </p>
                    <p className="text-[14px]">Welcome to CarePlus +</p>
                  </div>

                  <div
                    className="w-[300px] flex flex-row items-center
              justify-between space-x-2 "
                  >
                    <Input
                      className="shadow-none rounded-full p-4 h-8 bg-slate-50 border-none"
                      placeholder="Search.."
                    />
                    <Button
                      className="bg-slate-50 rounded-full hover:bg-slate-50 shadow-none"
                      size={"sm"}
                    >
                      <Search className="text-slate-500" size={18} />
                    </Button>
                  </div>
                </div>
              </Suspense>

              {/* recent session data */}
              { recentSession && recentSession?.length > 0 && (
                <div className="w-full">
                  <p className="mb-2 mt-2 ml-2 font-bold">Quick Access</p>
                  <div className="grid px-2  w-full grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-2 mb-2 border-b border-slate-200 pb-2">
                    {recentSession?.map((item: ExtendedAppModuleSession) => (
                      <Suspense
                        key={item.id}
                        fallback={<Skeleton className="h-[120px]" />}
                      >
                        <div
                          key={item.id}
                          tabIndex={0}
                          className="border-slate-200 relative p-4 rounded-lg h-[120px] hover:cursor-pointer bg-white shadow-slate-100 hover:shadow-lg"
                          onClick={() => {
                            router.push(
                              `${item.appModule.link}?moduleID=${item.id}`
                            );
                          }}
                        >
                          {/* <div className="w-full flex justify-end">
                        <MenuSelect dataList={item.listItem} />
                      </div> */}
                          <div className="w-full flex flex-row space-x-4 justify-start items-start">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}/api/root/${item.appModule.img}`}
                              alt="img"
                              width={40}
                              height={40}
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "contain",
                              }}

                              // quality={100}
                            />
                            <div>
                              <Link
                                className="font-bold hover:underline"
                                href={item.appModule.link as unknown as Url}
                              >
                                {item.appModule.title}
                              </Link>
                              <p className="text-slate-500 text-[12px]">
                                {item.appModule.description
                                  ? item.appModule.description
                                  : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime"}
                              </p>
                            </div>
                            <div
                              className="absolute bottom-0 right-0 p-2
                          flex flex-row items-center space-x-2
                          "
                            >
                              <Clock size={16} className="text-slate-500" />
                              <p className="text-[12px] text-slate-500 ">
                                {moment(item.disconnectedAt).calendar()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Suspense>
                    ))}
                  </div>
                </div>
              )}

              {/*  */}
              <div className="w-full mb-2">
                <p className="mb-2 ml-2 font-bold">All Modules</p>
                <div className="grid px-2  w-full grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-2">
                  {data?.map((item: AppModuleInterface) => (
                    <Suspense
                      key={item.id}
                      fallback={<Skeleton className="h-[120px]" />}
                    >
                      <div
                        key={item.id}
                        tabIndex={0}
                        className="border-slate-200 p-4 rounded-lg h-[120px] hover:cursor-pointer bg-white shadow-slate-100 hover:shadow-lg"
                        onClick={() => {
                          router.push(`${item.link}?moduleID=${item.id}`);
                        }}
                      >
                        {/* <div className="w-full flex justify-end">
                        <MenuSelect dataList={item.listItem} />
                      </div> */}
                        <div className="w-full flex flex-row space-x-4 justify-start items-start">
                          <Image
                            src={
                              item.id !== "1"
                                ? `${process.env.NEXT_PUBLIC_API_URL}/api/root/${item.img}`
                                : (item.img as string)
                            }
                            alt="img"
                            width={40}
                            height={40}
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "contain",
                            }}

                            // quality={100}
                          />
                          <div>
                            <Link
                              className="font-bold hover:underline"
                              href={item.link as unknown as Url}
                            >
                              {item.title}
                            </Link>
                            <p className="text-slate-500 text-[12px]">
                              {item.description
                                ? item.description
                                : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Suspense>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }
  return (
   <AuthenticateLoader/>
  )
}
