import * as React from "react";
interface Props {
  readonly noColor?: boolean;
}

export const DownloadIcon: React.FC<Props> = ({ noColor }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 5 4" fill="none">
      <g clipPath="url(#clip0_582_621)">
        <path d="M2.33192 0.164062H2.89611C2.98991 0.164062 3.06537 0.239523 3.06537 0.333321V1.51813H3.68387C3.8094 1.51813 3.87216 1.66975 3.7833 1.75861L2.71063 2.83199C2.65774 2.88489 2.57099 2.88489 2.5181 2.83199L1.44402 1.75861C1.35516 1.66975 1.41792 1.51813 1.54346 1.51813H2.16266V0.333321C2.16266 0.239523 2.23812 0.164062 2.33192 0.164062ZM4.41943 2.81577V3.60564C4.41943 3.69944 4.34397 3.7749 4.25017 3.7749H0.977852C0.884055 3.7749 0.808594 3.69944 0.808594 3.60564V2.81577C0.808594 2.72197 0.884055 2.64651 0.977852 2.64651H2.01244L2.35801 2.99208C2.49976 3.13384 2.72826 3.13384 2.87002 2.99208L3.21558 2.64651H4.25017C4.34397 2.64651 4.41943 2.72197 4.41943 2.81577ZM3.54493 3.43638C3.54493 3.35881 3.48146 3.29534 3.40388 3.29534C3.32631 3.29534 3.26284 3.35881 3.26284 3.43638C3.26284 3.51396 3.32631 3.57743 3.40388 3.57743C3.48146 3.57743 3.54493 3.51396 3.54493 3.43638ZM3.99629 3.43638C3.99629 3.35881 3.93282 3.29534 3.85524 3.29534C3.77766 3.29534 3.71419 3.35881 3.71419 3.43638C3.71419 3.51396 3.77766 3.57743 3.85524 3.57743C3.93282 3.57743 3.99629 3.51396 3.99629 3.43638Z" fill="#58696D" />
      </g>
      <defs>
        <clipPath id="clip0_582_621">
          <rect width="3.61084" height="3.61084" fill="white" transform="translate(0.808594 0.164062)" />
        </clipPath>
      </defs>
    </svg>
  );
};
