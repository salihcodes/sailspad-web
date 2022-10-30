import * as React from "react";
interface Props {
  readonly noColor?: boolean;
}

export const SpeakerIcon: React.FC<Props> = ({ noColor }: Props) => {
  return (
    <svg
      fill={noColor ? "#414546" : "#33a2f4"}
      width="19" height="16" viewBox="0 0 19 16" xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.88623 6.75C0.88623 5.375 2.05809 4.25 3.49037 4.25H8.69865L15.209 0.5V15.5L8.69865 11.75H7.39658H4.79244H3.49037C2.05809 11.75 0.88623 10.625 0.88623 9.25V6.75Z" fill="#455154" />
      <path d="M16.5111 3.8125C17.709 4.8375 18.4642 6.3375 18.4642 8C18.4642 9.6625 17.709 11.1625 16.5111 12.175V3.8125Z" fill="#455154" />
    </svg>
  );
};