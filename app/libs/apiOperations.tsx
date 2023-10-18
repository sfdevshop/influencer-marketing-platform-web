import { type ActionFunctionArgs } from "@remix-run/node";
import type { ApiOps } from "~/types/ApiOps";

export const handleApiOperatons = async (
  args: ActionFunctionArgs,
  operation: ApiOps,
  payload: any
) => {
  switch (operation) {
    default:
      return {
        redirect: false,
        redirectTo: null,
        response: new Response("Invalid operation", { status: 400 }),
      };
  }
};
