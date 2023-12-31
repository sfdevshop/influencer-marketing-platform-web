import { useState, useEffect, createContext, useMemo } from "react";
import { API } from "~/constants/api";
import type { Campaign, DbInfluencer } from "~/types/ApiOps";
import { CampaignCard } from "./CampaignCard";

export interface CampaignsInfluencerProps {
  userId: string;
  token: string;
  user: DbInfluencer;
}

export const InfluencerCampaignsContext = createContext<{
  campaigns: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
  token: string;
  influencer: DbInfluencer;
}>({
  campaigns: [],
  setCampaigns: () => {},
  token: "",
  influencer: {} as DbInfluencer,
});

export function CampaignsInfluencer({
  userId,
  token,
  user,
}: CampaignsInfluencerProps) {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const getCampaigns = async () => {
      const response = await fetch(API.GET_CAMPAIGNS_FOR_INFLUENCER, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
      });
      console.log(API.GET_CAMPAIGNS_FOR_INFLUENCER);
      const data = await response.json();
      console.log(data.data);
      setCampaigns(data.data);
    };
    getCampaigns();
  }, []);

  console.log(campaigns);

  const value = useMemo(
    () => ({ campaigns, setCampaigns, token, influencer: user }),
    [campaigns, setCampaigns, token, user]
  );

  return (
    <InfluencerCampaignsContext.Provider value={value}>
      <div className="w-full flex flex-col justify-center items-center my-10">
        <div className="w-full max-w-2xl px-5">
          <div className="w-full flex flex-row justify-between items-center">
            <h1 className="font-black text-xl">Active Campaigns</h1>
          </div>
          {(campaigns ?? []).map((campaign, id) => (
            <div key={id}>
              <CampaignCard campaign={campaign} user={user} />
            </div>
          ))}
        </div>
      </div>
    </InfluencerCampaignsContext.Provider>
  );
}
