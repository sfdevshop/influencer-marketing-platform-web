import { FaInfo, FaTrash } from "react-icons/fa6";
import { useContext, useState } from "react";
import { API_URL } from "~/constants/api";
import {
  UserTypes,
  type Campaign,
  type DbBrand,
  type DbInfluencer,
} from "~/types/ApiOps";
import { BrandCampaignsContext } from "./CampaignsBrand";
import { deleteCampaign } from "~/utils/db";
// user?.usertype === UserTypes.BRAND ? (

export function CampaignCard({
  campaign,
  user,
}: {
  campaign: Campaign;
  user: DbBrand | DbInfluencer | undefined;
}) {
  const [deleting, setDeleting] = useState<boolean>(false);
  const context = useContext(BrandCampaignsContext);

  const handleDeleteCampaign = async () => {
    setDeleting(true);

    await deleteCampaign(context.token, campaign.id);
    setDeleting(false);
    context.setCampaigns(context.campaigns.filter((c) => c.id !== campaign.id));
  };
  return (
    <div className="card w-full bg-white shadow-xl my-5">
      <figure>
        <img
          src={API_URL + campaign.image}
          alt="pfp"
          className="rounded-xl object-cover h-48 w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{campaign.name}</h2>
        <p>{campaign.work}</p>
        {user?.usertype === UserTypes.BRAND ? (
          <div className="card-actions justify-end">
            <button
              className="btn btn-ghost hover:text-error hover:bg-transparent border-none"
              onClick={handleDeleteCampaign}
              disabled={deleting}
            >
              <FaTrash size={15} />
            </button>
            <button
              className="btn btn-circle hover:btn-secondary"
              disabled={deleting}
            >
              <FaInfo size={15} />
            </button>
          </div>
        ) : (
          <div className="card-actions justify-end">
            <button
              className="btn btn-circle hover:btn-secondary"
              disabled={deleting}
            >
              <FaInfo size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
