import * as React from "react"
const BusinessLocationIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <path
      fill="#DCFCE7"
      d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24Z"
    />
    <path
      stroke="#00A63E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M32 22c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C21.539 32.193 16 26.993 16 22a8 8 0 0 1 16 0Z"
    />
    <path
      stroke="#00A63E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M24 25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
  </svg>
)
export default BusinessLocationIcon
