import { API } from "~/constants/api";

export const getUser = async (userId: number, token: string) => {
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
