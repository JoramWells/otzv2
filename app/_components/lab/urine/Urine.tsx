import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import UrineMicroscopy from './panel/UrineMicroscopy'
import PregnancyTest from './panel/PregnancyTest'
import RenalFunction from './panel/RenalFunction'
import RoutineUrine from './panel/RoutineUrine'
import UrethralFluidExamination from './panel/UrethralFluidExamination'
import TBMonitoring from './panel/TBMonotoring'

const categoryList = [
  {
    id: 1,
    label: 'Pregnancy Test'
  },
  {
    id: 2,
    label: 'Renal Function'
  },
  {
    id: 3,
    label: 'Routine Urine'
  },
  {
    id: 4,
    label: 'TB Monitoring'
  },
  {
    id: 5,
    label: 'Urine Microscopy'
  },
  {
    id: 6,
    label: 'Urethral Fluid Examination'
  }
]

const Urine = () => {
  const [value, setValue] = useState<number>(0)
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col w-[200px] border-r">
        {categoryList.map((item) => (
          <Button
            key={item.id}
            rounded={'lg'}
            h={10}
            size={'sm'}
            textAlign={'left'}
            display={'flex'}
            justifyItems={'start'}
            justifyContent={'start'}
            // w={'full'}
            // borderBottom={`${value === item.id ? '2px' : '0'}`}
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
      <div className="cols-span-2">
        {value === 1 && <PregnancyTest />}
        {value === 2 && <RenalFunction />}
        {value === 3 && <RoutineUrine />}
        {value === 4 && <TBMonitoring />}
        {value === 5 && <UrineMicroscopy />}
        {value === 6 && <UrethralFluidExamination />}
      </div>
    </div>
  )
}

export default Urine
