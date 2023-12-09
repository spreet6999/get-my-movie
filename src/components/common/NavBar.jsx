import React from "react";

function NavBar() {
  return (
    <React.Fragment>
      <nav className="flex w-full items-center justify-between flex-wrap p-6 fixed top-0 bg-inherit z-10">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="logo">M</span>
          <span className="font-semibold text-2xl tracking-tight">
            OVIEFLIX
          </span>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default NavBar;
