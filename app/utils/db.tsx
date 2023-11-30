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

export const getApprovals = async (token: string, campaignId: number) => {
  const response = await fetch(API.GET_APPROVALS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token),
    },
    body: JSON.stringify({ campaignId }),
  });
  const data = await response.json();
  return data;
};

export const submitWorkflowPhotos = async (
  token: string,
  influencerId: number,
  campaignId: number,
  files: FileList | null
) => {
  if (!files) return;

  for (let i = 0; i < files.length; i++) {
    const formData = new FormData();
    formData.append("file", files[i]);
    formData.append("influencerId", String(influencerId));
    formData.append("campaignId", String(campaignId));

    await fetch(API.SUBMIT_WORKFLOW_PHOTOS, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + String(token),
      },
      body: formData,
    });
  }
};

export const deleteApproval = async (token: string, approvalId: number) => {
  await fetch(API.DELETE_APPROVAL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",

      Authorization: "Bearer " + String(token),
    },
    body: JSON.stringify({ approvalId }),
  });
};

export const switchApproval = async (
  token: string,
  approvalId: number,
  approved: string
) => {
  await fetch(API.SWITCH_APPROVAL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token),
    },
    body: JSON.stringify({ approvalId, approved }),
  });
};

export const getInfluencersForCampaign = async (
  token: string,
  cateogries: string[],
  budgetPerInfluencer: number
) => {
  const response = await fetch(
    API.GET_INFLUENCERS_FOR_CAMPAIGN +
      `categories=${cateogries.join(
        "&categories="
      )}&budgetPerInfluencer=${budgetPerInfluencer}`,
    {
      method: "GET",
      headers: {
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

export const markNotifAsRead = async (token: string, notifId: number) => {
  await fetch(API.MARK_NOTIFICATIONS_AS_READ + `${notifId}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + String(token),
    },
  });
};

export const getCampaign = async (token: string, campaignId: number) => {
  const data = await fetch(API.GET_CAMPAIGN + campaignId, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + String(token),
    },
  });
  const json = await data.json();
  console.log(json);

  return json.data as Campaign;
};
