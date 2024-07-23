/* eslint-disable @typescript-eslint/strict-boolean-expressions */
interface PillBoxProps {
  noOfPills: number
  remainingPills: number | undefined
}

// reorder level 1/5
const getReorderLevel = (noOfPills: number) => {
  return Math.floor(noOfPills / 5)
}

const getFillColor = (remainingPills: number, noOfPills: number) => {
  const fillPercentage = (remainingPills / noOfPills) * 100
  if (fillPercentage >= 60) {
    return '#4CAF50'
  } else if (fillPercentage >= 30) {
    return '#FFEB3B'
  } else {
    return '#F44336'
  }
}

const PillBox = ({ noOfPills, remainingPills }: PillBoxProps) => {
  const isReorder = remainingPills ? remainingPills < getReorderLevel(noOfPills) : false
  const fillColor = remainingPills ? getFillColor(remainingPills, noOfPills) : '#fff'
  const fillHeight = remainingPills ? (remainingPills / noOfPills) * 54 : 34
  return (
    <>

      {/*  */}
      <svg
        width="32"
        height="59"
        viewBox="0 0 32 59"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 1H20C21.3062 1 22.4175 1.83481 22.8293 3H9.17071C9.58254 1.83481 10.6938 1 12 1Z"
          stroke={isReorder ? '#F44336' : fillColor}
          strokeWidth="2"
        />
        <rect
          x="1"
          y="4"
          width="30"
          height={fillHeight}
          rx="7"
          fill={fillColor}
          stroke={isReorder ? '#f44336' : fillColor}
          strokeWidth="2"
        />
        <text
          x="16"
          y="28.5"
          fontFamily="Arial"
          fontSize="12"
          fontWeight={'bold'}
          fill="black"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {remainingPills}
        </text>
      </svg>
    </>
  )
}

export default PillBox
