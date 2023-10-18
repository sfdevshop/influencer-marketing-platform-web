import { ActionFunctionArgs } from "@remix-run/node";
import { ApiOps } from "~/types/ApiOps";
import {
  destroySession,
  getSession,
  getUserSession,
} from "~/utils/userSession";

export const handleApiOperatons = async (
  args: ActionFunctionArgs,
  operation: ApiOps,
  payload: any
) => {
  switch (operation) {
    case ApiOps.LOGOUT:
      return await logout(args, payload);
    default:
      return new Response("Invalid operation", { status: 400 });
  }
};

const logout = async (args: ActionFunctionArgs, payload: any) => {
  const session = await getSession(args.request.headers.get("Cookie"));
  destroySession(session);
};
