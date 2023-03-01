import * as React from "react"

interface PropTypes {
  outlinestroke: string;
  inlinestroke: string;
  linestroke: string;
  fill: string;
  fillOpacity: number;
}

const SvgComponent = (props: PropTypes) => (
  <svg
    width="50mm"
    height="50mm"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g transform="translate(-38.976 -21.955)">
      <circle
        style={{
          display: "inline",
          fill: props.fill,
          fillOpacity: props.fillOpacity,
          fillRule: "evenodd",
          stroke: props.outlinestroke,
          strokeWidth: 0.2,
          strokeLinecap: "square",
          strokeMiterlimit: 4,
          strokeDasharray: "none",
          strokeOpacity: 0.987742,
          paintOrder: "markers fill stroke",
        }}
        cx={64.084}
        cy={47.059}
        r={21}
        fill="none"
      />
      <circle
        style={{
          display: "inline",
          fill: "#fff",
          fillOpacity: 0,
          fillRule: "evenodd",
          stroke: props.inlinestroke,
          strokeWidth: 0.2,
          strokeLinecap: "square",
          strokeMiterlimit: 4,
          strokeDasharray: "none",
          strokeOpacity: 0.987742,
          paintOrder: "markers fill stroke",
        }}
        cx={63.986}
        cy={46.962}
        r={20.103}
        fill="none"
      />
      <path
        style={{
          display: "inline",
          fill: "none",
          stroke: props.linestroke,
          strokeWidth: 0.2,
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
        d="M63.985 26.847 82.55 54.653M67.909 27.24l12.79 30.892M78.205 61.18l-6.53-32.794M75.154 30.242l-.006 33.43M71.674 65.526l6.529-32.783M80.703 35.79 67.907 66.685M63.985 67.065l18.572-27.792M83.698 43.032 60.06 66.682M56.295 65.538 84.09 46.96M83.63 51.221 52.811 63.686M49.766 61.18l32.783-6.527M80.699 58.132l-33.438.002M45.41 54.65l32.795 6.53M75.148 63.673 44.265 50.89M43.877 46.96l24.03 19.724M63.985 67.065 44.34 42.7M45.41 39.263 60.06 66.682M56.295 65.538l-9.03-29.753M49.764 32.74l3.048 30.946M49.766 61.18l3.05-30.938M56.292 28.386l-9.03 29.748M45.41 54.65 60.06 27.232M63.985 26.847 44.265 50.89"
      />
    </g>
  </svg>
)

export default SvgComponent