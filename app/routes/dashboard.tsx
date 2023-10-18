import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getUserSession } from "~/utils/userSession";
import { useLoaderData } from "@remix-run/react";
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

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Your user id is {data.userId}</p>
      <form method="post" action="/api">
        <button className="btn btn-primary" name="operation" value="LOGOUT">
          Log Out
        </button>
      </form>
    </div>
  );
}

export default DashboardPage;
