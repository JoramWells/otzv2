import { Avatar, Button, Divider } from '@chakra-ui/react'
import { Pencil } from 'lucide-react'
import moment from 'moment'

const categoryList = [
  {
    id: 1,
    label: 'Appointments'
  },
  {
    id: 2,
    label: 'Enrollments'
  },
  {
    id: 3,
    label: 'Home Visit'
  },
  {
    id: 4,
    label: 'Medical History'
  },
  {
    id: 5,
    label: 'Lab'
  },
  {
    id: 6,
    label: 'Treatment Plan'
  }
]

export interface PatientProfileCardProps {
  userData: keyof UserDataProps
  value: number
  setValue: (value: number) => void
}

export interface UserDataProps {
  firstName?: string
  middleName?: string
  dob?: string
  gender?: string

}

const PatientProfileCard = ({ userData, setValue, value }: PatientProfileCardProps) => {
  return (
    <div
      className="border p-2 rounded-lg shadow-sm
        flex flex-col justify-center
        "
      style={{
        height: '450px'
      }}
    >
      <div
        className="flex flex-col gap-x-4
        items-center
        "
      >
        <Avatar name={`${userData?.firstName} ${userData?.middleName}`} />
        <p className="capitalize font-bold">{`${userData?.firstName} ${userData?.middleName}`}</p>

        <p className="text-slate-500 text-sm">
          {moment().diff(moment(new Date(userData?.dob)), 'years')} yrs
        </p>
        <p className="text-slate-500 text-sm">Gender: {userData?.gender}</p>
        <div className="flex flex-row items-center gap-x-2 text-blue-500 font-bold text-sm">
          <Pencil size={15} /> <p>Edit Profile</p>
        </div>
      </div>

      <Divider className="mt-4" />

      {/* list items */}
      <div className="flex flex-col mt-4 w-80">
        {categoryList.map((item) => (
          <Button
            key={item.id}
            rounded={'md'}
            h={10}
            size={'sm'}
            w={'full'}
            // borderBottom={'2px'}
            fontWeight={'normal'}
            bgColor={`${value === item.id ? 'gray.50' : 'transparent'}`}
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
    </div>
  )
}

export default PatientProfileCard
