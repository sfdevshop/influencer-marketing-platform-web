import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  createCookieSessionStorage,
} from "@remix-run/node";

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "user-session",
      secrets: ["sfdevshop"],
    },
  });

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
