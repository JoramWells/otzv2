/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from 'react'

import { Avatar, Button, Divider, useToast } from '@chakra-ui/react'
import {
  useGetInternalLabRequestQuery,
  useUpdateInternalLabRequestMutation
} from '@/api/viraload/internalLabRequest.api'

interface ErrorProps {
  status: string
  error: string
}

const LabDetails = ({ params }: any) => {
  const [results, setResults] = useState('')
  const toast = useToast()
  const labID = params.labID
  const { data: userData, error } = useGetInternalLabRequestQuery(labID)

  const [updateInternalLabRequest, { isLoading, data: updatedData }] =
    useUpdateInternalLabRequestMutation(labID)
  // console.log(updatedData, 'usd')

  // useEffect(() => {
  //   if (updatedData) {
  //     toast({
  //       title: 'Test Updated.',
  //       description: `${updatedData?.testName} test updated successfully!!`,
  //       status: 'success',
  //       isClosable: true,
  //       position: 'top-right'
  //     })
  //   }
  // }, [updatedData, toast])

  const inputValues = {
    id: labID,
    results
  }

  return (
    <div
      className="pt-16 ml-64 p-3 flex flex-row
    gap-x-4
    "
    >
      {/* {error?.error} */}

      <div className="border w-[500px] p-5 rounded-lg">
        <div className="flex flex-col gap-y-4">
          <div
            className="bg-slate-200 h-12 rounded-lg
        flex flex-row items-center p-2
        "
          >
            <p>Test Name: {userData?.testName}</p>
          </div>
          <div
            className="bg-slate-200 h-12 rounded-lg
        flex flex-row items-center p-2
        "
          >
            <p>Specimen Type: {userData?.specimenType}</p>
          </div>
          <div
            className="bg-slate-200 h-12 rounded-lg
        flex flex-row items-center p-2
        "
          >
            <p>Reason: {userData?.reason}</p>
          </div>

          <div
            className="bg-slate-50 h-12 rounded-lg
        flex flex-row items-center p-2
        "
          >
            <p>Update Results:</p>
            <input
              className="flex-1 h-8 rounded-tr-lg rounded-br-lg
            pl-2
            "
              value={results}
              onChange={(e) => {
                setResults(e.target.value)
              }}
            />
          </div>
          <Button
            colorScheme="teal"
            isLoading={isLoading}
            onClick={() => updateInternalLabRequest(inputValues)}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LabDetails
