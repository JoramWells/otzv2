/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
import { useState } from 'react'
import { type PatientIDProps } from '../../_components/lab/constants/patient'
import HIVMonitoring from '../../_components/lab/blood/panel/HIVMonitoring'
import { CaseManagerDialog } from '../../../components/CaseManagerDialog'
import { useGetInternalLabRequestByIDQuery } from '@/api/viraload/internalLabRequest.api'
import { CustomTable } from '@/app/_components/table/CustomTable'
import { labTabColumns } from './columns'
import CustomTab from '@/components/tab/CustomTab'

const tabList = [
  {
    id: 1,
    label: 'Results'
  },
  {
    id: 2,
    label: 'Requests'
  }
]

const LabTab = ({ patientID }: PatientIDProps) => {
  const [value, setValue] = useState('Results')
  const { data } = useGetInternalLabRequestByIDQuery(patientID)
  console.log(data, 'dtx')
  return (
    <div className="w-full flex  flex-col space-y-4 items-center justify-center mt-4">
      {/*  */}
      <div className="w-full justify-between flex p-4 bg-white">
        <p className="font-extrabold text-lg">Laboratory Sections</p>
        <CaseManagerDialog label="Add Lab Request">
          <HIVMonitoring patientID={patientID} />
        </CaseManagerDialog>
      </div>

      <div
        className="flex flex-row space-x-2
      w-full
      "
      >
        <CustomTab categoryList={tabList} value={value} setValue={setValue} />
      </div>
      {/* <div className="flex space-x-4 flex-row border w-1/2 p-1 rounded-sm items-center">
        <div className="flex space-x-2">
          <CustomSelect
            placeholder="All Reqs."
            data={[]}
            value=""
            onChange={() => {}}
          />
          <CustomSelect
            placeholder="Specimen Type"
            data={[]}
            value=""
            onChange={() => {}}
          />
        </div>
      </div> */}

      <div className="w-full p-4">
        <div
        className='p-4 bg-white rounded-lg'
        >
          <CustomTable data={data || []} columns={labTabColumns} />
        </div>
      </div>

      {/* {value === 2 && <div>Requests</div>} */}
    </div>
  )
}

export default LabTab
