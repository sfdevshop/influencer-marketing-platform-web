import { API } from "~/constants/api";
import type { Campaign, DbInfluencer } from "~/types/ApiOps";

export const getUser = async (token: string) => {
  const response = await fetch(API.GET_USER, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token),
    },
  });
  const data = await response.json();
  return data;
};

export const getInfluencersForCampaign = async (
  token: string,
  cateogries: string[],
  budgetPerInfluencer: number
) => {
  const response = await fetch(
    API.GET_INFLUENCERS_FOR_CAMPAIGN +
      `categories=${cateogries.join(
        ","
      )}&budgetPerInfluencer=${budgetPerInfluencer}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token),
      },
    }
  );
  const data = await response.json();
  return data.data as DbInfluencer[];
};

export const createCampaign = async (
  token: string,
  data: any,
  selectedInfluencers: number[],
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", data.name);
  formData.append("work", data.work);
  formData.append("postDonts", data.postDonts);
  formData.append("linkBackURL", data.linkBackURL);
  formData.append("startDate", new Date(data.startDate).toISOString());
  formData.append("endDate", new Date(data.endDate).toISOString());
  formData.append("budgetPerInfluencer", data.budgetPerInfluencer);
  formData.append("numInfluencers", data.numInfluencers);
  formData.append("minReach", data.minReach);
  formData.append("selectedInfluencers", JSON.stringify(selectedInfluencers));

  const response = await fetch(API.CREATE_CAMPAIGN, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + String(token),
    },
    body: formData,
  });

  const res = await response.json();
  return res.data as Campaign;
};

export const deleteCampaign = async (token: string, campaignId: number) => {
  await fetch(API.DELETE_CAMPAIGN + `${campaignId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + String(token),
    },
  });
};
