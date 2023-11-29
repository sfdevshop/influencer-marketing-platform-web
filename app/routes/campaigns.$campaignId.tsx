import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CampaignHandler from "~/components/CampaignHandler";
import { getCampaign } from "~/utils/db";
import { getUserSession } from "~/utils/userSession";

export const loader: LoaderFunction = async (args) => {
  const notif_id = args.params.campaignId;
  const { userId, token } = await getUserSession(args);
  // if the user is not logged in, redirect to the login page
  if (!userId || !token) {
    return redirect("/log-in");
  }

  return {
    notif_id,
    userId,
    token,
  };
};

export default function CampaignInfo() {
  const data = useLoaderData<any>();

  return (
    <div>
      <CampaignHandler notif_id={data.notif_id} token={data.token} />
    </div>
  );
}
