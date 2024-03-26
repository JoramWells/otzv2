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
  },
  {
    id: 7,
    label: 'Settings'
  }
]

export interface PatientProfileCardProps {
  userData: UserDataProps
  value: number
  setValue: (value: number) => void
}

export interface UserDataProps {
  firstName?: string
  middleName?: string
  dob?: string
  sex?: string

}

const PatientProfileCard = ({ userData, setValue, value }: PatientProfileCardProps) => {
  return (
    <div
      className="flex flex-col justify-center border rounded-lg
        "
      style={{
        height: '455px'
      }}
    >
      <div
        className="flex flex-col gap-x-4
        items-center
        "
      >
        <div
        className='bg-white p-[3px] rounded-full border-4 border-red-500'
        >
          <Avatar
          size={'sm'}
          name={`${userData?.firstName} ${userData?.middleName}`} />
        </div>
        <p className="capitalize font-bold
        text-lg
        ">{`${userData?.firstName} ${userData?.middleName}`}</p>

        <p className="text-slate-500 text-sm">
          {moment().diff(moment(userData?.dob), 'years')} yrs
        </p>
        <p className="text-slate-500 text-sm">Gender: {userData?.sex}</p>
        <div className="flex flex-row items-center gap-x-2 text-blue-500 font-bold text-sm">
          <Pencil size={15} /> <p>Edit Profile</p>
        </div>
      </div>

      <Divider className="mt-4" />

      {/* list items */}
      <div className="flex flex-col mt-2 w-80">
        {categoryList.map((item) => (
          <Button
            key={item.id}
            rounded={'0'}
            h={10}
            size={'sm'}
            w={'full'}
            // borderBottom={'2px'}
            fontWeight={`${value === item.id ? 'bold' : 'normal'}`}
            borderLeft={`${value === item.id ? '4px' : '0px'}`}
            bgColor={`${value === item.id ? 'slate.50' : 'transparent'}`}
            color={`${value === item.id ? 'black' : 'gray.500'}`}
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
