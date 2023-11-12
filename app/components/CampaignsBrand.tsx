import type { Campaign, DbBrand } from "~/types/ApiOps";
import { CreateCampaignModal } from "./CreateCampaignModal";
import { createContext, useMemo, useState } from "react";
import { CampaignCard } from "./CampaignCard";

export interface CampaignsBrandProps {
  userId: string;
  token: string;
  user: DbBrand;
}

export const BrandCampaignsContext = createContext<{
  campaigns: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
  token: string;
  brand: DbBrand;
}>({
  campaigns: [],
  setCampaigns: () => {},
  token: "",
  brand: {} as DbBrand,
});

export function CampaignsBrand({ userId, token, user }: CampaignsBrandProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(
    user.brandProfile?.campaigns ?? []
  );

  const value = useMemo(
    () => ({ campaigns, setCampaigns, token, brand: user }),
    [campaigns, setCampaigns, token, user]
  );

  return (
    <BrandCampaignsContext.Provider value={value}>
      <div className="w-full flex flex-col justify-center items-center my-10">
        <div className="w-full max-w-2xl px-5">
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
          </div>
          {campaigns.map((campaign, id) => (
            <div key={id}>
              <CampaignCard campaign={campaign} />
            </div>
          ))}
        </div>
      </div>
    </BrandCampaignsContext.Provider>
  );
}
