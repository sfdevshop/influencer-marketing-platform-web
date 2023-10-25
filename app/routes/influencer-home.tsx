import React, { useState } from "react";
import InfluencerCard from "~/components/InfluencerCard";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { API } from "~/constants/api";
import { getUserSession } from "~/utils/userSession";
import type { Influencer } from "~/types/ApiOps";
import { destroySession, getSession } from "~/sessions.server";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  return json({ userId, token });
};
//
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

function InfluencerHome() {
  const data = useLoaderData<any>();

  return (
    <div className="container h-screen flex justify-center items-center">
      <p className="text-2xl">Your User ID: {data.userId}</p>
      <br />
      <form method="post" action="/api">
        <button className="btn btn-primary" name="operation" value="LOGOUT">
          Log Out
        </button>
        <br />
        <br />
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
      </div>
    </div>
  );
}

export default InfluencerHome;
