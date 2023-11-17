import { useState, useEffect } from "react";
import { API } from "~/constants/api";
import type { DbInfluencer } from "~/types/ApiOps";

export interface CampaignsInfluencerProps {
  userId: string;
  token: string;
  user: DbInfluencer;
}
export function CampaignsInfluencer({
  userId,
  token,
  user,
}: CampaignsInfluencerProps) {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const getCampaigns = async () => {
      const response = await fetch(API.FETCH_NOTIFICATIONS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
      });
      const data = await response.json();
      setCampaigns(data.data);
    };
    getCampaigns();
  }, []);

  console.log(campaigns);

  return (
    <div className="w-full flex flex-col justify-center items-center my-10">
      <div className="w-full max-w-2xl px-5">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="font-black text-xl">Invites</h1>
          <button className="btn btn-primary">Create Invite</button>
        </div>
      </div>
    </div>
  );
}
