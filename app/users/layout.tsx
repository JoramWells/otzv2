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
import { BookCopy, HeartHandshake, InspectionPanel, LayoutDashboardIcon, Users } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import AuthenticateLoader from '@/components/AuthenticateLoader'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import { UserProvider } from '@/context/UserContext'
import { PharmacyProvider } from '@/context/PharmacyContext'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/users/dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '2',
    label: 'Caregivers',
    link: '/users/caregivers',
    icon: <HeartHandshake size={17} />
  },
  {
    id: '3',
    label: 'Case Managers',
    link: '/users/casemanagers',
    icon: <InspectionPanel size={17} />
  },
  {
    id: '4',
    label: 'Patients',
    link: '/users/patients',
    icon: <Users size={17} />
  },
  {
    id: '5',
    label: 'Reports',
    link: 'viratrack/reports',
    icon: <BookCopy size={17} />
  }
]

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams()
  const { patientID } = params

  const pathname = usePathname()
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'loading') { return }
    if (status === 'unauthenticated') {
      // setTimeout(() => {
      //   router.push('/login')
      // }, 2000)
      router.push('/login')
    }
  }, [status, router])

  if (session != null) {
    if (
      pathname === `/users/patients/tab/dashboard/${patientID}` ||
        pathname === `/users/patients/tab/appointments/${patientID}` ||
        pathname === `/users/patients/tab/caregivers/${patientID}` ||
        pathname === `/users/patients/tab/casemanagers/${patientID}` ||
        pathname === `/users/patients/tab/homevisit/${patientID}` ||
        pathname === `/users/patients/tab/lab/${patientID}` ||
        pathname === `/users/patients/tab/pharmacy/${patientID}` ||
        pathname === `/users/patients/tab/medication/${patientID}` ||
        pathname === `/users/patients/tab/messages/${patientID}` ||
        pathname === `/users/patients/tab/settings/${patientID}` ||
        pathname === `/users/patients/tab/visits/${patientID}` ||
        pathname === `/users/patients/tab/visit-detail/${patientID}` ||
        pathname === `/users/patients/tab/visit-detail/triage/${patientID}` ||
        pathname === `/users/patients/tab/visit-detail/mmas/${patientID}` ||
        pathname ===
          `/users/patients/tab/visit-detail/time-schedule/${patientID}` ||
        pathname === `/users/patients/tab/steps/${patientID}`
    ) {
      return (
          <Provider store={store}>
            <SidebarProvider>{children}</SidebarProvider>
            <Toaster/>
          </Provider>
      )
    }
    return (
      <Provider store={store}>
        <ChakraProvider>
          <SidebarProvider>
            <UserProvider>
              <PharmacyProvider>
                <div className="flex flex-row">
                  <Sidebar>
                    <SidebarListItemsComponent dataList={DL} />
                  </Sidebar>
                  <div className="flex flex-col flex-1 h-screen overflow-y-auto bg-slate-50">
                    {/* <Navbar /> */}

                    {children}
                    <Footer />
                  </div>
                  <Toaster />
                </div>
              </PharmacyProvider>
            </UserProvider>
          </SidebarProvider>
        </ChakraProvider>
      </Provider>
    )
  }

  return (
   <AuthenticateLoader/>
  )
}

export default PatientLayout
