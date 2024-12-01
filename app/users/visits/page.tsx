'use client'

import { ExtendedPatientVisitsInterface, useGetAllPatientVisitsQuery } from '@/api/patient/patientVisits.api';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { PatientVisitsInterface, UserInterface } from 'otz-types';
import React, { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash/debounce'
import { CustomTable } from '@/app/_components/table/CustomTable';
import { patientVisitColumns } from './column';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const BreadcrumbComponent = dynamic(
  async () => await import("@/components/nav/BreadcrumbComponent"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[52px] rounded-none" />,
  }
);

const dataList2 = [
  {
    id: "1",
    label: "home",
    link: "/",
  },
  {
    id: "2",
    label: "Patients",
    link: "/",
  },
];

const PageVisits = () => {
  // const datax = await getPatients()

  const { data: session } = useSession();

  const [user, setUser] = useState<UserInterface>();
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();
  const [patientData, setPatientData] = useState<
    ExtendedPatientVisitsInterface[] | undefined
  >([]);
  const [patientTotal, setPatientTotal] = useState<number>(0);
  const page = searchParams.get("page");
  const tab = searchParams.get("tab");
  const casemanagerParam = searchParams.get("casemanager");
  const [pageSize, setPageSize] = useState(1);
  const [caseManager, setCaseManager] = useState("");

  const [tabValue, setTabValue] = useState(tab);

  useEffect(() => {
    if (session) {
      setUser(session?.user as UserInterface);
    }
  }, [session]);

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

  const { data, isLoading } = useGetAllPatientVisitsQuery(
    {
      hospitalID: user?.hospitalID as string,
      page: Number(page) ?? 1,
      pageSize: 5,
      searchQuery: search,
    },
    {
      skip: !user?.hospitalID && !tabValue && tabValue === tab,
    }
  );

  
  useEffect(() => {
    if (data) {
      setPatientData(data?.data);
      setPatientTotal(data?.total);
    }
    // if (tab === null) {
    //   setTabValue("All");
    // }
  }, [data, tab]);

  return (
    <div>
      <BreadcrumbComponent dataList={dataList2} />

      <CustomTable
        columns={patientVisitColumns}
        data={patientData ?? []}
        total={patientTotal}
        isLoading={isLoading}
        search={search}
        setSearch={setSearch}
        // filter={<AgeFilter />}

        // isSearch
      />
    </div>
  );
}

export default PageVisits