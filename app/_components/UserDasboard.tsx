import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CountUp from 'react-countup'

export interface UserDashboardCardProps {
  item: UserDashboardCardDataListProps
}
export interface UserDashboardCardDataListProps {
  id: string
  label: string
  count: number
  link: string
}

const UserDashboardCard = ({ item }: UserDashboardCardProps) => {
  const router = useRouter()
  return (
    <div
      className="rounded-xl p-4 bg-white
             h-[110px] flex flex-col flex-1 hover:cursor-pointer"
      onClick={() => {
        router.push('/notify/appointment')
      }}
    >
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bold">{item.label}</h1>
        <Users size={18} />
      </div>
      <CountUp
      end={item.count}
      />
      {/* <p className="text-2xl font-bold text-slate-600">{item.count}</p> */}
      <small className="text-slate-500 text-xs">Since last month</small>
    </div>
  )
}

export default UserDashboardCard
