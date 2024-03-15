'use client'
import { Bell, CircleUserRound, MessageSquareText } from 'lucide-react'
import { useRouter } from 'next/navigation'
const Navbar = () => {
  const router = useRouter()

  return (
    <div
      className="fixed
    w-full h-12 flex items-center justify-end
    border-b border-gray-200 z-10 bg-white p-2 space-x-4
    "
    >
      <Bell className='text-slate-500 hover:cursor-pointer hover:text-slate-600' size={24}
      onClick={() => { router.push('/notification') }}
      />
      <MessageSquareText className='text-slate-500 hover:cursor-pointer hover:text-slate-600' size={24} />
      <CircleUserRound className='text-slate-500 hover:cursor-pointer hover:text-slate-600' size={24} />
    </div>
  )
}

export default Navbar
