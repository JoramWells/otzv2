import { type UserDataProps } from './PatientProfileCard'
import { Badge } from '@/components/ui/badge'
import { calculateAge } from '@/utils/calculateAge'

// 0-9 PAMA
// 0-9 PAED
// 10-19 OTZ
// OVC
//  - careers
// age, gender, location

const EnrollmentStatus = ({ sex, dob }: UserDataProps) => {
  return (
    <div>
      <h1 className="font-bold">CALHIV</h1>
      {sex === 'F' && calculateAge(dob) > 14 && (
        <div>
          <Badge variant={'secondary'} className="shadow-none rounded-full">
            OTZ
          </Badge>
          <Badge variant={'secondary'} className="shadow-none rounded-full">
            PMTCT
          </Badge>
        </div>
      )}

      {/*  */}
      {calculateAge(dob) < 9 && (
        <div
        className='flex flex-row space-x-2'
        >
          <Badge variant={'secondary'} className="shadow-none rounded-full">
            OTZ
          </Badge>
          <Badge variant={'secondary'} className="shadow-none rounded-full">
            PAMA
          </Badge>
        </div>
      )}
    </div>
  )
}

export default EnrollmentStatus
