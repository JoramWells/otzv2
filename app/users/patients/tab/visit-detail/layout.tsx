/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import { useGetPatientQuery } from '@/api/patient/patients.api'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '@/app/_components/patient/SidebarListItemsComponent'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { type AvatarProps } from '@/types'
import { generateRandomColors } from '@/utils/generateRandomColors'
import { ChakraProvider } from '@chakra-ui/react'
import { BookCopy, HeartHandshake, InspectionPanel, LayoutDashboardIcon, Users } from 'lucide-react'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams()
  const appointmentID = searchParams.get('visitID')

  const DL: SidebarListItemsProps[] = [
    {
      id: '1',
      label: 'Triage',
      link: `/users/patients/tab/visit-detail/triage/${patientID}?visitID=${appointmentID}`,
      icon: <LayoutDashboardIcon size={17} />
    },
    {
      id: '2',
      label: 'MMAS',
      link: `/users/patients/tab/visit-detail/mmas/${patientID}?visitID=${appointmentID}`,
      icon: <LayoutDashboardIcon size={17} />
    },
    {
      id: '3',
      label: 'Time & Schedule',
      link: `/users/patients/tab/visit-detail/time-schedule/${patientID}?visitID=${appointmentID}`,
      icon: <HeartHandshake size={17} />
    },
    {
      id: '4',
      label: 'Disclosure Checklist',
      link: `/users/patients/tab/casemanagers/${patientID}`,
      icon: <InspectionPanel size={17} />
    },
    {
      id: '5',
      label: 'Follow Up Checklist',
      link: `/users/patients/tab/homevisit/${patientID}`,
      icon: <Users size={17} />
    },

    {
      id: '6',
      label: 'Reports',
      link: `/users/patients/tab/visits/${patientID}`,
      icon: <BookCopy size={17} />
    }
  ]

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
                    {data?.initialRegimen}
                  </p>

                  <p className="text-sm text-slate-500">{data?.cccNo} </p>
                  <div className="text-slate-500 text-sm">
                    Phone No:
                    <p>{data?.phoneNo} </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <SidebarListItemsComponent dataList={DL} />
        </Sidebar>
        <div className={'flex flex-col flex-1 h-screen overflow-y-auto bg-slate-50'}>
          {/* <Navbar /> */}

          {children}
        </div>
      </ChakraProvider>
    </div>
  )
}

export default Layout
