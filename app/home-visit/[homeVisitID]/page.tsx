/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useGetHomeVisitQuery } from '@/api/homevisit/homeVisit.api'
import { useGetUserLocationQuery } from '@/api/location/userLocation.api'
import MapComponent from '@/app/_components/map/MapComponent'
import { Badge } from '@/components/ui/badge'
import { calculateTimeDuration } from '@/utils/calculateTimeDuration'
import { Skeleton } from '@chakra-ui/react'
import { CalendarCheck2, MapPinOff } from 'lucide-react'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const BreadcrumbComponent = dynamic(
  async () => await import('@/components/nav/BreadcrumbComponent'),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />
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
    link: '/'
  }
]

const HomeVisit = ({ params }: { params: any }) => {
  const searchParams = useSearchParams()

  const { homeVisitID }: { homeVisitID: string } = params
  const patientID = searchParams.get('patientID')
  const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral>()

  const [homeVisitData, setHomeVisitData] = useState({
    returnToClinic: ''
  })
  const { data } = useGetHomeVisitQuery(homeVisitID)
  const { data: locationData } = useGetUserLocationQuery(patientID)
  useEffect(() => {
    if (data != null) {
      const { returnToClinic } = data
      setHomeVisitData({
        returnToClinic
      })
    }
  }, [data])
  console.log(data)
  const [recentVisit, setRecentVisit] = useState<HomeVisitProps>()
  useEffect(() => {
    if (locationData) {
      setCurrentPosition({
        lat: parseInt(locationData.latitude),
        lng: parseInt(locationData.longitude)
      })
    }

    if (data) {
      setRecentVisit(data[0])
    }
  }, [data, locationData])
  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <div className="flex space-x-2 p-4 items-start">
        <div className="border border-slate-200  rounded-lg w-1/2 bg-white">
          <div
            className="p-3 rounded-t-lg bg-slate-100 border-b
           border-slate-200 flex justify-between items-center "
          >
            <h3 className="font-bold">Recent</h3>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1 text-[12px] text-slate-500 ">
                <CalendarCheck2 size={15} />
                <p className="text-black">
                  {moment(recentVisit?.dateRequested).format('ll')}
                </p>
              </div>
              <small className="text-slate-500 ml-4">
                {calculateTimeDuration(recentVisit?.dateRequested)}{' '}
              </small>
            </div>
          </div>
          <div className="p-4 flex flex-col  space-y-2">
            <div>
              {recentVisit && (
                <div className="flex flex-col space-y-2">
                  {/*  */}
                  <div className="flex justify-between items-center  text-[14px] ">
                    <p className="text-slate-500">Reason</p>
                    <p>
                      {recentVisit.HomeVisitReason.homeVisitReasonDescription}
                    </p>
                  </div>

                  <hr />

                  <div
                    className="flex  text-[14px]
                  items-center justify-between "
                  >
                    <p className="text-slate-500">Medicine Counted</p>
                    <div className="flex space-x-2">
                      <p>{recentVisit.noOfPills}</p>
                      {recentVisit.medicineStatus === 'Adequate'
                        ? (
                        <Badge className="shadow-none bg-emerald-600">
                          Adequate
                        </Badge>
                          )
                        : (
                        <Badge className="shadow-none">Inadequate</Badge>
                          )}
                    </div>
                  </div>

                  <hr />

                  <div
                    className="flex justify-between  text-[14px]
                  items-center"
                  >
                    <p className="text-slate-500">Disclosure</p>
                    {recentVisit.isDisclosure
                      ? (
                      <p>Disclosed</p>
                        )
                      : (
                      <p className="text-red-500">Not Disclosed</p>
                        )}
                  </div>

                  <hr />

                  <div
                    className="flex items-center  text-[14px]
                  justify-between"
                  >
                    <p className="text-slate-500">Frequency</p>
                    <p>
                      {
                        recentVisit.HomeVisitFrequency
                          .homeVisitFrequencyDescription
                      }
                    </p>
                  </div>

                  <hr />
                  <div className="justify-between items-center flex  text-[14px] ">
                    <p className="text-slate-500  ">Household Tested</p>

                    {recentVisit.isHouseholdTested
                      ? (
                      <p>Tested</p>
                        )
                      : (
                      <p className="text-red-500 ">Not Tested</p>
                        )}
                  </div>
                  <hr />
                  {/*  */}
                  <div className="flex justify-between items-center text-[14px]  ">
                    <p className="text-slate-500">Support Group Attendance</p>
                    <p>
                      {recentVisit.isSupportGroupAttendance
                        ? 'Support Group'
                        : 'Not in support Group'}{' '}
                    </p>
                  </div>

                  {/*  */}
                  <hr />
                  <div className="flex justify-between w-full ">
                    <p className="text-[14px] text-slate-500 ">Location</p>
                  </div>
                </div>
              )}{' '}
            </div>
          </div>

          {/*  */}
        </div>

        <div>
          {currentPosition
            ? (
            <MapComponent center={currentPosition} />
              )
            : (
            <div>
              <MapPinOff />
            </div>
              )}
        </div>
      </div>
    </div>
  )
}

export default HomeVisit
