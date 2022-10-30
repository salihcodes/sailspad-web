import * as React from "react";
interface Props {
  readonly noColor?: boolean;
}

export const PatreonIcon: React.FC<Props> = ({ noColor }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <g clipPath="url(#clip0_1566_1279)">
        <path
          d="M24.7899 9.49641C24.7899 14.3269 20.8606 18.261 16.0253 18.261C11.1757 18.261 7.23215 14.3317 7.23215 9.49641C7.23215 4.65158 11.1757 0.708008 16.0253 0.708008C20.8606 0.708008 24.7899 4.65158 24.7899 9.49641ZM0.375 24.1215H4.66668V0.708008H0.375V24.1215Z"
          fill="#455154"
        />
      </g>
      <defs>
        <clipPath id="clip0_1566_1279">
          <rect
            width="24.4149"
            height="24.4149"
            fill="white"
            transform="translate(0.375 0.20752)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
