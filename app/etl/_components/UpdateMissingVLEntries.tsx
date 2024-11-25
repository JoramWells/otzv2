/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CollapseButton } from '@/components/CollapseButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import moment from 'moment'
import React, { type Dispatch, type SetStateAction } from 'react'
import { type CsvRow, type LineListInterface } from '../add/page'

export interface UpdateMissingVLEntriesProps {
  missingData: LineListInterface[]
  setMissingData: Dispatch<SetStateAction<LineListInterface[] | undefined>>
  setData: Dispatch<SetStateAction<CsvRow[]>>
}

const UpdateMissingVLEntries = ({ missingData, setMissingData, setData }: UpdateMissingVLEntriesProps) => {
  const handleSave = (user: LineListInterface) => {
    setData((prev) =>
      prev.map((item) => {
        return item['CCC No'] === user['CCC No']!
          ? {
              ...item,
              'Last VL Date': user['Last VL Date']!,
              'Last VL Result': user['Last VL Result']!,
              'Last VL Justification': user['Last VL Justification']!
            }
          : item
      })
    )

    // setData(prev => prev.filter(item => {
    //   console.log(item['CCC No'] === user['CCC No'], 'similar')

    //   return item['CCC No'] === user['CCC No']
    // }))

    setMissingData((prev) =>
      prev?.filter((item) => item['CCC No'] !== user['CCC No'])
    )
  }

  //
  const handleSkip = (user: LineListInterface) => {
    setMissingData((prev) =>
      prev?.filter((item) => item['CCC No'] !== user['CCC No'])
    )
  }
  const handleInputChange = (
    cccNo: string | number,
    field: string,
    value: string
  ) => {
    setMissingData((prev) =>
      prev?.map((item) =>
        item['CCC No'] === cccNo ? { ...item, [field]: value } : item
      )
    )
  }
  return (
    <div className="h-[350px] overflow-y-auto w-1/2 flex flex-col space-y-2 p-2">
      {missingData?.map((item) => {
        return (
          <div
            key={item['CCC No']}
            className="border border-slate-200 rounded-lg flex flex-col space-y-2"
          >
            <CollapseButton
              label={
                <div className="flex space-x-2 items-center w-1/2 justify-between">
                  {/* <Avatar name={`${firstName} ${middleName}`} /> */}

                  <p className="font-semibold">{item.Name}</p>
                  <p className="text-[12px] text-slate-500">{item.DOB}</p>
                </div>
              }
            >
              <form className="flex flex-col rounded-lg bg-white border border-slate-100">
                <div className="p-2 pl-4 pr-4">
                  <label
                    htmlFor=""
                    className="text-[14px] font-semibold text-slate-700 mb-2"
                  >
                    Results
                  </label>

                  <Input
                    // label="Results"
                    type="number"
                    onChange={(e) => {
                      handleInputChange(
                        item['CCC No']!,
                        'Last VL Result',
                        e.target.value
                      )
                    }}
                    required
                    defaultValue={0}
                    value={item['Last VL Result']}
                    className="shadow-none"
                  />
                </div>

                {/*  */}
                <div className="p-2 pr-4 pl-4">
                  <label
                    htmlFor=""
                    className="text-[14px] font-semibold text-slate-700 mb-2"
                  >
                    Date of VL
                  </label>
                  <Input
                    // label="Date"
                    type="date"
                    required
                    defaultValue={moment().format('YYYY-MM-DD')}
                    onChange={(e) => {
                      handleInputChange(
                        item['CCC No']!,
                        'Last VL Date',
                        e.target.value
                      )
                    }}
                    className="shadow-none"
                    value={item['Last VL Date']}
                  />
                </div>

                <div className="flex flex-row border-t border-slate-200 justify-end space-x-2 p-2 pl-4 pr-4">
                  <Button
                    className="shadow-none"
                    size={'sm'}
                    variant={'ghost'}
                    onClick={() => {
                      handleSkip(item)
                    }}
                  >
                    Skip
                  </Button>
                  <Button
                    className="shadow-none"
                    size={'sm'}
                    onClick={() => {
                      handleSave(item)
                    }}
                  >
                    Update
                  </Button>
                </div>
              </form>
            </CollapseButton>
            {/* <div
                className='bg-slate-100 p-2 rounded-t-lg border-b border-slate-200'
                >
                  <p>{item.Name}</p>
                </div> */}
          </div>
        )
      })}
    </div>
  )
}

export default UpdateMissingVLEntries
