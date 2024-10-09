import moment from 'moment'

const BloodPressureCard = ({ createdAt, systolic, diastolic }: { createdAt: Date, systolic: number, diastolic: number }) => {
  return (
    <div className="rounded p-2 flex-1 items-center bg-white relative border-l-4 border-slate-200 ">
      <div className="flex justify-between w-full items-center text-[14px]  ">
        <p
        //   className={`text-[14px] font-semibold
        //           ${bmi > 30 && 'text-red-500'}
        //           `}
        className='font-bold'
        >
          Blood Pressure
        </p>

        <p className="text-slate-500 text-[12px] ">
          {moment(createdAt).format('ll')}
        </p>
      </div>
      <div className="mt-2 flex items-center space-x-4">
        <div>
          <p className="text-lg font-extrabold text-slate-700">{systolic}</p>
          <p
          className='text-[12px] text-slate-500 font-semibold'
          >Systolic</p>
        </div>
        <div
        className='text-slate-500'
        >/</div>
        <div>
          <p className="text-lg font-extrabold text-slate-700">{diastolic}</p>
          <p
          className='text-[12px] text-slate-500 font-semibold'
          >Diastolic</p>
        </div>
      </div>
    </div>
  )
}

export default BloodPressureCard
