import * as React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const eyeSvg = (props: any) => {
  return (
    <svg
      {...props}
      className="svg-icon"
      style={{
        width: "3em",
        height: "1.5em",
        verticalAlign: "middle",
        fill: "currentColor",
        overflow: "hidden"
      }}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M67.84 367.36a32 32 0 1 1 56.32-32A443.52 443.52 0 0 0 512 576a443.52 443.52 0 0 0 387.84-239.36 32 32 0 1 1 56.32 32A508.48 508.48 0 0 1 512 640 508.48 508.48 0 0 1 67.84 367.36z" />
      <path d="M169.28 489.28a32 32 0 0 1 45.44 45.44l-64 64a32 32 0 0 1-45.44-45.44zM480 608a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0z m-197.44-43.52a32 32 0 0 1 41.28-18.24 32 32 0 0 1 18.56 41.28l-24.64 64a32 32 0 1 1-59.52-23.04z m526.72-29.76a32 32 0 0 1 45.44-45.44l64 64a32 32 0 0 1-45.44 45.44z m-135.04 52.8a32 32 0 0 1 59.52-23.04l24.64 64a32 32 0 0 1-18.56 41.28 32 32 0 0 1-41.28-18.24z" />
    </svg>
  );
};

export default eyeSvg;
