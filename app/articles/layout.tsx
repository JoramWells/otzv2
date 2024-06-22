'use client'

import '../globals.css'

// import { Providers } from '../providers'
// import Navbar from '../_components/Navbar/Nav/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import { SidebarProvider } from '@/context/SidebarContext'
import { Book, BookCopy, PlusIcon } from 'lucide-react'
import SidebarListItemsComponent, { type SidebarListItemsProps } from '../_components/patient/SidebarListItemsComponent'

const DL: SidebarListItemsProps[] = [
  // {
  //   id: '1',
  //   label: 'Dashboard',
  //   link: '/articles/dashboard',
  //   icon: <LayoutDashboardIcon size={15} />
  // },
  {
    id: '5',
    label: 'Books',
    link: '/articles/books',
    icon: <Book size={15} />
  },

  {
    id: '3',
    label: 'New Articles',
    link: '/articles/add-article',
    icon: <PlusIcon size={15} />
  },
  {
    id: '4',
    label: 'E-learning',
    link: '/articles/e-learning',
    icon: <BookCopy size={15} />
  }
]

const PillLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <SidebarProvider>
        <div className="flex flex-row">
          <Sidebar>
            <SidebarListItemsComponent dataList={DL} />
          </Sidebar>
          <div className="flex flex-col flex-1 h-screen overflow-y-auto bg-slate-50">
            {/* <Navbar /> */}

            {children}
          </div>
        </div>
      </SidebarProvider>
    </Provider>
  )
}

export default PillLayout
