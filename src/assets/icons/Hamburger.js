import React from "react";

const HamburgerIcon = () => {
  return (
    <>
      <svg
        height={24}
        width={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M20 7L4 7"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            opacity="0.5"
            d="M20 12L4 12"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M20 17L4 17"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </>
  );
};

export default HamburgerIcon;
