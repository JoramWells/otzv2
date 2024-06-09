/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import { useGetPatientQuery } from '@/api/patient/patients.api'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '@/app/_components/patient/SidebarListItemsComponent'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { tertiaryColor } from '@/constants/color'
import { store } from '@/lib/store'
import { type AvatarProps } from '@/types'
import { calculateAge } from '@/utils/calculateAge'
import { generateRandomColors } from '@/utils/generateRandomColors'
import { ChakraProvider } from '@chakra-ui/react'
import { BookCheckIcon, BookCopy, HeartHandshake, InspectionPanel, LayoutDashboardIcon, Users } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { useMemo, type ReactNode } from 'react'
import { Provider } from 'react-redux'

const Avatar = ({ name }: AvatarProps) => {
  const fullName = name.split(' ')
  const firstName = fullName[0].charAt(0)
  const secondName = fullName[0].charAt(0)
  const randomColors = useMemo(() => generateRandomColors(), [])
  return (
    <div
      className={`font-bold rounded-full h-12 w-12 text-lg
    flex flex-row items-center justify-center text-white
    `}
      style={{
        backgroundColor: randomColors
      }}
    >
      {firstName}
      {secondName}
    </div>
  )
}

const Layout = ({ children }: { children: ReactNode }) => {
  const params = useParams()
  const { patientID } = params

  const pathname = usePathname()

  const { data } = useGetPatientQuery(patientID)

  const DL: SidebarListItemsProps[] = [
    {
      id: '1',
      label: 'Dashboard',
      link: `/users/patients/tab/dashboard/${patientID}`,
      icon: <LayoutDashboardIcon size={17} />
    },
    {
      id: '2',
      label: 'Appointments',
      link: `/users/patients/tab/appointments/${patientID}`,
      icon: <LayoutDashboardIcon size={17} />
    },
    {
      id: '5',
      label: 'Home Visits',
      link: `/users/patients/tab/homevisit/${patientID}`,
      icon: <Users size={17} />
    },
    {
      id: '6',
      label: 'Lab',
      link: `/users/patients/tab/lab/${patientID}`,
      icon: <BookCheckIcon size={17} />
    },
    {
      id: '7',
      label: 'Pharmacy',
      link: `/users/patients/tab/pharmacy/${patientID}`,
      icon: <BookCopy size={17} />
    },
    {
      id: '8',
      label: 'Medication',
      link: `/users/patients/tab/medication/${patientID}`,
      icon: <BookCopy size={17} />
    },
    {
      id: '9',
      label: 'Messages',
      link: `/users/patients/tab/messages/${patientID}`,
      icon: <BookCopy size={17} />
    },
    {
      id: '10',
      label: 'Settings',
      link: `/users/patients/tab/settings/${patientID}`,
      icon: <BookCopy size={17} />
    },
    {
      id: '11',
      label: 'Visits',
      link: `/users/patients/tab/visits/${patientID}`,
      icon: <BookCopy size={17} />
    }
  ]

  if (
    pathname === `/users/patients/tab/steps/${patientID}` ||
    pathname === `/users/patients/tab/visit-detail/${patientID}` ||
    pathname === `/users/patients/tab/visit-detail/mmas/${patientID}` ||
    pathname === `/users/patients/tab/visit-detail/time-schedule/${patientID}` ||
    pathname === `/users/patients/tab/visit-detail/triage/${patientID}`
  ) {
    return (
      <Provider store={store}>
        <ChakraProvider>
          <div className={'bg-slate-50 min-h-screen'}>{children}</div>
        </ChakraProvider>
      </Provider>
    )
  }

  return (
    <div className="flex flex-row">
      <ChakraProvider>
        <Sidebar isSearchable={false}>
          <div className=" h-[180px] p-4">
            <div
              className="flex flex-col items-center
          bg-slate-50 rounded-lg p-2
          w-full "
            >
              {data && (
                <div className="flex flex-col items-center  w-full rounded-lg space-y-1">
                  <Avatar name={`${data?.firstName} ${data?.middleName}`} />
                  <p className="font-bold">
                    {data?.firstName} {data?.middleName}
                  </p>
                  {/*  */}
                  <p className="text-slate-500 font-bold text-sm">
                    Age: {calculateAge(data?.dob)} yrs
                  </p>

                  <p className="text-sm text-slate-500">CCC No.{data?.cccNo} </p>
                  <div className="text-slate-500 text-sm">
                    <p>
                      Phone No:
                      <span>{data?.phoneNo} </span>
                    </p>
                  </div>
                  {/* <Button>Update   Profile</Button> */}
                </div>
              )}
            </div>
          </div>

          <SidebarListItemsComponent dataList={DL} />
        </Sidebar>
        <div
          className={
            'flex flex-col flex-1 h-screen overflow-y-auto bg-slate-50'
          }
        >
          {/* <Navbar /> */}

          {children}
        </div>
      </ChakraProvider>
    </div>
  )
}

export default Layout
