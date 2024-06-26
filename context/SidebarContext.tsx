import { createContext, useContext, useState } from 'react'

interface SidebarContextType {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextType | null>(null)

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  return <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
    {children}
</SidebarContext.Provider>
}

// export const useSidebar = () => useContext(SidebarContext)

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext)
  if (context == null) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context // Asserting that context is of type SidebarContextType
}
