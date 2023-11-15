import {
  LoaderFunction,
  json,
  redirect,
  type LinksFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import Navbar from "./components/Navbar";
import { DbInfluencer } from "./types/ApiOps";
import { getUser } from "./utils/db";
import { getUserSession } from "./utils/userSession";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return json({ token: undefined, user: undefined });
  }
  const data = await getUser(token);
  const user = data.data as DbInfluencer;

  return json({ token, user });
};

export default function App() {
  const data = useLoaderData<any>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/_static/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar token={data.token} user={data.user} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
