'use client'

import '../../globals.css'

// import { Providers } from '../providers'
import Navbar from '../../_components/dashboard/Navbar'
import { Sidebar } from '../../_components/dashboard/Sidebar'
import SidebarItems from '../../_components/dashboard/SidebarItems'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
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

export default PatientLayout
