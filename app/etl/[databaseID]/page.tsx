/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'

import { useGetETLQuery } from '@/api/etl/etl.api'
import { useGetFacilityMapQuery } from '@/api/etl/facilityMAP.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { type ColumnDef } from '@tanstack/react-table'
import Papa, { type ParseMeta } from 'papaparse'

import React, { useEffect, useMemo, useState } from 'react'
import { facilityMAPColumns } from './columns'
import { Button } from '@/components/ui/button'
import CustomPieChart from '../_components/CustomPieChart'

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

const DatabaseDetail = ({ params }: any) => {
  const databaseID = params.databaseID
  const { data } = useGetETLQuery(databaseID)
  const { data: facilityMAPData } = useGetFacilityMapQuery(databaseID)

  const [csvArray, setCSVArray] = useState<CsvRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [headers, setHeaders] = useState<string[]>([])

  const columns = useMemo<Array<ColumnDef<any>>>(
    () =>
      headers.map((header) => ({
        accessorKey: header,
        header
      })),
    [headers]
  )

  console.log(csvArray, 'arraty')

  useEffect(() => {
    if (data?.file) {
      const fetchCSV = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/etl/media/${data?.file}`
        await fetch(url)
          .then(async (res) => await res.text())
          .then((csvText) => {
            Papa.parse(csvText, {
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
          })
      }

      void fetchCSV()
    }
  }, [data])

  const [tabValue, setTabValue] = useState(1)
  // console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/etl/media/${data?.file}`, 'klo')

  return (
    <div>
      <div className="flex flex-row space-x-2 items-center">
        {[
          { id: 1, label: 'Overview' },
          { id: 2, label: 'Data Explorer' }
        ].map((item) => (
          <Button
            key={item.id}
            onClick={() => {
              setTabValue(item.id)
            }}
            className={`${
              item.id === tabValue && 'bg-slate-500'
            } bg-slate-100 text-black hover:bg-slate-50 `}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div>Adult First Line</div>
      {tabValue === 1 && (
        <>
          {csvArray.length > 0 && (
            <>
              <div className="p-4">
                <div className="bg-white rounded-lg p-4">
                 <CustomTable columns={columns} data={csvArray || []} />
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* {moment(facilityMAPData?.createdAt).format("ll")} */}

      {tabValue === 2 && (
        <>
          {facilityMAPData?.details && (
            <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-2  md:grid-cols-2">
              <CustomTable
                columns={facilityMAPColumns}
                data={facilityMAPData?.details || []}
              />
              <div>
                Graphs
                {csvArray.length > 0 && <CustomPieChart data={csvArray || []} />}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default DatabaseDetail
