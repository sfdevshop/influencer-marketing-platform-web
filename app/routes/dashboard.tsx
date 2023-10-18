import { LoaderFunction, json, redirect } from "@remix-run/node";
import { getUserSession } from "~/utils/userSession";
import { useLoaderData } from "@remix-run/react";
import { logout } from "~/utils/db";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  return json({ userId, token });
};

function DashboardPage() {
  const data = useLoaderData<any>();

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Your user id is {data.userId}</p>

      <button className="btn btn-primary" onClick={logout}>
        Log Out
      </button>
    </div>
  );
}

export default DashboardPage;
