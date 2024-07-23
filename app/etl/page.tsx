/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import dynamic from 'next/dynamic'
import React, {
  type FormEvent,
  useEffect,
  useState,
  useMemo,
  type ChangeEvent
} from 'react'
import Papa, { type ParseMeta } from 'papaparse'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { type ColumnDef } from '@tanstack/react-table'
import { Calendar } from '@/components/ui/calendar'
import { addDays } from 'date-fns'
import { type DateRange } from 'react-day-picker'
import { CaseManagerDialog } from '@/components/CaseManagerDialog'
import moment from 'moment'
import { useGetAllETLQuery } from '@/api/etl/etl.api'
import Link from 'next/link'
import { linelistColumn } from './columns'
import { Upload } from 'lucide-react'
import DragNDrop from '@/components/DragNDrop'
//
const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)
const dataList = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Dashboard',
    link: '/administrator/dashboard'
  }
]

type CsvRow = Record<string, string>

interface ParseResult<T> {
  data: T[]
  errors: ParseError[]
  meta: ParseMeta
}

interface ParseError {
  type: string
  code: string
  message: string
  row?: number
}

const ETL = () => {
  const [file, setFile] = useState<File | undefined>()
  const [progress, setProgress] = useState(0)
  const [csvArray, setCSVArray] = useState<CsvRow[]>([])
  const [error, setError] = useState<string | null>(null)

  const [headers, setHeaders] = useState<string[]>([])

  const { data } = useGetAllETLQuery()
  console.log(data, 'etl data')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filex = e.target?.files?.[0]
    if (filex) {
      Papa.parse(filex, {
        header: true,
        skipEmptyLines: true,
        complete: (res: ParseResult<CsvRow>) => {
          if (res.errors.length > 0) {
            setError(res.errors.map((e) => e.message).join(', '))
          } else {
            setError(null)
            setCSVArray(res.data)
            setHeaders(res.meta.fields ?? [])
          }
        }
      })
    }
  }

  const columns = useMemo<Array<ColumnDef<any>>>(
    () =>
      headers.map((header) => ({
        accessorKey: header,
        header
      })),
    [headers]
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    if (file != null) {
      formData.append('file', file)
    }
    formData.append('file', '')
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/etl/upload/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (e) => {
            const { loaded, total } = e
            if (total) {
              const percentCompleted = Math.round((loaded * 100) / total)
              setProgress(percentCompleted)
            }
          }
        }
      )
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(progress)
  }, [progress])

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20)
  })

  const [filteredData, setFilteredData] = useState(csvArray)
  useEffect(() => {
    if (csvArray.length > 0) {
      setFilteredData(csvArray)
    }
  }, [csvArray])

  // const handleFilter = (range: DateRange | undefined) => {
  //   const dataFiltered = csvArray.filter((item) => {
  //     if (range !== undefined) {
  //       const tempData = new Date(
  //         moment(item.DOB, 'DD-MM-YY').format('DD-MM-YYYY')
  //       )
  //       return tempData >= range.from && tempData <= range?.to
  //     } else {
  //       return []
  //     }
  //   })
  //   setFilteredData(dataFiltered)
  //   setDate(range)
  // }

  const [dragFiles, setDraggedFiles] = useState<File[]>()

  return (
    <div>
      <BreadcrumbComponent dataList={dataList} />
      <div className="flex justify-between w-full items-center bg-white p-2">
        <p>Manage Data</p>
        {/* <CaseManagerDialog label="Filter" width="1500px">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleFilter}
            numberOfMonths={2}
          />
        </CaseManagerDialog> */}
        <CaseManagerDialog
          width="1500px"
          label={
            <div className="flex flex-row space-x-2 items-center">
              <Upload size={18} className="text-slate-500" />{' '}
              <p className="text-slate-500">Upload</p>
            </div>
          }
        >
          <div
          className='flex justify-center items-center flex-row'
          >
            {csvArray.length > 0 && (
              <>
                <div className="p-4 w-[1450px]">
                  <div className="bg-white rounded-lg p-4">
                    <CustomTable columns={columns} data={filteredData || []} />
                  </div>
                </div>
              </>
            )}
          </div>
          <form action="" onSubmit={handleSubmit}>
            <Input
              // label=''
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
            <Button type="submit">Submit</Button>
          </form>
        </CaseManagerDialog>
      </div>

      {/* {data?.map((item) => (
        <div key={item.id}>
          <Link href={`/etl/${item.id}`}>{item.file}</Link> */}
      {/* <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/api/etl/media/${item.file}`}
          >
            {item.file}{' '}
          </a> */}
      {/* </div>
      ))} */}

      {data?.length > 0 && (
        <>
          <div className="p-4">
            <div className="bg-white rounded-lg p-4">
              <CustomTable columns={linelistColumn} data={data || []} />
            </div>
          </div>
        </>
      )}

      <DragNDrop onFileSelected={setDraggedFiles} />
    </div>
  )
}

export default ETL
