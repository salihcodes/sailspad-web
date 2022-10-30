import * as React from "react";
interface Props {
  width?: string;
  height?: string;
  readonly noColor?: boolean;
  onClick?: () => void;
  color?: string
}

export const Delete: React.FC<Props> = ({ noColor, onClick ,color}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="20"
      viewBox="0 0 17 20"
      fill="none"
      onClick={onClick}
    >
      <path d="M8.50047 0C9.37283 -6.68962e-07 10.2118 0.328696 10.8439 0.918103C11.476 1.50751 11.8528 2.31253 11.8964 3.16667L11.9007 3.33333H16.1509C16.3676 3.33357 16.5759 3.4149 16.7335 3.56071C16.891 3.70651 16.9858 3.90579 16.9985 4.11783C17.0112 4.32986 16.9409 4.53865 16.8018 4.70153C16.6627 4.8644 16.4655 4.96908 16.2504 4.99417L16.1509 5H15.4292L14.4262 17.1275C14.3614 17.9101 13.9986 18.6401 13.4099 19.1723C12.8211 19.7046 12.0496 20.0001 11.2487 20H5.75227C4.95139 20.0001 4.17984 19.7046 3.59108 19.1723C3.00232 18.6401 2.6395 17.9101 2.57479 17.1275L1.57089 5H0.850047C0.641842 4.99997 0.440888 4.92504 0.2853 4.7894C0.129711 4.65377 0.0303103 4.46688 0.0059503 4.26417L0 4.16667C2.74655e-05 3.96256 0.0764668 3.76555 0.21482 3.61302C0.353173 3.46049 0.543817 3.36305 0.750592 3.33917L0.850047 3.33333H5.10028C5.10028 2.44928 5.45852 1.60143 6.09617 0.976311C6.73383 0.35119 7.59869 0 8.50047 0ZM6.58786 7.70833C6.4338 7.70834 6.28496 7.76304 6.16885 7.86231C6.05274 7.96158 5.97723 8.09871 5.95628 8.24833L5.95033 8.33333V15L5.95628 15.085C5.97728 15.2346 6.05281 15.3717 6.16891 15.4709C6.28501 15.5701 6.43383 15.6248 6.58786 15.6248C6.7419 15.6248 6.89072 15.5701 7.00682 15.4709C7.12292 15.3717 7.19845 15.2346 7.21945 15.085L7.2254 15V8.33333L7.21945 8.24833C7.1985 8.09871 7.12299 7.96158 7.00688 7.86231C6.89077 7.76304 6.74193 7.70834 6.58786 7.70833ZM10.4131 7.70833C10.259 7.70834 10.1102 7.76304 9.99406 7.86231C9.87796 7.96158 9.80244 8.09871 9.78149 8.24833L9.77554 8.33333V15L9.78149 15.085C9.80249 15.2346 9.87802 15.3717 9.99412 15.4709C10.1102 15.5701 10.259 15.6248 10.4131 15.6248C10.5671 15.6248 10.7159 15.5701 10.832 15.4709C10.9481 15.3717 11.0237 15.2346 11.0447 15.085L11.0506 15V8.33333L11.0447 8.24833C11.0237 8.09871 10.9482 7.96158 10.8321 7.86231C10.716 7.76304 10.5671 7.70834 10.4131 7.70833ZM8.50047 1.66667C8.07156 1.66653 7.65844 1.82534 7.34394 2.11125C7.02944 2.39716 6.8368 2.78904 6.80463 3.20833L6.80038 3.33333H10.2006L10.1963 3.20833C10.1641 2.78904 9.9715 2.39716 9.657 2.11125C9.3425 1.82534 8.92939 1.66653 8.50047 1.66667Z" fill={color ? color : "#1E2D3D"} />
    </svg>
  );
};