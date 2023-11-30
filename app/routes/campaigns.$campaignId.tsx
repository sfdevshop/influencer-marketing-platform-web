import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CampaignHandler from "~/components/CampaignHandler";
import { DbInfluencer, DbBrand, UserTypes } from "~/types/ApiOps";
import { getCampaign, getUser } from "~/utils/db";
import { getUserSession } from "~/utils/userSession";

export const loader: LoaderFunction = async (args) => {
  const notif_id = args.params.campaignId;
  const { userId, token } = await getUserSession(args);
  // if the user is not logged in, redirect to the login page
  if (!userId || !token) {
    return redirect("/log-in");
  }
  const data = await getUser(token);
  const user = data.data as DbInfluencer | DbBrand;

  return {
    notif_id,
    userId,
    token,
    user,
  };
};

export default function CampaignInfo() {
  const data = useLoaderData<any>();

  return (
    <div>
      {data.user.usertype === UserTypes.INFLUENCER && (
        <CampaignHandler notif_id={data.notif_id} token={data.token} />
      )}
    </div>
  );
}
