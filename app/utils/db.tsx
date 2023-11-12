import { API } from "~/constants/api";
import type { DbInfluencer } from "~/types/ApiOps";

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
