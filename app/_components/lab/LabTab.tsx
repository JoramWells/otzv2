import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import Urine from './urine/Urine'

const categoryList = [
  {
    id: 1,
    label: 'Blood'
  },
  {
    id: 2,
    label: 'Stool'
  },
  {
    id: 3,
    label: 'Sputum'
  },
  {
    id: 4,
    label: 'Histology'
  },
  {
    id: 5,
    label: 'High Vaginal Swab'
  },
  {
    id: 6,
    label: 'Urine'
  }
]

const LabTab = () => {
  const [value, setValue] = useState<number>(0)
  return (
    <div className="w-full">
      <p
      className='text-xl font-bold mb-4'
      >Lab Tests</p>
      <div className="flex flex-row space-x-4
      border-b mb-4
      ">
        {categoryList.map((item) => (
          <Button
            key={item.id}
            rounded={'0'}
            h={10}
            size={'sm'}
            // w={'full'}
            borderBottom={`${value === item.id ? '2px' : '0'}`}
            fontWeight={`${value === item.id ? 'bold' : 'normal'}`}
            bgColor={`${value === item.id ? 'teal.50' : 'transparent'}`}
            color={`${value === item.id ? 'teal' : 'gray.500'}`}
            // bgColor={'white'}
            // shadow={`${value === item.id && 'md'}`}
            _hover={
              {
                // bgColor: `${value === item.id && 'black'}`,
                // color: `${value === item.id && 'white'}`
              }
            }
            onClick={() => {
              setValue(item.id)
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>
      {value === 6 && <Urine/>}
    </div>
  )
}

export default LabTab
