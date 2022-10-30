import * as React from "react";
interface Props {
  width?: string;
  height?: string;
  readonly noColor?: boolean;
  onClick?: () => void;
}

export const Send: React.FC<Props> = ({ noColor, onClick, width, height }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "18"} height={height ? height : "18"} viewBox="0 0 18 18"
      fill="none"
      onClick={onClick}
    >
      <path d="M17.031 0.209325C16.934 0.112777 16.8115 0.0459316 16.6778 0.0166469C16.5441 -0.0126377 16.4048 -0.00314388 16.2763 0.0440123L0.463847 5.79401C0.327477 5.84574 0.210071 5.93773 0.127221 6.05776C0.0443717 6.17779 0 6.32019 0 6.46604C0 6.61189 0.0443717 6.75429 0.127221 6.87433C0.210071 6.99436 0.327477 7.08635 0.463847 7.13807L6.63791 9.60339L11.1948 5.03214L12.2082 6.04557L7.62978 10.624L10.1023 16.7981C10.1555 16.9318 10.2477 17.0465 10.3669 17.1272C10.4861 17.2079 10.6268 17.251 10.7707 17.2509C10.916 17.2479 11.0569 17.201 11.175 17.1163C11.293 17.0316 11.3826 16.9131 11.432 16.7765L17.182 0.964012C17.2309 0.836849 17.2428 0.698384 17.216 0.564764C17.1893 0.431143 17.1251 0.307873 17.031 0.209325Z" fill="#58696D" />
    </svg>
  );
};