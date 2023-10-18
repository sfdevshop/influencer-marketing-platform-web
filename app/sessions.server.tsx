import { createCookie, createCookieSessionStorage } from "@remix-run/node";

const sessionCookie = createCookie("user-session", {
  secrets: ["sfdevshop"],
  maxAge: 3600,
  sameSite: true,
});
export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: sessionCookie,
    // table: "sessions",
    // // The name of the key used to store the session ID (should match app.arc)
    // idx: "_idx",
    // // The name of the key used to store the expiration time (should match app.arc)
    // ttl: "_ttl",
  });
