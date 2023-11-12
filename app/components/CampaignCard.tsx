import { faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { API_URL } from "~/constants/api";
import type { Campaign } from "~/types/ApiOps";
import { BrandCampaignsContext } from "./CampaignsBrand";
import { deleteCampaign } from "~/utils/db";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
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
        <div className="card-actions justify-end">
          <button
            className="btn btn-ghost hover:text-error hover:bg-transparent border-none"
            onClick={handleDeleteCampaign}
            disabled={deleting}
          >
            <FontAwesomeIcon icon={faTrash} size="xl" />
          </button>
          <button
            className="btn btn-circle hover:btn-secondary"
            disabled={deleting}
          >
            <FontAwesomeIcon icon={faInfo} size="xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
