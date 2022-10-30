import * as React from "react";
interface Props {
  readonly noColor?: boolean;
}

export const ChatIcon: React.FC<Props> = ({ noColor }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <g clipPath="url(#clip0_1566_1517)">
        <path
          d="M15.8662 4.1504H14.3925V8.39591H15.8662V4.1504ZM11.816 4.13221H10.3423V8.37966H11.816V4.13221ZM5.55316 0.145996L1.87109 3.68405V16.4229H6.28981V19.961L9.97226 16.4229H12.9192L19.5482 10.0535V0.145996H5.55316ZM18.0749 9.34719L15.1291 12.177H12.1826L9.60374 14.6539V12.177H6.28981V1.56168H18.0749V9.34719Z"
          fill="#455154"
        />
      </g>
      <defs>
        <clipPath id="clip0_1566_1517">
          <rect
            width="19.5319"
            height="19.815"
            fill="white"
            transform="translate(0.941406 0.145996)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
