import * as React from "react";
import { CustomIconProps } from "./types";
import { useTheme } from "@material-ui/core/styles";

export const SignUpBanner: React.FC<CustomIconProps> = ({
  width,
  height,
  color = "gray"
}) => {
  const theme = useTheme();

  return (
    <svg width="1854" height="2017" viewBox="0 0 1854 2017" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect width="1854" height="2017" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_1180_266" transform="translate(0 -0.0138312) scale(0.000517598)" />
        </pattern>
      </defs>
    </svg>

  );
};