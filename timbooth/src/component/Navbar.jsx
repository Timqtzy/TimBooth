import React from "react";
import "../App.css";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-black shadow-sm rounded-xl px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Home</a>
              </li>

              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
          <a className="text-xl text-white font-bold">Lubooth</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn bg-white text-black">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
