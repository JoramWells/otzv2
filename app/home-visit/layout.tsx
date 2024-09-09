'use client'

import '../globals.css'

// import { Providers } from '../providers'
// import Navbar from '../_components/Navbar/Nav/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'
import { BookCopy, HeartHandshake, LayoutDashboardIcon } from 'lucide-react'
import { ChakraProvider } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Footer from '@/components/Footer'
import AuthenticateLoader from '@/components/AuthenticateLoader'

const DL: SidebarListItemsProps[] = [
  {
    id: '1',
    label: 'Dashboard',
    link: '/home-visit/dashboard',
    icon: <LayoutDashboardIcon size={17} />
  },
  {
    id: '2',
    label: 'Eligible',
    link: '/home-visit/eligible',
    icon: <HeartHandshake size={17} />
  },
  {
    id: '3',
    label: 'Home-Visit',
    link: '/home-visit',
    icon: <HeartHandshake size={17} />
  },
  {
    id: '4',
    label: 'Reports',
    link: 'reports',
    icon: <BookCopy size={17} />
  }
]

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'loading') {
      return
    }
    if (status === 'unauthenticated') {
    // setTimeout(() => {
    //   router.push('/login')
    // }, 2000)
      router.push('/login')
    }
  }, [status, router])
  if (session != null) {
    return (
      <ChakraProvider>
        <Provider store={store}>
          <SidebarProvider>
            <div className="flex flex-row bg-slate-50">
              <Sidebar>
                <SidebarListItemsComponent dataList={DL} />
              </Sidebar>
              <div className="flex flex-col flex-1 h-screen overflow-y-auto">
                {/* <Navbar /> */}

                {children}
                <Footer />
              </div>
            </div>
          </SidebarProvider>
        </Provider>
      </ChakraProvider>
    )
  }

  return (<AuthenticateLoader/>)
}

export default PatientLayout
