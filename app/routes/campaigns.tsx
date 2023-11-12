import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "react-router";
import { CampaignsBrand } from "~/components/CampaignsBrand";
import { CampaignsInfluencer } from "~/components/CampaignsInfluencer";
import { UserTypes, type DbBrand, type DbInfluencer } from "~/types/ApiOps";
import { getUser } from "~/utils/db";
import { getUserSession } from "~/utils/userSession";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  const data = await getUser(token);
  const user = data.data as DbInfluencer | DbBrand;

  return json({ userId, token, user });
};

export default function Campaigns() {
  const data = useLoaderData();
  const { userId, token, user } = data as any;

  return (
    <>
      {user.usertype === UserTypes.INFLUENCER ? (
        <CampaignsInfluencer
          userId={userId}
          token={token}
          user={user as DbInfluencer}
        />
      ) : (
        <CampaignsBrand userId={userId} token={token} user={user as DbBrand} />
      )}
    </>
  );
}
