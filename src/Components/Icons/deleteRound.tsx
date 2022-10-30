import React from "react";

interface Props {
  readonly noColor?: boolean;
  readonly width?: string;
  readonly height?: string;
}

const Delete = ({ width, height }: Props) => {
  return (
    <svg width={width ? width : "19"} height={height ? height : "19"} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.17724" cy="9.94677" r="9.03857" fill="#A0A9AB" />
      <path fillRule="evenodd" clipRule="evenodd" d="M4.86184 5.63808C5.13337 5.35762 5.57359 5.35762 5.84511 5.63808L9.17749 9.08013L12.5099 5.63808C12.7814 5.35762 13.2216 5.35762 13.4931 5.63808C13.7647 5.91854 13.7647 6.37325 13.4931 6.65371L10.1608 10.0958L13.2051 13.2403C13.4767 13.5208 13.4767 13.9755 13.2051 14.256C12.9336 14.5364 12.4934 14.5364 12.2219 14.256L9.17749 11.1114L6.1331 14.256C5.86158 14.5364 5.42136 14.5364 5.14984 14.256C4.87832 13.9755 4.87832 13.5208 5.14984 13.2403L8.19422 10.0958L4.86184 6.65371C4.59032 6.37325 4.59032 5.91854 4.86184 5.63808Z" fill="#414546" />
    </svg>
  );
};

export default Delete;

