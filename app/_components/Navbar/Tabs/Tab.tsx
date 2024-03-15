import { Button } from '@chakra-ui/react'
import React from 'react'

export interface TabProps {
  children: React.ReactNode
  data: TabDataProps[]
  value: number
  setValue: (val: number) => void
}

interface TabDataProps {
  id: number
  text: string
}

const Tab = ({ data, setValue, value, children }: TabProps) => {
  return (
    <div
      className="rounded-md gap-x-4
           flex flex-row
          "
    >
      {data.map((item: TabDataProps) => (
        <Button
          key={item.id}
          rounded={'full'}
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

      {/*  */}
      {children}
    </div>
  )
}

export default Tab
