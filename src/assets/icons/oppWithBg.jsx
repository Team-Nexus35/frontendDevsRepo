
const OppWithBg = (props) => (
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
      d="M24 34c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M24 30a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M24 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
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
export default OppWithBg