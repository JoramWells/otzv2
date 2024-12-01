import { ExtendedPatientVisitsInterface } from "@/api/patient/patientVisits.api";
import { useGetAllDisclosureChecklistByVisitIdQuery } from "@/api/treatmentplan/disclosureChecklist.api";
import { useGetExecuteDisclosureByVisitIdQuery } from "@/api/treatmentplan/full/executeDisclosure.api";
import { useGetPostDisclosureByVisitIdQuery } from "@/api/treatmentplan/full/postDisclosure.api";
import { useGetMmasEightByVisitIDQuery } from "@/api/treatmentplan/mmasEight.api";
import { useGetMmasFourByVisitIDQuery } from "@/api/treatmentplan/mmasFour.api";
import { useGetChildCaregiverReadinessByVisitIdQuery } from "@/api/treatmentplan/partial/childCaregiverReadiness.api";
import { useGetDisclosureEligibilityByVisitIDQuery } from "@/api/treatmentplan/partial/disclosureEligibility.api";
import { useGetTimeAndWorkByVisitIDQuery } from "@/api/treatmentplan/timeAndWork.api";
import Avatar from "@/components/Avatar";
import { calculateAge } from "@/utils/calculateAge";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheckBig, CircleX } from "lucide-react";
import Link from "next/link";
import { PatientVisitsInterface } from "otz-types";

export const patientVisitColumns: Array<ColumnDef<ExtendedPatientVisitsInterface>> = [
  {
    accessorKey: "firstName",
    header: "Patient Name",
    cell: ({ row }) => (
      <div
        className="flex flex-row gap-x-3 items-center
      pt-1 pb-1
      "
      >
        <Avatar
          name={`${row.original?.Patient.firstName} ${row.original?.Patient.middleName}`}
        />
        <Link
          className="capitalize font-semibold text-slate-700 text-[12px] "
          href={`/users/patients/tab/dashboard/${row.original.id}`}
        >{`${row.original?.Patient.firstName} ${row.original?.Patient.middleName}`}</Link>
      </div>
    ),
  },
  {
    accessorKey: "attendedBy",
    header: "Attended By",
    cell: ({ row }) => (
      <div
        className="flex flex-row gap-x-3 items-center
      pt-1 pb-1
      "
      >
        <Link
          className="capitalize font-semibold text-slate-700 text-[12px] "
          href={`/users/patients/tab/dashboard/${row.original.id}`}
        >{`${row.original?.User?.firstName} ${row.original?.User?.middleName}`}</Link>
      </div>
    ),
  },
  {
    accessorKey: "mmas",
    header: "MMAS",
    cell: ({ row }) => {
      const { id } = row.original;

      const { data: mmas8Data } = useGetMmasEightByVisitIDQuery(id!, {
        skip: !id,
      });
      console.log(mmas8Data, "dtmx");
      return (
        <div>
          <p className="text-[14px]">MMAS-8</p>
          {mmas8Data ? (
            <CircleCheckBig className="text-emerald-500" />
          ) : (
            <CircleX />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "disclosure",
    header: "Partial Disclosure",
    cell: ({ row }) => {
      const { id } = row.original;
      const { data } = useGetDisclosureEligibilityByVisitIDQuery(id!, {
        skip: !id,
      });

      const { data: readinessData } =
        useGetChildCaregiverReadinessByVisitIdQuery(id, {
          skip: !id,
        });
      return (
        <div className="flex space-x-2 items-start">
          <div>
            <p>Eligibility</p>
            <div>
              {data ? (
                <CircleCheckBig className="text-emerald-500" />
              ) : (
                <CircleX />
              )}
            </div>
          </div>

          {/*  */}
          <div>
            <p>Readiness</p>
            <div>
              {readinessData ? (
                <CircleCheckBig className="text-emerald-500" />
              ) : (
                <CircleX />
              )}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "fullDisclosure",
    header: "Full Disclosure",
    cell: ({ row }) => {
      const { id } = row.original;
      const { data } = useGetExecuteDisclosureByVisitIdQuery(id, {
        skip: !id,
      });

      const { data: postData } = useGetPostDisclosureByVisitIdQuery(id, {
        skip: !id,
      });
      return (
        <div className="flex space-x-2 items-start">
          <div>
            <p>Executed</p>
            <div>
              {data ? (
                <CircleCheckBig className="text-emerald-500" />
              ) : (
                <CircleX />
              )}
            </div>
          </div>

          {/*  */}
          <div>
            <p>Post Disclosure</p>
            <div>
              {postData ? (
                <CircleCheckBig className="text-emerald-500" />
              ) : (
                <CircleX />
              )}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => {
      const { id } = row.original;
      const { data } = useGetTimeAndWorkByVisitIDQuery(id, {
        skip: !id,
      });

      return (
        <div className="flex space-x-2 items-start">
          <div>
            <p>Executed</p>
            <div>
              {data ? (
                <CircleCheckBig className="text-emerald-500" />
              ) : (
                <CircleX />
              )}
            </div>
          </div>

        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    // cell: ({ row }) => (
    //   <Button
    //   className=''
    //   variant={'outline'}
    //   >
    //     <Link href={`/patients/add-triage/${row.original?.Patient?.id}?appointmentID=${row.original?.id} `}>See Patient</Link>
    //   </Button>
    // )
  },
];
