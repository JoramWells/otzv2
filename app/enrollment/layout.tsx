/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import '../globals.css'

// import { Providers } from '../providers'
// import Navbar from '../_components/Navbar/Nav/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { LayoutDashboardIcon, Thermometer, WatchIcon } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { Suspense } from 'react'
import { UserProvider } from '@/context/UserContext'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/enrollment/dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '2',
    label: 'OTZ',
    link: '/enrollment/otz',
    icon: <WatchIcon size={17} />
  },

  {
    id: '4',
    label: 'OVC',
    link: '/enrollment/ovc',
    icon: <Thermometer size={17} />
  },
  {
    id: '5',
    label: 'PAMA',
    link: '/enrollment/pama',
    icon: <Thermometer size={17} />
  },
  {
    id: '6',
    label: 'PMTCT',
    link: '/enrollment/pmtct',
    icon: <Thermometer size={17} />
  }
]

const OTZEnrollmentLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams()
  const { patientID } = params

  const pathname = usePathname()
  // const { data: session, status } = useSession()
  // const router = useRouter()
  // useEffect(() => {
  //   if (status === 'loading') {
  //     return
  //   }
  //   if (status === 'unauthenticated') {
  //     // setTimeout(() => {
  //     //   router.push('/login')
  //     // }, 2000)
  //     router.push('/login')
  //   }
  // }, [status, router])

  // if (session != null) {
  if (
    pathname === `/patients/tab/dashboard/${patientID}` ||
    pathname === `/patients/tab/appointments/${patientID}` ||
    pathname === `/patients/tab/caregivers/${patientID}` ||
    pathname === `/patients/tab/casemanagers/${patientID}` ||
    pathname === `/patients/tab/homevisit/${patientID}` ||
    pathname === `/patients/tab/lab/${patientID}` ||
    pathname === `/patients/tab/pharmacy/${patientID}` ||
    pathname === `/patients/tab/medication/${patientID}` ||
    pathname === `/patients/tab/messages/${patientID}` ||
    pathname === `/patients/tab/settings/${patientID}` ||
    pathname === `/patients/tab/steps/${patientID}`
  ) {
    return (
      <Provider store={store}>
        <SidebarProvider>{children}</SidebarProvider>
      </Provider>
    )
  }

  return (
      <ChakraProvider>
        <SidebarProvider>
          <div className="flex flex-row">
            <Sidebar>
              <SidebarListItemsComponent dataList={DL} />
            </Sidebar>
            <div className="flex flex-col flex-1 h-screen overflow-y-auto bg-[#F3FAFF]">
              {/* <Navbar /> */}

              {children}
            </div>
          </div>
        </SidebarProvider>
      </ChakraProvider>
  )
  // }

  // return (
  //     <AuthenticateLoader />
  // )
}

export default function WrappedOTZEnrollmentLayout (props: any) {
  return <Suspense>
    <Provider
    store={store}
    >
      <UserProvider>
        <OTZEnrollmentLayout {...props} />
      </UserProvider>
    </Provider>
  </Suspense>
}
