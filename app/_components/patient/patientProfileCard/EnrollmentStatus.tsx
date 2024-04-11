import { Tag } from '@chakra-ui/react'

// 0-9 PAMA
// 0-9 PAED
// 10-19 OTZ
// OVC
//  - careers

const EnrollmentStatus = () => {
  return (
    <div>
      <h1 className="font-bold">CALHIV</h1>
      <div className="flex flex-row space-x-2 mt-2">
        {['OTZ', 'OVC', 'PMTCT', 'PAMA'].map((item, idx) => (
          <Tag
            key={idx}
            rounded={'full'}
            variant={'outline'}
            size={'sm'}
            colorScheme="green"
          >
            {item}
          </Tag>
        ))}
      </div>
    </div>
  )
}

export default EnrollmentStatus
