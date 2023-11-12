import type { Campaign, DbBrand } from "~/types/ApiOps";
import { CreateCampaignModal } from "./CreateCampaignModal";
import { createContext, useMemo, useState } from "react";

export interface CampaignsBrandProps {
  userId: string;
  token: string;
  user: DbBrand;
}

export const BrandCampaignsContext = createContext<{
  campaigns: Campaign[];
  setCampaigns: (campaigns: any) => void;
  token: string;
}>({
  campaigns: [],
  setCampaigns: (campaigns: any) => {},
  token: "",
});
export function CampaignsBrand({ userId, token, user }: CampaignsBrandProps) {
  const [campaigns, setCampaigns] = useState(
    user.brandProfile?.campaigns ?? []
  );

  const value = useMemo(
    () => ({ campaigns, setCampaigns, token }),
    [campaigns, setCampaigns, token]
  );
  return (
    <BrandCampaignsContext.Provider value={value}>
      <div className="w-full flex flex-col justify-center items-center my-10">
        <div className="w-full max-w-2xl">
          <div className="w-full flex flex-row justify-between items-center">
            <h1 className="font-black text-xl">Campaigns</h1>
            <button
              onClick={() =>
                //@ts-ignore
                document.getElementById("create-new-campaign").showModal()
              }
              className="btn btn-circle btn-primary text-2xl"
            >
              +
            </button>
            <CreateCampaignModal />
            {(user.brandProfile?.campaigns ?? []).map((campaign, id) => (
              <div key={id}>
                <h2>{campaign.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrandCampaignsContext.Provider>
  );
}
