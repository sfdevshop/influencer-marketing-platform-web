export const API_URL =
  // TODO: Change this to your own server URL
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

export const API = {
  ADD_CATEGORIES_URL: API_URL + "/user/addCategories",
  LOGIN_URL: API_URL + "/user/login",
  SIGNUP_URL: API_URL + "/user/signup",
  GET_INFLUENCERS_URL: API_URL + "/brand/getInfluencers?",
  CHAT: API_URL + "/chat/getchatbox?otherPerson=",
  GET_USER: API_URL + "/user/getUser",
  GET_ALL_INFLUENCER_INFO: API_URL + "/user/getAllInfluencerInfo",
  UPDATE_USER: API_URL + "/user/updateUser",
  UPDATE_INFLUENCER: API_URL + "/user/updateInfluencer",
  UPLOAD_PFP: API_URL + "/user/uploadPfp",
  GET_INFLUENCER_INFO: API_URL + "/brand/getInfluencerInfo/",
  GET_INFLUENCERS_FOR_CAMPAIGN: API_URL + "/brand/getInfluencers/?",
  CREATE_CAMPAIGN: API_URL + "/brand/createCampaign",
  DELETE_CAMPAIGN: API_URL + "/brand/deleteCampaign/",
  FETCH_NOTIFICATIONS: API_URL + "/notification/getAllForUser",
  MARK_NOTIFICATIONS_AS_READ: API_URL + "/notification/markRead/",
  GET_CAMPAIGN: API_URL + "/brand/getCampaignInfo/",
  ACCEPT_CAMPAIGN: API_URL + "/notification/acceptCampaign/",
  DECLINE_CAMPAIGN: API_URL + "/notification/rejectCampaign/",
  GET_CAMPAIGNS_FOR_INFLUENCER: API_URL + "/user/getAllCampaigns",
  SUBMIT_WORKFLOW_PHOTOS: API_URL + "/approval/upload",
  GET_APPROVALS: API_URL + "/approval",
  SWITCH_APPROVAL: API_URL + "/approval/switch",
  DELETE_APPROVAL: API_URL + "/approval/delete",
};
