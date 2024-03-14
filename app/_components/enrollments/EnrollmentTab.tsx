import React, { useState } from 'react'
import Tab from '../Navbar/Tabs/Tab'

interface Category {
  id: number
  text: string
}

const categoryList: Category[] = [
  {
    id: 1,
    text: 'OTZ'
  },
  {
    id: 2,
    text: 'OTZ'
  },
  {
    id: 3,
    text: 'PAMA'
  },
  {
    id: 4,
    text: 'PMTCT'
  }
]

const EnrollmentTab = () => {
  const [value, setValue] = useState<number>(0)
  return (
    <Tab data={categoryList}
    value={value}
    setValue={setValue}
    >
        {value}
    </Tab>
  )
}

export default EnrollmentTab
