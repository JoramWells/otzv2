interface PillBoxProps {
  noOfPills: number
  remainingPills: number
}

// reorder level 1/5
const getReorderLevel = (noOfPills: number) => {
  return Math.floor(noOfPills / 5)
}

const PillBox = ({ noOfPills, remainingPills }: PillBoxProps) => {
  const isReorder = remainingPills < getReorderLevel(noOfPills)
  return (
    <>
      <svg
        width="80"
        height="128"
        viewBox="0 0 80 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 2H56C59.3137 2 62 4.68629 62 8V14H18V8C18 4.68629 20.6863 2 24 2Z"
          stroke={isReorder ? 'red' : 'black'}
          strokeWidth="4"
        />
        <rect
          x="2"
          y="14"
          width="76"
          height="112"
          rx="6"
          stroke={isReorder ? 'red' : 'black'}
          strokeWidth="4"
        />
        <text
          x="40"
          y="72"
          fontFamily="Arial"
          fontSize="20"
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
