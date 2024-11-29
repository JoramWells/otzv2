/* eslint-disable @typescript-eslint/indent */
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
import { Book, BookCopy, LayoutDashboardIcon, Users } from 'lucide-react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { type JSX, Suspense, useEffect } from 'react'
import AuthenticateLoader from '@/components/AuthenticateLoader'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import { v4 as uuidv4 } from 'uuid'
import { UserProvider, useUserContext } from '@/context/UserContext'
import { PharmacyProvider } from '@/context/PharmacyContext'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/users/dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  // {
  //   id: '2',
  //   label: 'Caregivers',
  //   link: '/users/caregivers',
  //   icon: <HeartHandshake size={17} />
  // },
  {
    id: '3',
    label: 'Patients',
    link: '/users/patients',
    icon: <Book size={17} />
  },
  {
    id: '4',
    label: 'OTZ',
    link: '/users/otz',
    icon: <Users size={17} />
  },
  //   {
  //   id: '5',
  //   label: 'Treatment Plan',
  //   link: '/users/treatment-plan',
  //   icon: <NotebookPen size={17} />
  // },
  {
    id: '6',
    label: 'Reports',
    link: '/users/reports',
    icon: <BookCopy size={17} />
  }
]

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams()
  const { patientID } = params
  const moduleParams = useSearchParams()
  const moduleID = moduleParams.get('moduleID')
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const router = useRouter()
  const { userSocket, setModuleID } = useUserContext()

  // const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
  //   path: '/api/users/socket.io',
  //   transports: ['websocket'],
  //   query: {
  //     moduleID
  //     // userID: session?.user.id,
  //   }
  // })

  useEffect(() => {
    const appSessionID = uuidv4()
    if (status === 'loading') { return }
    if (status === 'unauthenticated') {
      // setTimeout(() => {
      //   router.push('/login')
      // }, 2000)
      router.push('/login')
    }

      setModuleID(moduleID)

      // if (userSocket != null) {
        console.log(userSocket, 'user socket defined')
      // }
    // })

    return () => {
      userSocket?.emit('disconnectedAppModuleSession', {
        id: appSessionID,
        userID: session?.user.id,
        moduleID
      })
      userSocket?.off('appModuleUsage')
      // userSocket?.off('disconnectedAppModuleSession')
    }
  }, [status, router, moduleID, session, userSocket, setModuleID])

  if (session != null) {
    if (
      pathname === `/users/patients/tab/dashboard/${patientID}` ||
      pathname === `/users/patients/tab/appointments/${patientID}` ||
      // pathname === '/users/patients' ||
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
      pathname === `/users/patients/tab/steps/${patientID}` ||
      pathname === `/users/patients/tab/settings/disclosure/${patientID}`
    ) {
      return (
        <Provider store={store}>
          <SidebarProvider>{children}</SidebarProvider>
          <Toaster />
        </Provider>
      )
    }
    return (
        <ChakraProvider>
          <SidebarProvider>
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
          </SidebarProvider>
        </ChakraProvider>
    )
  }

  return (
   <AuthenticateLoader/>
  )
}

export default function WrappedPatientLayout (props: JSX.IntrinsicAttributes & { children: React.ReactNode }) {
  return (
    <Suspense
    fallback={<div>Loading...</div>}
    >
      <Provider store={store}>
        <UserProvider>
          <PatientLayout {...props} />
        </UserProvider>
      </Provider>
    </Suspense>
  )
}
