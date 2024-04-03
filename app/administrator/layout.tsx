'use client'
import '../globals.css'
import { Sidebar } from '../_components/dashboard/Sidebar'
import SidebarItems from '../_components/dashboard/SidebarItems'
import Navbar from '../_components/Navbar/Nav/Navbar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { ChakraProvider } from '@chakra-ui/react'
import { NotificationProvider } from '@/context/NotificationContext'
import { SidebarProvider } from '@/context/SidebarContext'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <SidebarProvider>
        <NotificationProvider>
          <ChakraProvider>
            <div className="flex flex-row">
              <Sidebar>
                <SidebarItems />
              </Sidebar>
              <div className="flex flex-col flex-1 h-screen overflow-y-auto">
                <Navbar />

                {children}
              </div>
            </div>
          </ChakraProvider>
        </NotificationProvider>
      </SidebarProvider>
    </Provider>
  )
}

export default DashboardLayout
