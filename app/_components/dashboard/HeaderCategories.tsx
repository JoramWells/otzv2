import { Users } from 'lucide-react'

const listItems = [
  {
    id: '1',
    title: 'Total Number of Patients',
    icon: <Users size={18} />,
    count: '45, 894',
    description: 'Since last month'
  },
  {
    id: '2',
    title: 'Active Patients',
    icon: <Users size={18} />,
    count: '45, 894',
    description: 'Since last month'
  },
  {
    id: '3',
    title: 'Available drugs',
    icon: <Users size={18} />,
    count: '45, 894',
    description: 'Since last month'
  }
]

const HeaderCategories = () => {
  return (
    <>
      {listItems.map((item) => (
        <div
        key={item.id}
          className="border border-slate-200 rounded-lg p-5
      h-[120px] w-[350px] flex flex-col bg-white
      "
        >
          <div className="flex flex-row items-center justify-between">
            <h1 className="font-bold text-lg">Total Number of Patients</h1>
            <Users size={20} />
          </div>
          <p className="text-2xl font-bold">45, 894</p>
          <p className="text-slate-500 text-sm">Since last month</p>
        </div>
      ))}
    </>
  )
}

export default HeaderCategories
