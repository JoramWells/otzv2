/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
import { type PatientProps } from '@/types'
import { calculateAge } from '@/utils/calculateAge'
import { Avatar } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import { Edit, Ellipsis, Pin, TrashIcon } from 'lucide-react'
import moment, { type MomentInput } from 'moment'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useMarkPatientAsImportantMutation } from '@/api/patient/patients.api'
import { type PatientAttributes } from 'otz-types'
import Image from 'next/image'
//
interface AppointmentProps {
  id: any
  User: {
    firstName?: string
    middleName?: string
  }
  AppointmentAgenda: {
    agendaDescription?: string
  }
  AppointmentStatus: {
    statusDescription?: string
  }
  appointmentDate: MomentInput
}

export const columns: Array<ColumnDef<AppointmentProps>> = [
  {
    accessorKey: 'firstName',
    header: 'Requested By',
    cell: ({ row }) => (
      <Link
        className="capitalize font-bold text-slate-700 text-[12px] "
        href={`/patients/${row.original.id}`}
      >{`${row.original.User?.firstName} ${row.original.User?.middleName}`}</Link>
    )
  },
  {
    accessorKey: 'appointmentAgenda',
    header: 'Agenda',
    cell: ({ row }) => (
      <p
      className='text-[12px]'
      >{row.original.AppointmentAgenda?.agendaDescription}</p>
    )
  },
  {
    accessorKey: 'appointmentStatus',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.AppointmentStatus?.statusDescription
      return (
        <div>
          {status === 'Pending' && (
            <Badge className="shadow-none rounded-full bg-orange-50 text-orange-500 hover:bg-orange-50">
              {status}
            </Badge>
          )}

          {status === 'Upcoming' && (
            <Badge className="shadow-none rounded-full bg-blue-50 text-blue-500 hover:bg-blue-50">
              {status}
            </Badge>
          )}

          {status === 'Completed' && (
            <Badge className="shadow-none rounded-full bg-teal-50 text-teal-500 hover:bg-teal-50">
              {status}
            </Badge>
          )}

          {status === 'Cancelled' && (
            <Badge className="shadow-none rounded-full bg-red-50 text-red-500 hover:bg-red-50">
              {status}
            </Badge>
          )}

          {status === 'Rescheduled' && (
            <Badge className="shadow-none rounded-full bg-teal-50 text-teal-500 hover:bg-teal-50">
              {status}
            </Badge>
          )}

        </div>
      )
    },
    enableSorting: true
  },

  {
    accessorKey: 'appointmentDate',
    header: 'Date',
    cell: ({ row }) => (
      <p>{moment(row.original.appointmentDate).format('LL')}</p>
    )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div>
        <TrashIcon />
      </div>
    )
  }
]

interface CaregiverColumnsProps {
  id: string
  firstName?: string
  middleName?: string
  phoneNo?: string
  AppointmentStatus: {
    statusDescription?: string
  }
  appointmentDate: MomentInput
}

export const caregiverColumns: Array<ColumnDef<CaregiverColumnsProps>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => (
      <Link
        className="capitalize font-bold text-slate-700"
        href={`/patients/${row.original.id}`}
      >{`${row.original.firstName} ${row.original.middleName}`}</Link>
    )
  },
  {
    accessorKey: 'phoneNo',
    header: 'Phone No',
    cell: ({ row }) => <p>{row.original.phoneNo}</p>
  },
  {
    accessorKey: 'maritalStatus',
    header: 'Marital Status'
    // cell: ({ row }) => (
    //   <p>{moment(row.original.appointmentDate).format('LL')}</p>
    // )
  },
  {
    accessorKey: 'relationship',
    header: 'Relationship'
    // cell: ({ row }) => (
    //   <p>{moment(row.original.appointmentDate).format('LL')}</p>
    // )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div>
        <TrashIcon />
      </div>
    )
  }
]

interface LabTabProps {
  id: string
  firstName?: string
  middleName?: string
  phoneNo?: string
  AppointmentStatus: {
    statusDescription?: string
  }
  dateRequested: MomentInput
}

