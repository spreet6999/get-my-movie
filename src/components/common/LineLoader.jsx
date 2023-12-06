import React from "react";
function LineLoader({ height = 3, width = "full" }) {
  return (
    <div
      className={`h-${height} bg-gray-200 rounded-full dark:bg-gray-700 w-${width} mb-4`}
    ></div>
  );
}

export default LineLoader;
