/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { Clock, History, LayoutGrid, Search, TriangleAlert } from 'lucide-react'
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
import { type NotificationAttributes, type AppModuleInterface, type UserInterface } from 'otz-types'
import axios from 'axios'
import { type Url } from 'url'
import { type ExtendedAppModuleSession } from '@/api/appModules/appModuleSession.api'
import moment from 'moment'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Badge } from '@/components/ui/badge'
import { NotificationDropDown } from '@/components/notification/NotificationDropDown'
import { type AppModuleResponseInterface } from '@/api/appModules/appModules.api'

// interface ListItemProps {
//   id: string
//   label: string
//   link: string
// }

// interface ItemListProps {
//   id: string
//   label: string
//   src: string
//   description?: string
//   link: string
//   listItem: ListItemProps[]
// }

const administrator: AppModuleInterface[] = [{
  id: '1',
  title: 'Administrator',
  link: '/administrator/dashboard',
  img: '/img/admin.png',
  description: 'Manage user registration, medicine, schools...',
  isActive: true
}]

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    partialVisibilityGutter: 40
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

const fetchData = async (): Promise<AppModuleResponseInterface | undefined> => {
  try {
    const { data } = await axios.get<AppModuleResponseInterface | undefined>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/root/app-modules/fetchAll/`,
        {
          params: {
            page: 1,
            pageSize: 100,
            searchQuery: ''
          }
        }
    )
    return data
  } catch (e) {
    console.log(e)
  }
}

export interface NotificationResponseInterface {
  data: NotificationAttributes[]
  page: number
  total: number
  pageSize: number
  searchQuery: string
}

const fetchNotificationData = async (hospitalID: string): Promise<NotificationResponseInterface | undefined> => {
  try {
    const { data } = await axios.get<NotificationResponseInterface | undefined>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notify/notifications/fetchAll?hospitalID=${hospitalID}`,
      {
        params: {
          page: 1,
          pageSize: 10,
          searchQuery: ''
        }
      }
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export default function Home () {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<UserInterface>()
  const [data, setData] = useState<AppModuleInterface[]>([])
  const [userNotifications, setUserNotifications] = useState<NotificationAttributes[]>()

  const [recentDataLoading, setRecentDataLoading] = useState(false)

  const fetchRecentData = async (
    id: string
  ): Promise<ExtendedAppModuleSession[] | undefined> => {
    try {
      setRecentDataLoading(true)
      const { data } = await axios.get<ExtendedAppModuleSession[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/root/app-module-session/detail/${id}`
      )
      setRecentDataLoading(false)
      return data
    } catch (e) {
      setRecentDataLoading(false)

      console.log(e)
    }
  }

  const [recentSession, setRecentSession] = useState<
  ExtendedAppModuleSession[] | undefined
  >([])
  const [error, setError] = useState()

  useEffect(() => {
    void (async () => {
      const resp = await fetchData()
      if (user?.hospitalID) {
        const notificationData = await fetchNotificationData(user.hospitalID)
        setUserNotifications(notificationData?.data)
      }

      if (resp) {
        setData(user?.role === 'admin' ? administrator.concat(resp.data) : resp.data)
        // console.log(resp, 'response')
      }
    })()
  }, [user?.hospitalID, user?.role])

  const findModuleNotification = (moduleID: string | undefined) => {
    return userNotifications?.filter(item => item?.moduleID === moduleID)?.length
  }

  const filteredData = data?.filter(item => item?.isActive)

  const router = useRouter()
  useEffect(() => {
    if (status === 'loading') {
      return
    }

    if (session) {
      const { user } = session
      setUser(user as UserInterface)
      void (async () => {
        const dtm = await fetchRecentData(user?.id as string)
        setRecentSession(dtm)
      })()
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
        <div className=" bg-white h-[100vh] flex-1 ">
          <Suspense fallback={<Skeleton className="p-4 w-full" />}>
            <nav
              className="flex justify-between
        bg-white
        border-slate-200 p-1 pl-4 pr-4 w-full"
            >
              <Image
                src={'/img/logo1.svg'}
                alt="img"
                width={0}
                height={0}
                style={{ width: '90px', height: 'auto' }}

                // quality={100}
              />

              <div className="flex items-center space-x-4">
                <NotificationDropDown data={userNotifications ?? []} />
                <UserAccount user={user as UserInterface} />
              </div>
            </nav>
          </Suspense>

          {/* main */}
          <main className="flex flex-col  items-center w-full">
            <div className="flex flex-col justify-center items-center w-full">
              <Suspense fallback={<Skeleton className="w-3/4 p-2" />}>
                <div className="flex w-full p-4 xl:p-2 justify-between items-center bg-white ">
                  <div className="  text-teal-600 pl-4">
                    <p className="">
                      Hello{' '}
                      <span className="font-bold underline">
                        {user?.firstName}
                      </span>
                      ,{' '}
                    </p>
                    <p className="text-[12px]">Welcome to CarePlus +</p>
                  </div>
                </div>
              </Suspense>

              {/* recent session data */}
              {recentDataLoading ? (
                <div className="grid px-2  w-full grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 mb-2 pb-4">
                  {Array.from({ length: 4 }, (_, index) => (
                    <Skeleton key={index} className="p-4 h-[120px]" />
                  ))}
                </div>
              ) : (
                <>
                  {recentSession && recentSession?.length > 0 && (
                    <div className="w-full ">
                      <div className="flex items-center space-x-2 text-slate-700 border-b mb-4 pl-4 ">
                        <History size={16} className="" />
                        <p className="mb-2 mt-2 ml-2 font-bold">Quick Access</p>
                      </div>

                      <Carousel
                        responsive={responsive}
                        ssr={true}
                        keyBoardControl
                        renderButtonGroupOutside
                      >
                        {recentSession?.map(
                          (item: ExtendedAppModuleSession) => (
                            <Suspense
                              key={item.id}
                              fallback={<Skeleton className="h-[100px]" />}
                            >
                              <div
                                key={item.id}
                                tabIndex={0}
                                className="border-slate-100  hover:border-slate-200 border
                           hover:bg-slate-50 transition duration-300 ml-1 mr-1 mb-1 relative p-4 rounded-lg h-[100px] hover:cursor-pointer shadow-slate-50 shadow filter"
                                onClick={() => {
                                  router.push(
                                    `${item.appModule.link}?moduleID=${item.id}`
                                  )
                                }}
                              >
                                {/* <div className="w-full flex justify-end">
                        <MenuSelect dataList={item.listItem} />
                      </div> */}
                                <div className="w-full flex flex-row space-x-4 justify-start items-start">
                                  <div className="bg-white p-1 rounded-lg ">
                                    <Image
                                      src={`${process.env.NEXT_PUBLIC_API_URL}/api/root/${item.appModule.img}`}
                                      alt="img"
                                      width={30}
                                      height={30}
                                      style={{
                                        width: '30px',
                                        height: '30px',
                                        objectFit: 'contain'
                                      }}

                                      // quality={100}
                                    />
                                  </div>

                                  <div>
                                    <Link
                                      className="font-semibold text-[14px] hover:underline"
                                      href={
                                        item.appModule.link as unknown as Url
                                      }
                                    >
                                      {item.appModule.title}
                                    </Link>
                                    <p className="text-slate-500 text-[12px]">
                                      {item.appModule.description
                                        ? item.appModule.description
                                        : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime'}
                                    </p>
                                  </div>
                                  <div
                                    className="absolute bottom-0 right-0 p-2 rounded-tl-2xl
                          flex flex-row items-center space-x-2 bg-slate-50
                          "
                                  >
                                    <Clock
                                      size={14}
                                      className="text-slate-500"
                                    />
                                    <p className="text-[10px] rounded-br-lg text-slate-500 font-semibold ">
                                      {Math.floor(
                                        moment
                                          .duration(
                                            moment().diff(
                                              moment(
                                                item.disconnectedAt
                                              ).format('YYYY-MM-DD')
                                            )
                                          )
                                          .asDays()
                                      )}{' '}
                                      day ago
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Suspense>
                          )
                        )}
                      </Carousel>
                    </div>
                  )}
                </>
              )}

              {/*  */}
              <div className="w-full mb-2">
                <div className="flex w-full p-4 xl:p-2 justify-between items-center bg-white mb-2  border-b">
                  <div className="flex items-center ml-2 space-x-2 text-slate-700 ">
                    <div className="flex items-center space-x-2">
                      <LayoutGrid size={16} className="" />
                      <p className="mb-2 mt-2 ml-2 font-bold ">All Modules</p>
                      <Badge className="bg-slate-100 hover:bg-slate-50 shadow-none text-slate-700 border border-slate-200 ">
                        {filteredData?.length}
                      </Badge>
                    </div>
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
                      size={'sm'}
                    >
                      <Search className="text-slate-500" size={18} />
                    </Button>
                  </div>
                </div>
                <div className="grid  w-full grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 mb-2 p-4">
                  {filteredData?.map((item: AppModuleInterface) => (
                    <Suspense
                      key={item.id}
                      fallback={<Skeleton className="h-[110px]" />}
                    >
                      <div
                        key={item.id}
                        tabIndex={0}
                        className="border-slate-100  hover:border-slate-200 border
                                                  transform hover:scale-105 ease-in-out
                         hover:bg-slate-50 transition duration-300 relative p-4 rounded-lg h-[110px] hover:cursor-pointer shadow-slate-50 shadow filter"
                        onClick={() => {
                          router.push(`${item.link}?moduleID=${item.id}`)
                        }}
                      >
                        {/* <div className="w-full flex justify-end">
                        <MenuSelect dataList={item.listItem} />
                      </div> */}
                        <div className="w-full flex flex-row space-x-4 justify-start items-center">
                          <div className="bg-white p-1 border border-slate-50 rounded-lg">
                            <Image
                              src={
                                item.id !== '1'
                                  ? `${process.env.NEXT_PUBLIC_API_URL}/api/root/${item.img}`
                                  : (item.img as string)
                              }
                              alt="img"
                              width={25}
                              height={25}
                              style={{
                                width: '25px',
                                height: '25px',
                                objectFit: 'cover'
                              }}

                              // quality={100}
                            />
                          </div>
                          <div>
                            <Link
                              className="font-semibold text-[14px] hover:underline"
                              href={item.link as unknown as Url}
                            >
                              {item.title}
                            </Link>
                            <p className="text-slate-500 text-[12px]">
                              {item.description
                                ? item.description
                                : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime'}
                            </p>
                          </div>
                        </div>
                        {findModuleNotification(item?.id) !== 0 && (
                          <div className="absolute top-4 right-4">
                            <div className="relative">
                              <TriangleAlert
                                className="text-slate-700"
                                size={16}
                              />
                              <div className="absolute -top-3 text-[12px] rounded-full -right-2 text-orange-500 font-bold bg-orange-100 h-5 w-5 flex items-center justify-center">
                                {findModuleNotification(item?.id)}
                              </div>
                            </div>
                          </div>
                        )}
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
    )
  }
  return (
   <AuthenticateLoader/>
  )
}
