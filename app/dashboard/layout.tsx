'use client'
import '../globals.css'
import { Sidebar } from '../_components/dashboard/Sidebar'
import SidebarItems from '../_components/dashboard/SidebarItems'
import Navbar from '../_components/dashboard/Navbar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { ChakraProvider } from '@chakra-ui/react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <div className="h-screen">
          <Navbar />
          <Sidebar>
            <SidebarItems />
          </Sidebar>

          {children}
        </div>
      </ChakraProvider>
    </Provider>
  )
}

export default DashboardLayout
