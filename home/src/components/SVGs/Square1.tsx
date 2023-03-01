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
      <g strokeDasharray="none" strokeMiterlimit="4">
        <path
          fill="#5a5a5a"
          fillOpacity="0.824"
          strokeLinecap="square"
          strokeOpacity="0.988"
          strokeWidth="0"
          d="M0.001 0H49.997V50H0.001z"
          display="none"
          paintOrder="markers fill stroke"
        ></path>
        <path
          stroke={props.outlinestroke}
          fill={props.fill}
          fillOpacity={props.fillOpacity}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M25.045 3.714l19.068 21.081-19.068 21.078L5.977 24.795z"
          display="inline"
        ></path>
        <path
          stroke={props.inlinestroke}
          fill="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.265"
          d="M6.865 24.793l18.179-20.2 18.18 20.2-18.18 20.201z"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M7.775 23.796l17.27-18.002 17.262 18.002"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M41.412 22.794l-16.368-16-16.386 16"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M40.503 21.796L25.044 7.794 9.561 21.796"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M39.644 20.795L25.044 8.8 10.4 20.795"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M38.73 19.796l-13.686-10-13.701 10"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M37.834 18.795l-12.79-8-12.807 8"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M36.985 17.84l-11.94-6.045-11.898 6"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M14.044 16.795l11-4 11.002 4"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M35.108 15.795l-10.064-2-10.08 2"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M42.326 25.796L25.044 43.794 7.777 25.796"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M8.66 26.797l16.384 15.998 16.364-15.998"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M40.519 27.795l-15.475 14-15.467-14"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M10.514 28.796l14.53 11.998L39.65 28.796"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M38.749 29.794L25.044 39.795"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M25.044 39.795l-13.74-10.001"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M12.246 30.796l12.798 7.999 12.857-8"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M37.013 31.767l-11.969 6.029-11.882-6.002"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M14.044 32.794l11 4 11.002-4"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M35.095 33.842l-10.05 1.953-10.078-2"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M15.856 14.795h18.38"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M15.852 34.794h18.369"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M25.044 18.795l6 6-6 6-5.998-6z"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M43.046 24.787l-18.018-6.131"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M43.046 24.794l-17.002-4.998"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M27.046 20.795l16 4"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M28.045 21.796l15 2.998"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M29.045 22.794l14 2"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M30.044 23.796l13.002.998"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M31.045 24.794h12"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M30.044 25.796l13.002-1.002"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M29.045 26.797l14-2.003"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M28.045 27.795l15-3"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M27.046 28.796l16-4.002"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M26.044 29.794l17.002-5"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M25.03 30.934l18.016-6.14"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M7.045 24.794l18.014 6.14"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M24.045 29.794l-17-5"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M23.044 28.796l-16-4.002"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M22.046 27.795l-15.001-3"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M21.044 26.797l-14-2.003"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M20.046 25.796L7.045 24.794"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M19.046 24.794H7.045"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M20.046 23.796l-13.001.998"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M21.044 22.794l-14 2"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M22.046 21.796L7.045 24.794"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M23.044 20.795l-16 4"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M24.045 19.796l-17 4.998"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M25.06 18.657L7.077 24.796"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M22.046 21.796h6v6h-6v-6"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M25.044 21.796l3.001 2.998-3.001 3.001-2.998-3 2.998-3"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M23.55 23.299h2.99v2.994h-2.99z"
          display="inline"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeOpacity="1"
          strokeWidth="0.1"
          d="M25.044 23.299l1.495 1.495-1.495 1.5-1.493-1.5 1.493-1.495"
          display="inline"
        ></path>
      </g>
    </svg>
  );
}

export default Icon;
