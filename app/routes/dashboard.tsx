import type { LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserSession } from "~/utils/userSession";
import type { DbInfluencer } from "~/types/ApiOps";
import { getUser } from "~/utils/db";
import UserHomeCard from "~/components/UserHomeCard";
import Navbar from "~/components/Navbar";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  const data = await getUser(token);
  // TODO: change to DbBrand
  const user = data.data as DbInfluencer;

  return json({ user, userId, token });
};

export default function BrandHome() {
  const data = useLoaderData<any>();

  return (
    <div>
      <Navbar />
      <UserHomeCard user={data.user} />
    </div>
  );
}
