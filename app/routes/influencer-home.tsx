import type { LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserSession } from "~/utils/userSession";
import { getUser } from "~/utils/db";
import { UserTypes, type DbInfluencer } from "~/types/ApiOps";

import UserHomeCard from "~/components/UserHomeCard";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  const data = await getUser(token);
  const user = data.data as DbInfluencer;

  if (user.usertype === UserTypes.BRAND) {
    return redirect("/brand-home");
  }

  return json({ user, userId, token });
};

function InfluencerHome() {
  const data = useLoaderData<any>();

  return <UserHomeCard user={data.user} />;
}

export default InfluencerHome;
