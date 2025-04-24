import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      <div className="navbar bg-white text-black shadow-sm rounded-xl px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="font-medium  bg-white text-black lg:hidden mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-black font-medium rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a onClick={() => navigate("/")}>Home</a>
              </li>
              {/* <li>
                <a onClick={() => navigate("/profile")}>Profile</a>
              </li> */}
              <li>
                <a onClick={() => navigate("/about")}>About</a>
              </li>
            </ul>
          </div>
          <a className="text-xl text-black font-bold">Lubooth</a>
        </div>
        <div className="navbar-center hidden lg:flex font-medium">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a onClick={() => navigate("/")}>Home</a>
            </li>
            {/* <li>
              <a onClick={() => navigate("/profile")}>Profile</a>
            </li> */}
            <li>
              <a onClick={() => navigate("/about")}>About</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {!isAuthenticated ? (
            <button
              className="px-4 py-2 rounded-md bg-[#9679F0] text-white"
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded-md bg-[#9679F0] text-white"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
