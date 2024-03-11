'use client'
import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'

const itemList = [
  {
    id: 1,
    text: 'Viral Load'
  },
  {
    id: 2,
    text: 'Regimen Switch'
  }
]

const OTZDetail = () => {
  const [value, setValue] = useState(1)

  return (
    <div className="w-full justify-center ml-64 pt-12">
      <div className="p-5">
        <div
        className='flex flex-row gap-x-4'
        >
          {itemList.map((item) => (
            <Button
              key={item.id}
              rounded={'md'}
              size={'sm'}
              bgColor={`${value === item.id && 'gray.700'}`}
              color={`${value === item.id && 'white'}`}
              // shadow={`${value === item.id && 'md'}`}
              _hover={{
                bgColor: `${value === item.id && 'black'}`,
                color: `${value === item.id && 'white'}`
              }}
              onClick={() => {
                setValue(item.id)
              }}
            >
              {item.text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OTZDetail