export const labTabColumns: Array<ColumnDef<LabTabProps>> = [
  {
    accessorKey: 'testName',
    header: 'Test Name'
    // cell: ({ row }) => (
    //   <Link
    //     className="capitalize font-bold text-slate-700"
    //     href={`/patients/${row.original.id}`}
    //   >{`${row.original.firstName} ${row.original.middleName}`}</Link>
    // )
  },
  {
    accessorKey: 'specimenType',
    header: 'Specimen Type'
    // cell: ({ row }) => <p>{row.original.phoneNo}</p>
  },
  {
    accessorKey: 'urgency',
    header: 'Urgency'
    // cell: ({ row }) => <p>{row.original.phoneNo}</p>
  },
  {
    accessorKey: 'dateRequested',
    header: 'Date Requested',
    cell: ({ row }) => <p>{moment(row.original.dateRequested).format('LL')}</p>
  },
  {
    accessorKey: 'results',
    header: 'results'
    // cell: ({ row }) => (
    //   <p>{moment(row.original.appointmentDate).format('LL')}</p>
    // )
  },
  {
    accessorKey: 'reason',
    header: 'reason'
    // cell: ({ row }) => (
    //   <p>{moment(row.original.appointmentDate).format('LL')}</p>
    // )
  },
  {
    // accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div>
        <TrashIcon />
      </div>
    )
  }
]

