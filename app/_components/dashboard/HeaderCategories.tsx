import { Users } from 'lucide-react'
import React from 'react'

const HeaderCategories = () => {
  return (
    <>
      <div
        className="border border-slate-200 rounded-lg p-5
      h-[130px] flex flex-col
      "
      >
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-bold text-lg">Total Number of Patients</h1>
          <Users size={20} />
        </div>
        <p className="text-2xl font-bold">45, 894</p>
        <p className="text-slate-500 text-sm">Since last month</p>
      </div>
      <div
        className="border border-slate-200 rounded-lg p-5
      h-[130px] flex flex-col
      "
      >
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-bold text-lg">Active Patients</h1>
          <Users size={20} />
        </div>
        <p className="text-2xl font-bold">45, 894</p>
        <p className="text-slate-500 text-sm">Since last month</p>
      </div>

      {/* drugs */}
      <div
        className="border border-slate-200 rounded-lg p-5
      h-[130px] flex flex-col
      "
      >
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-bold text-lg">Available Drugs</h1>
          <Users size={20} />
        </div>
        <p className="text-2xl font-bold">45, 894</p>
        <p className="text-slate-500 text-sm">Since last month</p>
      </div>
    </>
  )
}

export default HeaderCategories
