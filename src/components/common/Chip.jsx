import React from "react";

function Chip({
  isSelected = false,
  value = "",
  // onClick = () => {},
  children = null,
}) {
  const bgColor = isSelected ? "bg-purple-600" : "bg-slate-700";
  return (
    <div
      class={
        "relative grid select-none items-center whitespace-nowrap rounded-lg py-1.5 px-3 text-xs font-bold uppercase" +
        ` ${bgColor}`
      }
      // onClick={() => onClick(value)}
      id={value}
    >
      <span id={value}>{children}</span>
    </div>
  );
}

export default Chip;
