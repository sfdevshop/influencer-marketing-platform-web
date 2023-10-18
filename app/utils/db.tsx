import { ActionFunctionArgs } from "@remix-run/node";
import { ApiOps } from "~/types/ApiOps";

export const getUser = async (userId: number, token: string) => {
  //   TODO
};

export const logout = async () => {
  try {
    const formData = new FormData();
    formData.append("operation", ApiOps.LOGOUT);
    formData.append("payload", "");

    await fetch("/api", {
      method: "POST",
      body: formData,
    });
  } catch (e) {
    console.error(e);
  }
};
