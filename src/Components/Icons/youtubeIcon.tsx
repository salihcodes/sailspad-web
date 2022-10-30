import * as React from "react";
interface Props {
  readonly noColor?: boolean;
}

export const YoutubeIcon: React.FC<Props> = ({ noColor }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
    >
      <g clipPath="url(#clip0_1566_1520)">
        <path
          d="M26.9595 3.13946C26.6509 1.96117 25.742 1.03318 24.5879 0.718253C22.496 0.145996 14.1076 0.145996 14.1076 0.145996C14.1076 0.145996 5.71938 0.145996 3.62742 0.718253C2.47331 1.03323 1.56435 1.96117 1.25584 3.13946C0.695312 5.27519 0.695312 9.73118 0.695312 9.73118C0.695312 9.73118 0.695312 14.1872 1.25584 16.3229C1.56435 17.5012 2.47331 18.3905 3.62742 18.7054C5.71938 19.2777 14.1076 19.2777 14.1076 19.2777C14.1076 19.2777 22.4959 19.2777 24.5879 18.7054C25.742 18.3905 26.6509 17.5012 26.9595 16.3229C27.52 14.1872 27.52 9.73118 27.52 9.73118C27.52 9.73118 27.52 5.27519 26.9595 3.13946V3.13946ZM11.3642 13.7769V5.68547L18.3752 9.73128L11.3642 13.7769V13.7769Z"
          fill="#455154"
        />
      </g>
      <defs>
        <clipPath id="clip0_1566_1520">
          <rect
            width="26.9163"
            height="19.1317"
            fill="white"
            transform="translate(0.652344 0.145996)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