export const patientColumns: Array<ColumnDef<PatientAttributes>> = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      const { id, firstName, middleName, avatar } = row.original
      return (
        <div
          className="flex flex-row gap-x-3 items-center
      pt-1 pb-1 text-[12px]
      "
        >
          {avatar
            ? <Image
            // w={0}
            alt="im"
            // placeholder="data:image/..."
            width={25}
            height={25}
            // quality={25}
            // fill
            // objectFit='contain'
            // priority
            className="rounded-full"
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/users/${avatar}`}
            style={{
              width: '25px',
              height: '25px',
              objectFit: 'cover'
            }}
          />
            : <Avatar
            size={'xs'}
            className="font-bold"
            name={`${firstName} ${middleName}`}
          />
    }
          <Link
            className="capitalize  text-blue-500  hover:cursor-pointer hover:underline "
            href={`/users/patients/tab/dashboard/${id}`}
          >{`${firstName} ${middleName}`}</Link>
        </div>
      )
    }
  },
  {
    accessorKey: 'sex',
    header: 'Sex',
    cell: ({ row }) => <p className="text-[12px]">{row.original.sex}</p>
  },
  {
    accessorKey: 'dob',
    header: 'Age',
    cell: ({ row }) => (
      <p className="text-[12px]">{calculateAge(row.original?.dob)}</p>
    ),
    enableSorting: true
  },
  {
    accessorKey: 'phoneNo',
    header: 'Phone No',
    cell: ({ row }) => (
      <div className="text-[12px]">
        {row.original.phoneNo
          ? (
              row.original.phoneNo
            )
          : (
          <Badge
            className="rounded-full shadow-none bg-slate-100 hover:bg-slate-200 hover:cursor-pointer
      text-slate-500 text-[12px]
      "
          >
            Update
          </Badge>
            )}
      </div>
    )
  },
  {
    accessorKey: 'cccNo',
    header: 'CCC No.',
    cell: ({ row }) => <p className="text-[12px]">{row.original.cccNo}</p>
  },
  {
    accessorKey: 'populationType',
    header: 'Population Type',
    cell: ({ row }) => <p className="text-[12px]">{row.original.populationType}</p>
  },
  // {
  //   accessorKey: 'entryPoint',
  //   header: 'Entry Point'
  // },
  {
    accessorKey: 'createdAt',
    header: 'Date of Enrollment',
    cell: ({ row }) => <p
    className='text-[12px]'
    >{moment(row.original.createdAt).format('ll')}</p>
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <DropDownComponent
        id={row.original.id!}
        isImportant={row.original.isImportant!}
      />
    )
  }
]

const DropDownComponent = ({ id, isImportant }: { id: string, isImportant: boolean }) => {
  const [markPatientAsImportant] = useMarkPatientAsImportantMutation()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="hover:cursor-pointer text-slate-500" size={15} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Upcoming Appointments</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          onClick={async () =>
            await markPatientAsImportant({
              id,
              isImportant: !isImportant
            })
          }
        >
          <div className="flex justify-between items-center w-full">
            {isImportant
              ? <p
            className='text-yellow-500'
            >Unpin</p>
              : <p>Pin</p>}
            <Pin
              size={18}
              className={`text-slate-500 ${isImportant && 'text-yellow-500'} `}
            />
          </div>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          <div className="flex justify-between items-center w-full">
            <Link href={`/users/patients/tab/settings/${id}`}>Edit</Link>
            <Edit size={18} className="text-slate-500" />
          </div>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const patientVisitColumns: Array<ColumnDef<PatientProps>> = [
  {
    accessorKey: 'firstName',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div
        className="flex flex-row gap-x-3 items-center
      pt-1 pb-1
      "
      >
        <Avatar
          size={'xs'}
          className="font-bold"
          name={`${row.original?.Patient.firstName} ${row.original?.Patient.middleName}`}
        />
        <Link
          className="capitalize font-semibold text-slate-700 text-[12px] "
          href={`/users/patients/tab/dashboard/${row.original.id}`}
        >{`${row.original?.Patient.firstName} ${row.original?.Patient.middleName}`}</Link>
      </div>
    )
  },
  {
    accessorKey: 'sex',
    header: 'Sex'
    // cell: ({ row }) => <p>{row.original.school?.schoolName}</p>,
  },
  {
    accessorKey: 'dob',
    header: 'Age',
    cell: ({ row }) => <p>{calculateAge(row.original?.dob)}</p>,
    enableSorting: true
  },
  {
    accessorKey: 'phoneNo',
    header: 'Phone No',
    cell: ({ row }) => (
      <div>
        {row.original.phoneNo
          ? (
              row.original.phoneNo
            )
          : (
          <Badge
            className="rounded-full shadow-none bg-slate-100 hover:bg-slate-200 hover:cursor-pointer
      text-slate-500 text-[12px]
      "
          >
            Update
          </Badge>
            )}
      </div>
    )
  },
  {
    accessorKey: 'cccNo',
    header: 'CCC No.'
    // cell: ({ row }) => <p>{row.original.school?.schoolName}</p>,
  },
  {
    accessorKey: 'populationType',
    header: 'Population Type'
  },
  {
    accessorKey: 'action',
    header: 'Action'
    // cell: ({ row }) => (
    //   <Button
    //   className=''
    //   variant={'outline'}
    //   >
    //     <Link href={`/patients/add-triage/${row.original?.Patient?.id}?appointmentID=${row.original?.id} `}>See Patient</Link>
    //   </Button>
    // )
  }
]

export const importantPatientColumn: Array<ColumnDef<PatientAttributes>> = [
  {
    accessorKey: 'firstName',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div
        className="flex flex-row gap-x-3 items-center
      pt-1 pb-1
      "
      >
        <Avatar
          size={'xs'}
          className="font-bold"
          name={`${row.original?.firstName} ${row.original?.middleName}`}
        />
        <Link
          className="capitalize font-semibold text-slate-700 text-[12px] "
          href={`/users/patients/tab/dashboard/${row.original.id}`}
        >{`${row.original?.firstName} ${row.original?.middleName}`}</Link>
      </div>
    )
  },
  {
    accessorKey: 'sex',
    header: 'Sex'
    // cell: ({ row }) => <p>{row.original.school?.schoolName}</p>,
  },
  {
    accessorKey: 'dob',
    header: 'Age',
    cell: ({ row }) => <p>{calculateAge(row.original?.dob)}</p>,
    enableSorting: true
  },
  {
    accessorKey: 'phoneNo',
    header: 'Phone No',
    cell: ({ row }) => (
      <div>
        {row.original.phoneNo
          ? (
              row.original.phoneNo
            )
          : (
          <Badge
            className="rounded-full shadow-none bg-slate-100 hover:bg-slate-200 hover:cursor-pointer
      text-slate-500 text-[12px]
      "
          >
            Update
          </Badge>
            )}
      </div>
    )
  }

  // {
  //   accessorKey: 'action',
  //   header: 'Action',
  //   cell: ({ row }) => (
  //     <Button className="" variant={'outline'}>
  //       <Link
  //         href={`/patients/add-triage/${row.original?.Patient?.id}?appointmentID=${row.original?.id} `}
  //       >
  //         See Patient
  //       </Link>
  //     </Button>
  //   )
  // }
]
