import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { useLoaderData } from "react-router";
import CampaignHandler from "~/components/CampaignHandler";
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

  const notif_id = args.params.campaignId;

  return json({ userId, token, user, notif_id });
};

export default function Campaigns() {
  const data = useLoaderData();
  const { userId, token, user, notif_id } = data as any;

  return (
    <>
      <Outlet />
      {user.usertype === UserTypes.INFLUENCER ? (
        <CampaignsInfluencer
          userId={userId}
          token={token}
          user={user as DbInfluencer}
        />
      ) : (
        // redirect to campaigns.$campaignId route
        // <CampaignHandler notif_id={notif_id} token={token} />
        // <CampaignsInfluencer
        //   userId={userId}
        //   token={token}
        //   user={user as DbInfluencer}
        // />
        <CampaignsBrand userId={userId} token={token} user={user as DbBrand} />
      )}
    </>
  );
}
