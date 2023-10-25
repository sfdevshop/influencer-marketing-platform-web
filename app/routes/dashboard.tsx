import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getUserSession } from "~/utils/userSession";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { destroySession, getSession } from "~/sessions.server";
import { useEffect, useState } from "react";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  return json({ userId, token });
};

export const action: ActionFunction = async ({ request }) => {
  const data = useLoaderData<any>();
  console.log(data.token);

  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/log-in", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

function DashboardPage() {
  const data = useLoaderData<any>();

  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();
  function goToChatBox() {
    let otherPerson = "16"; // this is where we set the id of the other person we want to chat with.

    navigate(`/chatbox?otherPerson=${otherPerson}`);
  }

  useEffect(() => {
    // Make an HTTP GET request to fetch the user type
    fetch("http://localhost:3000/user/getUser", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + String(data.token),
      },
    })
      .then((response) => response.json())
      .then((userData) => {
        // Assuming you have a user type property in the response data
        setUserType(userData.data.usertype);
        console.log(userData.data.usertype);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, [data.token]);

  return (
    <div className="container h-screen flex justify-center items-center">
      {/* <p>Welcome to the Dashboard </p> <br />
      <br />
      <br /> */}
      <p className="text-2xl">Your User ID: {data.userId}</p>
      <br />
      <form method="post" action="/api">
        <button className="btn btn-primary" name="operation" value="LOGOUT">
          Log Out
        </button>
        <br />
        <br />
        {userType === "BRAND" && (
          <button
            className="btn btn-primary"
            name="operation"
            value="DISCOVER-INFLUENCERS"
          >
            Discover Influencers
          </button>
        )}
      </form>
      <div>
        <br />
        <h1>Welcome to the Dashboard</h1>
        {data && data.token ? (
          <div>
            {/* <p>Token from the cookie: {data.token}</p> */}
            {/* Your dashboard content for authenticated users */}
          </div>
        ) : (
          <p>Please log in to access the dashboard.</p>
        )}
        {userType === "BRAND" && (
          <button
            onClick={() => {
              goToChatBox();
            }}
            className="btn btn-primary"
          >
            Chat with user 16
          </button>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
