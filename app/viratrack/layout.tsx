'use client'

import '../globals.css'

// import { Providers } from '../providers'
import Navbar from '../_components/Navbar/Nav/Navbar'
import { Sidebar } from '../_components/dashboard/Sidebar'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import PatientSidebarItems from '../_components/patient/PatientSidebarItems'

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <SidebarProvider>
          <div className="flex flex-row">
            <Sidebar>
              <PatientSidebarItems />
            </Sidebar>
            <div className="flex flex-col flex-1 h-screen overflow-y-auto">
              <Navbar />

              {children}
            </div>
          </div>
        </SidebarProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default PatientLayout