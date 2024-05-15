// import CustomCheckbox from '@/components/forms/CustomCheckbox'
// import CustomSelect from '@/components/forms/CustomSelect'
// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import { useState } from 'react'

// const History = () => {
//   const [onAntiTB, setOnAntiTB] = useState(false)
//   const [onTPT, setONTPT] = useState(false)
//   return (
//     <div>
//       Presenting Complaints
//       <Textarea placeholder="Clinical Notes" />
//       <Button>Add</Button>
//       <p>TB Screening</p>
//       <CustomCheckbox
//         value={onAntiTB}
//         onChange={setOnAntiTB}
//         label="Patient on Anti-TB?"
//       />
//       {!onAntiTB && (
//         <CustomCheckbox
//           label="Patient Currently on TPT"
//           value={onTPT}
//           onChange={setONTPT}
//         />
//       )}
//       {onTPT && !onAntiTB
//         ? (
//         <div>
//           <p>Screenin Questions</p>
//           <CustomSelect
//           label='Cou of any Duration'
//           />
//         </div>
//           )
//         : (
//         <CustomCheckbox label="Patient ever on TPT?" />
//           )}
//     </div>
//   )
// }

// export default History

import React from 'react'

const History = () => {
  return (
    <div>History</div>
  )
}

export default History
