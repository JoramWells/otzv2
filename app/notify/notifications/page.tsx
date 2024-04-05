import Avatar from '@/app/_components/Avatar'
import moment from 'moment'

const NotificationPage = () => {
  return (
    <div className="pt-14 w-full flex flex-row items-center justify-center">
      <div className="p-2 flex space-x-6 border rounded-lg w-1/2">
        <Avatar name="Ruth Kiloni"
        />
        <div>
          <p
          className='text-lg font-bold'
          >Ruth Kiloni</p>
          <p className='text-slate-500'>Lorem Ipsum...</p>
          <p className='text-slate-500 text-sm'>{moment().format('ll')}</p>
        </div>
      </div>
    </div>
  )
}

export default NotificationPage
