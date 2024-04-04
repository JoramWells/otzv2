'use client'

import '../globals.css'

// import { Providers } from '../providers'
import Navbar from '../_components/Navbar/Nav/Navbar'
import { Sidebar } from '../_components/dashboard/Sidebar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import NotifySidebarItems from '../_components/appointment/NotifySidebarItems'

const PatientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
        <SidebarProvider>
          <div className="flex flex-row">
            <Sidebar>
              <NotifySidebarItems />
            </Sidebar>
            <div className="flex flex-col flex-1 h-screen overflow-y-auto">
              <Navbar />

              {children}
            </div>
          </div>
        </SidebarProvider>
    </Provider>
  )
}

export default PatientLayout
