import { FaBars, FaBell } from "react-icons/fa6";
import { Link } from "@remix-run/react";
import { ApiOps, DbBrand, DbInfluencer, UserTypes } from "~/types/ApiOps";
import { API } from "~/constants/api";
import { useEffect, useState } from "react";
import { markNotifAsRead } from "~/utils/db";

export default function Navbar({
  token,
  user,
}: {
  token: string | undefined;
  user: DbInfluencer | DbBrand | undefined;
}) {
  const [notifications, setNotifications] = useState<any[]>([]);

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

  // send a get request to the server to fetch notifications, also send the token
  const fetchNotifs = async () => {
    console.log("fetching notifs");
    console.log(token);
    const response = await fetch(API.FETCH_NOTIFICATIONS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token),
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      setNotifications(() => [...data.data]);

      // console.log(notifications);
    }
  };
  useEffect(() => {
    if (user?.usertype === UserTypes.BRAND) return;
    fetchNotifs();

    const timer = setInterval(() => {
      fetchNotifs();
    }, 5000);

    return () => {
      setNotifications([]);
      clearInterval(timer);
    };
  }, []);

  const markAsRead = async (notificationId: number) => {
    const newNotifications = notifications.map((notification) => {
      if (notification.id === notificationId) {
        notification.isRead = true;
      }
      return notification;
    });
    console.log("new", newNotifications);

    setNotifications(() => [...newNotifications]);
    await markNotifAsRead(token!, notificationId);
  };

  console.log("hre", notifications);

  return (
    <div className="navbar px-5 sticky top-0 z-[1] bg-white shadow-md backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="navbar-start">
        <Link to="/dashboard">
          <h1 className="black font-mono font-black">influencity</h1>
        </Link>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        {token && user && user.usertype === UserTypes.INFLUENCER && (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <FaBell />
                {notifications.length > 0 &&
                  notifications.filter(
                    (notification) => !notification.notification.isRead
                  ).length > 0 && (
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  )}
                {notifications.length > 0 && (
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[12] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {notifications.map((notification, id) => (
                      // <li </li>
                      <li
                        onClick={async () =>
                          await markAsRead(notification.notification.id)
                        }
                        key={id}
                      >
                        <div
                          className={
                            notification.notification.isRead
                              ? "bg-gray-300"
                              : ""
                          }
                        >
                          <a
                            key={id}
                            href={`/campaigns/${notification.notification.id}`}
                          >
                            {notification.brandName} has sent you a campaign
                            invite: {/* new line */}
                            <br />
                            {notification.notification.message}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </button>
          </div>
        )}
        {token && user && (
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle">
              <FaBars />
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
        )}
      </div>
    </div>
  );
}
