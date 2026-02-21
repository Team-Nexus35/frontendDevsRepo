import * as React from "react"
const  FinancialIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <path
      fill="#FFEDD4"
      d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24Z"
    />
    <path
      stroke="#F54900"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M24 14v20M29 17h-7.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H18"
    />
  </svg>
)
export default FinancialIcon
