import React from "react";
interface PropTypes {
  outlinestroke: string;
  inlinestroke: string;
  linestroke: string;
  fill: string;
  fillOpacity: number;
}
function Icon(props: PropTypes) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50mm"
      height="50mm"
      version="1.1"
      viewBox="0 0 50 50"
    >
      <g
        stroke={props.outlinestroke}
        strokeDasharray="none"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="4"
        strokeOpacity="1"
        strokeWidth="0.2"
      >
        <path
          fill={props.fill}
          fillOpacity={props.fillOpacity}
          d="M19 9l-5 4.998v22l5 5h12l5-5v-22L31 9z"
        ></path>
        <path
          fill={props.fill}
          fillOpacity={props.fillOpacity}
          stroke={props.inlinestroke}
          d="M19.544 10.199l-4.545 4.655v20.491l4.545 4.656h10.908L35 35.345v-20.49l-4.547-4.656z"
        ></path>
        <path stroke={props.linestroke} fill="none" d="M14.999 14.854h20"></path>
        <path stroke={props.linestroke} fill="none" d="M14.999 16.97h20"></path>
        <path stroke={props.linestroke} fill="none" d="M14.999 19.087h20"></path>
        <path stroke={props.linestroke} fill="none" d="M14.924 35.202h20"></path>
        <path stroke={props.linestroke} fill="none" d="M14.924 33.615h20"></path>
        <path stroke={props.linestroke} fill="none" d="M35 19.087L14.923 33.615"></path>
      </g>
    </svg>
  );
}

export default Icon;
