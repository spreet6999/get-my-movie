import React from "react";

function Chip({ isSelected = false, children = null }) {
  const bgColor = isSelected ? "bg-purple-600" : "bg-gray-900";
  return (
    <div
      class={
        "relative grid select-none items-center whitespace-nowrap rounded-lg py-1.5 px-3 text-xs font-bold uppercase" +
        ` ${bgColor}`
      }
    >
      <span>{children}</span>
    </div>
  );
}

export default Chip;
