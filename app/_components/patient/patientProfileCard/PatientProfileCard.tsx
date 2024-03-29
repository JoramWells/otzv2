import { Button } from '@/components/ui/button'
import { Avatar, Divider, Tag } from '@chakra-ui/react'
import { Pencil } from 'lucide-react'
import moment from 'moment'
import { useRouter } from 'next/navigation'

// const categoryList = [
//   {
//     id: 1,
//     label: 'Appointments'
//   },
//   {
//     id: 2,
//     label: 'Enrollments'
//   },
//   {
//     id: 3,
//     label: 'Home Visit'
//   },
//   {
//     id: 4,
//     label: 'Medical History'
//   },
//   {
//     id: 5,
//     label: 'Lab'
//   },
//   {
//     id: 6,
//     label: 'Treatment Plan'
//   },
//   {
//     id: 7,
//     label: 'Settings'
//   }
// ]

export interface PatientProfileCardProps {
  userData: UserDataProps
  value: number
  setValue: (value: number) => void
}

export interface UserDataProps {
  id: string
  firstName?: string
  middleName?: string
  dob?: string
  sex?: string

}

const PatientProfileCard = ({ userData, setValue, value }: PatientProfileCardProps) => {
  const router = useRouter()

  return (
    <div
      className="flex flex-col justify-center w-[35%] pr-2 border border-slate-200 rounded-lg p-2"
      // style={{
      //   height: '455px'
      // }}
    >
      <div
        className="flex flex-col gap-x-4
        items-center
        "
      >
        <div className="bg-white p-[3px] rounded-full border-2 border-red-500">
          <Avatar
            // size={'sm'}
            name={`${userData?.firstName} ${userData?.middleName}`}
          />
        </div>
        <p
          className="capitalize font-bold
        text-lg
        "
        >{`${userData?.firstName} ${userData?.middleName}`}</p>

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
      <div className="flex flex-col mt-2 w-full p-2">
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

        <div
          className="mt-4 flex flex-col space-y-2 bg-slate-50
        p-3 border border-slate-200 rounded-lg
        "
        >
          <h1 className="font-bold ">VL Status</h1>
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Status</p>{' '}
            <Tag variant={'outline'} rounded={'full'} size={'sm'}>
              LDL
            </Tag>
          </div>

          {/*  */}
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Date Taken</p>{' '}
            <p className="text-sm">{moment(new Date()).format('ll')}</p>
          </div>

          {/*  */}
          <div className="flex flex-row items-center justify-between">
            <p className="text-sm font-bold text-slate-500">Next VL Test</p>{' '}
            <p className="text-sm">{moment(new Date()).format('ll')}</p>
          </div>
        </div>

        <div className="mt-4 w-full flex flex-col space-y-2">
          <Button
            className="w-full bg-slate-50 text-slate-600 font-bold shadow-none border border-slate-200 hover:bg-slate-100"
            // variant={'link'}
            onClick={() => {
              router.push(`/caregiver/${userData?.id}`)
            }}
          >
            Care Giver
          </Button>
          <Button
            className="w-full bg-slate-50 text-slate-600 font-bold shadow-none border border-slate-200 hover:bg-slate-100"
            onClick={() => {
              router.push('/casemanager/add-case-manager')
            }}
            // variant={'link'}
          >
            Case Manager
          </Button>

          <Button
            className="w-full bg-slate-50 text-slate-600 font-bold shadow-none border border-slate-200 hover:bg-slate-100"

            // variant={'link'}
          >
            Message
          </Button>
        </div>

        {/* {categoryList.map((item) => (
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
        ))} */}
      </div>
    </div>
  )
}

export default PatientProfileCard
