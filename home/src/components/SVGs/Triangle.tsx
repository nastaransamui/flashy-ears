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
      <defs>
        <clipPath id="clipPath3411" clipPathUnits="userSpaceOnUse">
          <path
            fill="red"
            fillOpacity="1"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="0.265"
            d="M4.744 5.51V49.2h40.512V5.51H25.234l.013.005c-.07-.015-.054.049-.065.113a.066.066 0 00.012-.002l.09-.092c-.008.04-.007.084-.026.121-.002.004-.009.004-.015.005l.062.095-.015.008a.095.095 0 01-.044.005h-.015l-.017.002-.014.002-.006.007a.023.023 0 01-.004.004v.01h.002c.004-.002.008-.006.013-.007a.1.1 0 01-.009.006l-.003.002h.003l-.004.001-.01.006-.006.002h-.001l-.006.004-.006.018a.065.065 0 01-.01-.004h-.001c-.003 0-.006 0-.009-.002h-.002l-.014.02-.003.006-.055-.012v.009h-.104v-.01h-.005a.265.265 0 00-.002 0h-.02l-.041.02v.003l-.001.006v-.009l-.032.016a.078.078 0 01-.004-.01l-.062.017a.09.09 0 01-.004-.027.42.42 0 01-.006-.03l-.001-.008v-.004c-.005 0-.009 0-.012-.002l.003.003-.002-.001-.004-.003-.003-.002-.002-.002h.001l.004.003V5.8h-.001l-.001-.002-.001-.001-.003-.007h-.016l-.005-.001-.02-.145c.008 0 .014-.002.022-.001l.016.001.008.001h.009l-.047-.059.012-.01.005-.003a.49.49 0 01.043-.013h.014l.015-.005c.021-.005.016-.003.038-.012l.012-.004a.433.433 0 01.019-.007l.012-.004.026-.003.03-.004a.167.167 0 00.028-.006L25 5.512l.006-.001zm20.364.211l-.002.002.002-.002zm-.348.07l.004.006-.002-.002-.002-.003z"
          ></path>
        </clipPath>
      </defs>
      <g strokeWidth="0.2">
        <path

          fill="#bcbcbc"
          fillOpacity="1"
          fillRule="evenodd"
          strokeLinecap="square"
          strokeOpacity="0.988"
          d="M-0.095 -0.1H49.903V49.902H-0.095z"
          display="none"
          paintOrder="markers fill stroke"
        ></path>
        <path
          fill={props.fill}
          stroke={props.outlinestroke}
          fillOpacity={props.fillOpacity}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M24.95 5.553L45.1 49.1H4.9L24.975 5.606"
          clipPath="url(#clipPath3411)"
          display="inline"
          transform="translate(-.095 -.1)"
        ></path>
        <path
          fill="none"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M24.68 5.8h.398"
        ></path>
        <path
          fill="none"
          stroke={props.inlinestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M24.88 7.669L43.593 48H6.214z"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M23.757 10.1L8.905 48"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M10.905 48l11.87-35.7"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M21.748 14.5L12.905 48"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M14.906 48l5.842-31.298"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M19.737 18.9L16.905 48"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M18.906 48l-.146-26.9"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M17.736 23.299L20.903 48"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M22.905 48L16.63 25.5"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M15.614 27.701l9.29 20.3"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M26.904 48L14.594 29.9"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M13.552 32.1L28.904 48"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M30.904 48L12.537 34.302"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M11.547 36.5L32.905 48"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M34.904 48l-24.398-9.299"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M9.492 40.898l27.414 7.103"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M38.904 48L8.476 43.1"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M7.46 45.3L40.906 48"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M25.996 10.1L40.905 48"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M27.015 12.3L38.904 48"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M28.053 14.5L36.906 48"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M29.038 16.702l5.866 31.299"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M30.027 18.9L32.905 48"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M31.024 21.1l-.12 26.9"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M32.037 23.299L28.904 48"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M26.904 48l6.243-22.5"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M34.167 27.701l-9.263 20.3"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M22.905 48L35.183 29.9"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M36.208 32.1L20.903 48"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M18.906 48l18.322-13.699"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M38.249 36.5L16.905 48"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M14.906 48l24.384-9.299"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M40.307 40.898l-27.402 7.103"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M10.905 48l30.421-4.9"
        ></path>
        <path
          fill="none"
          stroke={props.linestroke}
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          d="M42.344 45.3L8.905 48"
        ></path>
      </g>
    </svg>
  );
}

export default Icon;
