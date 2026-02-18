
const PeopleWithBg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <rect width={48} height={48} fill="url(#a)" rx={14} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M28 33v-2a4 4 0 0 0-4-4h-6a4 4 0 0 0-4 4v2M21 23a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM34 33v-2a4 4 0 0 0-3-3.87M28 15.13a4 4 0 0 1 0 7.75"
    />
    <defs>
      <linearGradient
        id="a"
        x1={0}
        x2={48}
        y1={0}
        y2={48}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2B7FFF" />
        <stop offset={1} stopColor="#AD46FF" />
      </linearGradient>
    </defs>
  </svg>
)
export default PeopleWithBg
