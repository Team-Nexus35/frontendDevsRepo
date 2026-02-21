
const DollarWithBg = (props) => (
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
      d="M24 14v20M29 17h-7.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H18"
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
export default DollarWithBg
