import { calculateAge } from '@/utils/calculateAge'
import { Avatar, Tag } from '@chakra-ui/react'
import { type ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
// import { FaEdit } from 'react-icons/fa'

export interface FullNameProps {
  firstName?: string
}

interface ColumnProps {
  id: any
  header: string
  accessorKey?: keyof PatientProps
  // render?: (props: any) => React.ReactNode
}

export interface PatientProps {
  id?: string
  patient_name?: FullNameProps
  age?: number
  dob?: string
  gender?: string
  mflCode?: string
  occupation?: string
  // action?: React.ReactNode
}

export const columns: Array<ColumnDef<ColumnProps>> = [
  {
    accessorKey: "patient",
    header: "Patient Name",
    cell: (props: any) => (
      <div className="flex flex-row items-center gap-x-2">
        <Avatar
          size={"sm"}
          className="font-bold"
          name={`${props.row.original?.firstName} ${props.row.original?.middleName}`}
        />
        <div>
          <Link
            className="capitalize"
            href={`/patients/${props.row.original.id}`}
          >{`${props.row.original?.firstName} ${props.row.original?.middleName}`}</Link>
          <p>{calculateAge(props.row.original?.dob)} yrs</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "ddob",
    header: "Patient Type",
  },
  {
    accessorKey: "sex",
    header: "Gender",
  },
  {
    accessorKey: "hospital",
    header: "Hospital",
    cell: ({ row }) => <p>{row.original.hospital?.hospitalName}</p>,
  },
  {
    accessorKey: "school",
    header: "School",
    cell: ({ row }) => <p>{row.original.school?.schoolName}</p>,
  },
  {
    header: "Enrollment",
    cell: ({ row }) => (
      <div className="flex flex-row space-x-2">
        <Tag
          size={"sm"}
          fontWeight={"bold"}
          color={"slategrey"}
          _hover={{
            cursor: "pointer",
          }}
        >
          <Link href={`/enrollment/enroll-otz/${row.original.id}`}>OTZ</Link>
        </Tag>
        <Tag size={"sm"} fontWeight={"bold"} color={"slategrey"}>
          OVC
        </Tag>
        <Tag size={"sm"} fontWeight={"bold"} color={"slategrey"}>
          <Link href={`/enrollment/enroll-pama/${row.original.id}`}>PAMA</Link>
        </Tag>
        <Tag size={"sm"} fontWeight={"bold"} color={"slategrey"}>
          PMTCT
        </Tag>
      </div>
    ),
  },
  {
    // accessorKey: 'action',
    header: "Action",
    cell: ({ row }) => (
      <Link href={`/patients/${row.original.id}`}>See Patient</Link>
    ),
  },
];
