import * as React from "react";

interface Props {
  readonly noColor?: boolean;
}
export const LinkedInIcon: React.FC<Props> = ({ noColor }: Props) => {
  return (
    <svg
      width="35"
      height="25"
      viewBox="0 0 38 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.167969 3.44769C0.167969 2.60945 0.500957 1.80555 1.09368 1.21282C1.6864 0.620102 2.49031 0.287114 3.32854 0.287114H34.8346C35.25 0.286435 35.6614 0.367698 36.0454 0.526249C36.4293 0.6848 36.7782 0.917526 37.0721 1.2111C37.366 1.50468 37.5991 1.85334 37.7581 2.23713C37.9171 2.62091 37.9988 3.03228 37.9986 3.44769V34.9537C37.999 35.3692 37.9175 35.7807 37.7588 36.1646C37.6001 36.5486 37.3672 36.8975 37.0735 37.1914C36.7798 37.4853 36.431 37.7183 36.0471 37.8773C35.6632 38.0362 35.2518 38.1179 34.8363 38.1177H3.32854C2.91335 38.1177 2.50222 38.0359 2.11865 37.877C1.73508 37.718 1.38658 37.4851 1.09307 37.1914C0.799563 36.8977 0.566793 36.5491 0.40806 36.1654C0.249327 35.7818 0.167743 35.3706 0.167969 34.9554V3.44769ZM15.142 14.7109H20.2646V17.2834C21.004 15.8045 22.8956 14.4736 25.738 14.4736C31.1873 14.4736 32.4787 17.4192 32.4787 22.8238V32.8352H26.9641V24.055C26.9641 20.977 26.2247 19.2402 24.3469 19.2402C21.7417 19.2402 20.6584 21.1129 20.6584 24.055V32.8352H15.142V14.7109ZM5.68436 32.5996H11.2007V14.4736H5.68436V32.5979V32.5996ZM11.99 8.5617C12.0004 9.03402 11.9164 9.50366 11.7428 9.94306C11.5693 10.3825 11.3097 10.7828 10.9793 11.1205C10.649 11.4582 10.2545 11.7265 9.81899 11.9097C9.38352 12.0929 8.91585 12.1873 8.44341 12.1873C7.97098 12.1873 7.5033 12.0929 7.06783 11.9097C6.63236 11.7265 6.23787 11.4582 5.9075 11.1205C5.57714 10.7828 5.31756 10.3825 5.144 9.94306C4.97044 9.50366 4.88639 9.03402 4.89679 8.5617C4.91721 7.6346 5.29984 6.75235 5.96273 6.10389C6.62563 5.45543 7.51609 5.09232 8.44341 5.09232C9.37074 5.09232 10.2612 5.45543 10.9241 6.10389C11.587 6.75235 11.9696 7.6346 11.99 8.5617Z"
        fill="#455154"
      />
    </svg>
  );
};