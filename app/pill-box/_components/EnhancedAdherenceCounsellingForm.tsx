import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { PlusIcon } from 'lucide-react'
import React from 'react'

const EnhancedAdherenceCounsellingForm = ({ score, adherence }: { score: string, adherence: number }) => {
  return (
    <div className="flex flex-col space-y-4 bg-white flex-1 p-4 rounded-lg">
      {/* <div className="flex flex-col space-y-4 bg-slate-50 rounded-lg border border-slate-200 p-4">
                <div>
                  {' '}
                  Prescribed = Expected No. of Pills x Dispensed Pills{' '}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {' '}
                    {patientAdherence?.noOfPills} ={' '}
                    {patientAdherence?.expectedNoOfPills} +{' '}
                    {patientAdherence?.computedNoOfPills}{' '}
                  </div>
                  <div>
                    <Badge>Not Good</Badge>
                  </div>
                </div>
              </div> */}
      {/* <hr /> */}
      <div className="flex flex-col space-y-2">
        <h5 className="capitalize">Enhanced Adherence Counselling Form</h5>
        {/* {score ?

      } */}
        <div
          className="bg-purple-50 text-purple-500 border border-purple-200 font-bold flex flex-row
            p-1 rounded
                 justify-between"
        >
          <p className='text-[12px]'>MMAS-8</p>
          {score}
        </div>

        <div className="flex justify-between flex-row items-center text-orange-500 bg-orange-50 p-2 rounded-lg ">
          <p className="font-bold">Adherence % (from pill count)</p>
          <span>{adherence}</span>
        </div>

        {/* <small>Discuss the details of this prescription.</small> */}
      </div>
      <hr />

      <div>
        <label>Treatment motivation</label>

        <Textarea placeholder="Treatment motivation" />
      </div>

      <div>
        <label htmlFor="">Barriers to adherence</label>
        <Textarea placeholder="Barriers to adherence" />
      </div>

      <div>
        Your impression about current patients adherence
        <div className="flex justify-between">
          <div>
            <label htmlFor="">Excellent</label>
            <Checkbox />
          </div>

          <div>
            <label htmlFor="">Unsure</label>
            <Checkbox />
          </div>

          <div>
            <label htmlFor="">Inadequate</label>
            <Checkbox />
          </div>
        </div>
      </div>

      <div>
        <h2>Actions</h2>
        <ol>
          <li>Assign Case Manager</li>
          <li>Discuss MDT</li>
        </ol>
      </div>

      <Button className="bg-slate-100 hover:bg-slate-50 text-black">
        <PlusIcon />
        Comment
      </Button>
    </div>
  )
}

export default EnhancedAdherenceCounsellingForm
