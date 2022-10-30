import * as React from "react";
interface Props {
  readonly noColor?: boolean;
  readonly width?: string;
  readonly height?: string;
}

export const PersonIcon: React.FC<Props> = ({ noColor, width, height }: Props) => {
  return (
    <svg
      width={width ? width : "81"}
      height={height ? height : "83"}
      viewBox="0 0 37 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5 6.16498C20.1351 6.16498 21.7031 6.81451 22.8593 7.97066C24.0155 9.12682 24.665 10.6949 24.665 12.33C24.665 13.965 24.0155 15.5331 22.8593 16.6893C21.7031 17.8454 20.1351 18.4949 18.5 18.4949C16.8649 18.4949 15.2969 17.8454 14.1407 16.6893C12.9845 15.5331 12.335 13.965 12.335 12.33C12.335 10.6949 12.9845 9.12682 14.1407 7.97066C15.2969 6.81451 16.8649 6.16498 18.5 6.16498ZM18.5 0C15.2299 0 12.0937 1.29905 9.7814 3.61136C7.46908 5.92368 6.17004 9.05985 6.17004 12.33C6.17004 15.6001 7.46908 18.7362 9.7814 21.0486C12.0937 23.3609 15.2299 24.6599 18.5 24.6599C21.7701 24.6599 24.9063 23.3609 27.2186 21.0486C29.5309 18.7362 30.83 15.6001 30.83 12.33C30.83 9.05985 29.5309 5.92368 27.2186 3.61136C24.9063 1.29905 21.7701 0 18.5 0ZM26.0829 27.6808H10.9171C8.02302 27.6808 5.24751 28.8304 3.20111 30.8768C1.15471 32.9232 0.00505251 35.6987 0.00505251 38.5928V54.8683C-0.0623168 56.5814 0.54622 58.2524 1.69947 59.521C2.85271 60.7895 4.45829 61.5541 6.17004 61.6498V76.0142C6.17004 77.9763 6.94946 79.858 8.33685 81.2454C9.72424 82.6328 11.6059 83.4122 13.568 83.4122H23.432C24.4246 83.4128 25.4072 83.2136 26.3212 82.8264C27.2352 82.4393 28.062 81.8722 28.7523 81.1589C29.4426 80.4456 29.9823 79.6007 30.3392 78.6745C30.6962 77.7483 30.8631 76.7597 30.83 75.7676V61.6498C32.5417 61.5541 34.1473 60.7895 35.3005 59.521C36.4538 58.2524 37.0623 56.5814 36.9949 54.8683V38.5928C36.9949 35.6987 35.8453 32.9232 33.7989 30.8768C31.7525 28.8304 28.977 27.6808 26.0829 27.6808ZM6.17004 55.4848V38.5928C6.16175 37.9671 6.27887 37.3461 6.5145 36.7664C6.75012 36.1867 7.09948 35.6601 7.54194 35.2177C7.98441 34.7752 8.51102 34.4258 9.0907 34.1902C9.67038 33.9546 10.2914 33.8375 10.9171 33.8458H26.0829C26.7086 33.8375 27.3296 33.9546 27.9093 34.1902C28.489 34.4258 29.0156 34.7752 29.4581 35.2177C29.9005 35.6601 30.2499 36.1867 30.4855 36.7664C30.7211 37.3461 30.8383 37.9671 30.83 38.5928V55.4848H24.665V75.8909C24.665 76.2179 24.5351 76.5316 24.3038 76.7628C24.0726 76.994 23.759 77.1239 23.432 77.1239H13.568C13.241 77.1239 12.9274 76.994 12.6962 76.7628C12.4649 76.5316 12.335 76.2179 12.335 75.8909V55.4848H6.17004Z"
        fill="#455154"
      />
    </svg>
  );
};
