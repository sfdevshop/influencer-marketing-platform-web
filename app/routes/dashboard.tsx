import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import the js-cookie library

function DashboardPage() {
  // State to store the token
  const [token, setToken] = useState("");

  // Use useEffect to read the cookie when the component loads
  useEffect(() => {
    // Read the token cookie using the same name you used to set it
    const tokenFromCookie = Cookies.get("yourTokenCookieName");

    console.log("tokenFromCookie", tokenFromCookie);

    const temp = tokenFromCookie;
    const cookieVal = temp ? temp.split("=")[1] : null;

    // assign the value to the state, which can be accessed as token
    cookieVal && setToken(cookieVal);
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {token ? (
        <div>
          <p>Token from the cookie: {token}</p>
          {/* Your dashboard content for authenticated users */}
        </div>
      ) : (
        <p>Please log in to access the dashboard.</p>
      )}
    </div>
  );
}

export default DashboardPage;
