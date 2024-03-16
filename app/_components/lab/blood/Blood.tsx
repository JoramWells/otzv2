import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import UrineMicroscopy from './panel/UrineMicroscopy'
import RoutineUrine from './panel/RoutineUrine'
import UrethralFluidExamination from './panel/UrethralFluidExamination'
import TBMonitoring from './panel/TBMonotoring'
import HIVMonitoring from './panel/HIVMonitoring'
import Anaemia from './panel/Anaemia'
import BloodCount from './panel/BloodCount'

const categoryList = [
  {
    id: 1,
    label: 'Anaemia'
  },
  {
    id: 2,
    label: 'Blood Count'
  },
  {
    id: 3,
    label: 'Diabetes'
  },
  {
    id: 4,
    label: 'Gas (Arterial Blood)'
  },
  {
    id: 5,
    label: 'Grouping and Crossmatch'
  },
  {
    id: 6,
    label: 'Hepatitis B Serological'
  },
  {
    id: 7,
    label: 'HIV Monitoring'
  },
  {
    id: 8,
    label: 'Lipid'
  },
  {
    id: 9,
    label: 'Liver Function'
  },
  {
    id: 10,
    label: 'Malaria Parasites'
  },
  {
    id: 11,
    label: 'Routine Blood'
  },
  {
    id: 12,
    label: 'Serum Chemistry Panel'
  },
  {
    id: 13,
    label: 'Serum Torch Panel'
  },
  {
    id: 14,
    label: 'Sickling Tests'
  },
  {
    id: 15,
    label: 'Syphilis Serological'
  }
]

interface PatientIDProps {
  patientID: string
}

const Blood = ({ patientID }: PatientIDProps) => {
  const [value, setValue] = useState<number>(1)
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
        {value === 1 && <Anaemia />}
        {value === 2 && <BloodCount />}
        {value === 3 && <RoutineUrine />}
        {value === 4 && <TBMonitoring />}
        {value === 5 && <UrineMicroscopy />}
        {value === 6 && <UrethralFluidExamination />}
        {value === 7 && <HIVMonitoring
        patientID={patientID}
        />}
      </div>
    </div>
  )
}

export default Blood
