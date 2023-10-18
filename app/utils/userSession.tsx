import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "~/sessions.server";

export const getUserSession = async (
  args: LoaderFunctionArgs | ActionFunctionArgs
) => {
  const session = await getSession(args.request.headers.get("Cookie"));
  let userId;
  let token;

  if (session.has("userId")) {
    userId = session.get("userId");
  }

  if (session.has("token")) {
    token = session.get("token");
  }

  return { userId, token, session };
};
