import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getUserSession } from "~/utils/userSession";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { destroySession, getSession } from "~/sessions.server";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  return json({ userId, token });
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/log-in", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

function DashboardPage() {
  const data = useLoaderData<any>();
  const navigate = useNavigate();
  function goToChatBox() {
    let otherPerson = "60"; // this is where we set the id of the other person we want to chat with.

    navigate(`/chatbox?otherPerson=${otherPerson}`);
  }

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
        <button
          className="btn btn-primary"
          name="operation"
          value="DISCOVER-INFLUENCERS"
        >
          Discover Influencers
        </button>
      </form>
      <div>
        <h1>Welcome to the Dashboard</h1>
        {data && data.token ? (
          <div>
            <p>Token from the cookie: {data.token}</p>
            {/* Your dashboard content for authenticated users */}
          </div>
        ) : (
          <p>Please log in to access the dashboard.</p>
        )}
        <button
          onClick={() => {
            goToChatBox();
          }}
          className="btn btn-primary"
        >
          Chat with user 60
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
