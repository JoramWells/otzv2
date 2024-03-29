// import RightNav from './RightNav'

// import { useSession } from 'next-auth/react'
import LeftNav from './LeftNav'
import RightNav from './RightNav'

// import LeftNav from './LeftNav'
// import { getServerSession } from 'next-auth'

export default function Navbar () {
  // const session = await getServerSession()
  // const { data: session } = useSession()
  return (
    <nav
      className="
    w-full h-14 flex items-center justify-between
    border-b border-gray-200 z-10 bg-white p-2 space-x-4
    absolute top-0 left-0
    "
    >
      {/* {session && <span>{session.user?.email} Logout</span>} */}
      <LeftNav />

      <RightNav />
    </nav>
  )
}
