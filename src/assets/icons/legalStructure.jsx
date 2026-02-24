import * as React from "react"
const LegalStructureIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <path
      fill="#F3E8FF"
      d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24Z"
    />
    <path
      stroke="#9810FA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 34V16a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18H18ZM18 24h-2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M30 21h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M22 18h4M22 22h4M22 26h4M22 30h4"
    />
  </svg>
)
export default LegalStructureIcon
