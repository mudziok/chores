import * as React from "react";
import Svg, {
  SvgProps,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
export const Logo = (props: SvgProps) => (
  <Svg width={40} height={55} fill="none" {...props}>
    <Circle
      cx={20}
      cy={8}
      r={7}
      fill="url(#a)"
      stroke="url(#b)"
      strokeWidth={2}
    />
    <Path
      fill="url(#c)"
      stroke="url(#d)"
      strokeWidth={2}
      d="M37 33.5 23.535 20.035a5 5 0 0 0-7.07 0L3 33.5c-1.107 1.107-.323 3 1.243 3 .97 0 1.757.787 1.757 1.757V49a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V38.257c0-.97.787-1.757 1.757-1.757 1.566 0 2.35-1.893 1.243-3Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={12}
        x2={31.5}
        y1={-10.5}
        y2={36.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EB25EF" />
        <Stop offset={1} stopColor="#650DBD" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={8}
        x2={33}
        y1={-26}
        y2={53.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EB25EF" />
        <Stop offset={1} stopColor="#650DBD" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={0}
        x2={40}
        y1={-9.5}
        y2={96.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EB25EF" />
        <Stop offset={1} stopColor="#650DBD" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={7.5}
        x2={27}
        y1={-4}
        y2={73.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EB25EF" />
        <Stop offset={1} stopColor="#650DBD" />
      </LinearGradient>
    </Defs>
  </Svg>
);
