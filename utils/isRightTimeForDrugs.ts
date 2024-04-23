import moment from "moment";

export function checkTime(data: []){
return data?.map((item: any)=>{
    const time = moment(item.timeAndWork?.morningMedicineTime);
    return moment().isSame(time, "minute");
})
}

// export const checkTime = patientsDueMorning?.map((item: any) => {
//   const time = moment(item.timeAndWork?.morningMedicineTime);
//   return moment().isSame(time, "minute");
// });
