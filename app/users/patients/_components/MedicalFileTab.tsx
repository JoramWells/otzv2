import { Button } from '@/components/ui/button'
import { PillIcon } from 'lucide-react'
import { useState } from 'react'
import Family from './tabs/Family'
import Medical from './tabs/Medical'
import Social from './tabs/Social'
import FamilyPlanning from './tabs/FamilyPlanning'
import Vaccination from './tabs/Vaccination'

interface ItemProps {
  id: number
  label: string
}

const data = [
  {
    id: 1,
    label: 'Patient history'
  },
  {
    id: 2,
    label: 'Patient Examination'
  }

]

const categoryList = [
  {
    id: 1,
    label: 'Family'
  },
  {
    id: 2,
    label: 'Medical history'
  },
  {
    id: 3,
    label: 'Social Status'
  },
  {
    id: 4,
    label: 'Family Planning'
  },
  {
    id: 5,
    label: 'Vaccination'
  }
]

const ListItem = ({ label, onClick }: { label: string
  onClick: () => void }) => {
  return (
    <li tabIndex={0}
    onClick={onClick}
    className="border p-2 bg-slate-50 rounded-lg">
      {label}
    </li>
  )
}

const MedicalFileTab = () => {
  const [value, setValue] = useState<number>(1)
  const [catItems, setCatItems] = useState<number>(0)
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-3/4 border flex flex-row justify-between p-4 rounded-lg space-x-4">
        <nav className="w-[250px]">
          <ol className="flex flex-col space-y-2">
            {data.map((item: ItemProps) => (
              <ListItem
                key={item.id}
                label={item.label}
                onClick={() => {
                  setValue(item.id)
                }}
                // value={value}
              />
            ))}
          </ol>
          {value}
        </nav>
        <div className="flex-1">
          <div className="flex flex-row gap-4 flex-wrap  items-center">
            {categoryList.map((item: ItemProps) => (
              <Button
                key={item.id}
                className={`border border-slate-200 bg-slate-50 h-10 text-slate-500 hover:bg-slate-50
            p-2 rounded-full shadow-none ${
              item.id === catItems && 'bg-teal-50 text-teal-600 border-teal-200'
            }`}
                onClick={() => {
                  setCatItems(item.id)
                }}
              >
                <PillIcon
                  className="bg-blue-50  p-2 rounded-full mr-2"
                  size={30}
                />
                {item.label}
              </Button>
            ))}
          </div>

          {catItems === 1 && <Family />}

          {catItems === 2 && <Medical />}

          {catItems === 3 && <Social />}

          {catItems === 4 && <FamilyPlanning />}

          {catItems === 5 && (<Vaccination />)}
        </div>
      </div>
    </div>
  )
}

export default MedicalFileTab
