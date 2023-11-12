import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@remix-run/react";
import { ApiOps } from "~/types/ApiOps";

export default function Navbar() {
  const handleLogOut = async () => {
    const formData = new FormData();
    formData.append("operation", ApiOps.LOGOUT);
    const response = await fetch("/api", {
      method: "POST",
      body: formData,
    });
    if (response.status === 200) {
      window.location.href = "/log-in";
    }
  };
  return (
    <div className="navbar px-5 sticky top-0 z-[1] bg-white shadow-md backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="navbar-start">
        <Link to="/dashboard">
          <h1 className="black font-mono font-black">influencity</h1>
        </Link>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <FontAwesomeIcon icon={faBell} />
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <div className="dropdown dropdown-end">
          <button className="btn btn-ghost btn-circle">
            <FontAwesomeIcon icon={faBars} />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/dashboard">Home</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a onClick={handleLogOut}>Log out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
