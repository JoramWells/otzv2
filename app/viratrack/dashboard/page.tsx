/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useLabContext } from '@/context/ViralLoadContext'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-lg" />
  }
)

const VLBarChart = dynamic(
  async () => await import('../../_components/charts/VLBarChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-1/4 rounded-lg" />
  }
)

const VLPieChart = dynamic(
  async () => await import('../../_components/charts/VLPieChart'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-1/4 rounded-lg" />
  }
)

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Patients',
    link: ''
  }
]

const NotifyPage = () => {
  // const [user, setUser] = useState()
  const { viralLoadData } = useLabContext()
  // console.log(viralLoadData, 'viralLoadData')
  // const { data: session } = useSession()
  // useEffect(() => {
  //   if (session) {
  //     setUser(session.user)
  //   }
  // }, [session])
  // const { data: vlSuppression } = useGetVLSuppressionRateQuery({
  //   hospitalID: user?.hospitalID,
  //   startDate: new Date('2023-04-05'),
  //   endDate: new Date('2024-11-09')
  // },
  // {
  //   skip: !user?.hospitalID
  // })

  // console.log(vlSuppression, 'vlSuppression')

  return (
    <div className="">
      <BreadcrumbComponent dataList={dataList2} />

      {/* <div className="flex flex-row justify-between items-center bg-white p-4 mt-4">
        <div>
          <p className="text-lg font-bold">Welcome to ViraTrack</p>
          <p>Scheduled the following appointments</p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700
        font-bold shadow-none
        "
          onClick={() => {
            router.push('/patients/add-patients')
          }}
        >
          <PlusCircle size={18} className="mr-2" />
          New Patient
        </Button>
      </div> */}

      <div className=" p-4 bg-white">
        <h1
          className="font-semibold text-xl
        capitalize
        "
        >
          Analytics Appointments
        </h1>
        <div className="flex flex-row space-x-4 mt-2">
          <VLBarChart data={viralLoadData ?? []} />
          <VLPieChart />
        </div>
      </div>
    </div>
  )
}

export default NotifyPage
