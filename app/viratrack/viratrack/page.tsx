/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { CustomTable } from '../../_components/table/CustomTable'
import { columns } from '../columns'
import { useEffect, useMemo, useState } from 'react'

import { useSearchParams } from 'next/navigation'
import { useGetAllViralLoadTestsQuery, type ExtendedViralLoadInterface } from '@/api/enrollment/viralLoadTests.api'
import BreadcrumbComponent from '@/components/nav/BreadcrumbComponent'
import { useUserContext } from '@/context/UserContext'
import debounce from 'lodash/debounce'
import CustomSelectParams from '@/components/forms/CustomSelectParams'
// interface ItemsProps {
//   dob: MomentInput
// }

const dataList2 = [
  {
    id: '1',
    label: 'home',
    link: '/'
  },
  {
    id: '2',
    label: 'Dashboard',
    link: '/'
  }
]

const TrackPage = () => {
    const searchParams = useSearchParams();
  const [pageSize, setPageSize] = useState(1);
  const [total, setTotal] = useState(1);

    const page = searchParams.get("page");
  const tab = searchParams.get('tab')
  const [value, setValue] = useState<string | null>(tab)
  const [search, setSearch] = useState("");

const [viralData, setViralData] = useState()

  const {authUser} = useUserContext()
  const debounceSearch = useMemo(() => {
    // setSearch(value)
    if (page !== null) {
      return debounce(async (value: string) => {
        setSearch(value);
      }, 500);
    }
  }, [page]);

  useEffect(() => {
    debounceSearch?.(search);
    return () => debounceSearch?.cancel();
  }, [debounceSearch, search]);
  const { data: vlData, isLoading } = useGetAllViralLoadTestsQuery(
    {
      hospitalID: authUser?.hospitalID as string,
      page: Number(page) ?? 1,
      pageSize: 10,
      searchQuery: search,
    },
    {
      skip: !authUser?.hospitalID,
    }
  );

  useEffect(()=>{
    if(vlData){
      setViralData(vlData.data)
      setTotal(vlData.total)
    }
  },[vlData])

    const pageNumber = (count: number, pageSize: number) => {
      return Math.ceil(count / pageSize);
    };
    const [vl, setVLResults] = useState('')

   function AgeFilter() {
     return (
       <div className="flex flex-row space-x-2 items-center">
         <CustomSelectParams
           label="VL Results"
           onChange={setVLResults}
           paramValue="vl"
           value={vl as string}
           data={[
             {
               id: "All",
               label: "All",
             },
             {
               id: "LDL",
               label: "LDL",
             },
             {
               id: "Low Risk LLV",
               label: "Low Risk LLV",
             },
             {
               id: "High Risk LLV",
               label: "High Risk LLV",
             },
             {
               id: "Suspected Treatment Failure",
               label: "Suspected Treatment Failure",
             },
           ]}
           placeholder="VL Results"
         />

         {/*  */}
         <CustomSelectParams
           label="Reason"
           onChange={setVLResults}
           paramValue="vl"
           value={vl as string}
           data={[
             {
               id: "All",
               label: "All",
             },
             {
               id: "Clinical failure",
               label: "Clinical failure",
             },
             {
               id: "Routine",
               label: "Routine",
             },
             {
               id: "Confirmation of TF",
               label: "Confirmation of TF",
             },
             {
               id: "Simple Drug Substitution",
               label: "Simple Drug Substitution",
             },
             {
               id: "Breastfeeding",
               label: "Breastfeeding",
             },
             {
               id: "Suspected TF",
               label: "Suspected TF",
             },
             {
               id: "PLLV",
               label: "PLLV",
             },
             {
               id: "Pregnancy",
               label: "Pregnancy",
             },
           ]}
           placeholder="Reason"
         />
         {/*  */}
         <CustomSelectParams
           label={`Page No :- ${pageNumber(total, 10)}`}
           paramValue="page"
           onChange={setPageSize}
           value={`${pageSize}`}
           data={Array.from({ length: pageNumber(total, 10) }, (_, index) => ({
             id: `${index + 1}`,
             label: `${index + 1}`,
           }))}
           placeholder="Page"
         />
         {/* <CustomSelectParams
           label={`Page No :- ${pageNumber(patientTotal, 10)}`}
           paramValue="casemanager"
           onChange={setCaseManager}
           value={caseManager}
           data={caseManagerOptions ?? []}
           placeholder="Case Manager"
         /> */}
       </div>
     );
   }

  return (
    <>
      <BreadcrumbComponent dataList={dataList2} />

      <div className='mt-2 mb-2 ' >
 
      </div>
      <div className="p-2 bg-white">
        <CustomTable columns={columns}
        isLoading={isLoading}
        data={viralData || []} 
        search={search}
        setSearch={setSearch}
        filter={<AgeFilter />}
        />
        
      </div>
    </>
  )
}

export default TrackPage
