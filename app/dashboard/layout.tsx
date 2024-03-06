import '../globals.css'
import { Providers } from '../providers'
import { Sidebar } from '../_components/dashboard/Sidebar'
import SidebarItems from '../_components/dashboard/SidebarItems'
import Navbar from '../_components/dashboard/Navbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <div className='h-screen'>
        <Navbar/>
        <Sidebar>
          <SidebarItems />
        </Sidebar>

        {children}
      </div>
    </Providers>
  )
}

export default DashboardLayout
