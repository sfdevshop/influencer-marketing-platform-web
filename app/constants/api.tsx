const API_URL =
  // TODO: Change this to your own server URL
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/";

export const API = {
  ADD_CATEGORIES_URL: API_URL + "user/addCategories",
  LOGIN_URL: API_URL + "user/login",
  SIGNUP_URL: API_URL + "user/signup",
  GET_INFLUENCERS_URL: API_URL + "brand/getInfluencers?",
  CHAT: API_URL + "chat/getchatbox?",
};
