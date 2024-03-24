'use client'
import { Bell, CircleUserRound, Menu, MessageSquareText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useNotification from '@/hooks/useNotification'
import socketIOClient, { type Socket } from 'socket.io-client'
import { useContext, useEffect } from 'react'
import { NotificationContext, type NotificationProps } from '@/context/NotificationContext'
import { useSidebar } from '@/context/SidebarContext'

const Navbar = () => {
  const { notifications, addNotification } = useContext(NotificationContext)
  const router = useRouter()

  const showNotification = useNotification()

  useEffect(() => {
    const socket: Socket = socketIOClient('/api/root-service/')

    socket.on('lab-updated', (socketData: NotificationProps) => {
      showNotification()
      addNotification(socketData)
      console.log(notifications)
    })

    return () => {
      socket.disconnect()
    }
  }, [showNotification, notifications, addNotification])

  // const [isOpen, setIsOpen] = useState<boolean>(true)

  const { toggleSidebar } = useSidebar()

  return (
    <div
      className="
    w-full h-14 flex items-center justify-between
    border-b border-gray-200 z-10 bg-white p-2 space-x-4"
    >
      <Menu
        onClick={toggleSidebar}
        className="hover:cursor-pointer hover:bg-slate-100
      rounded-md bg-slate-50 h-7 w-7 p-1 hover:text-slate-600
      "
      />
      <div
      className='flex flex-row space-x-6'
      >
        <div className="relative">
          <Bell
            className="text-slate-500 hover:cursor-pointer hover:text-slate-600"
            size={24}
            onClick={() => {
              router.push('/notification')
            }}
          />
          <div
            className="absolute bg-red-500 top-0 right-0
        h-4 w-4 rounded-full text-sm flex
        "
          >
            {[].length}
          </div>
        </div>
        <MessageSquareText
          className="text-slate-500 hover:cursor-pointer hover:text-slate-600"
          size={24}
        />
        <CircleUserRound
          className="text-slate-500 hover:cursor-pointer hover:text-slate-600"
          size={24}
          onClick={() => {
            router.push('/auth/login')
          }}
        />
      </div>
    </div>
  )
}

export default Navbar
