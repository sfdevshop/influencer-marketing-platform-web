import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import the js-cookie library
import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";


function DashboardPage() {
  // State to store the token
  const [token, setToken] = useState("");

  // Use useEffect to read the cookie when the component loads
  useEffect(() => {
    // Read the token cookie using the same name you used to set it
    const tokenFromCookie = Cookies.get("token");

    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }

  }, []);
  const navigate = useNavigate();

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
      <button onClick={() => { goToChatBox() }} style={{ border: "1px solid black" }}>Chat with user 60</button>
    </div>
  );

  function goToChatBox() {
    console.log("tokenFromCookie - ", token);

    let otherPerson = "60"; // this is where we set the id of the other person we want to chat with.


    navigate(`/chatbox?otherPerson=${otherPerson}`);


  }
}



export default DashboardPage;
