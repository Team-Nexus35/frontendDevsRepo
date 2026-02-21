import * as React from "react"
const FundingNeedsIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <path
      fill="#FCE7F3"
      d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24Z"
    />
    <path
      stroke="#E60076"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M24 34c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z"
    />
    <path
      stroke="#E60076"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M24 30a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
    />
    <path
      stroke="#E60076"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M24 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
    />
  </svg>
)
export default FundingNeedsIcon
