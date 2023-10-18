import { useActionData, useFetcher } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { API } from "~/constants/api";
import { commitSession, getSession } from "~/sessions.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const errors: any = {};

  if (!email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (password.length < 12) {
    errors.password = "Password should be at least 12 characters";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  // Send the data to the server
  const response = await fetch(API.LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // the backend responds data in json format
  const data = await response.json();
  const session = await getSession(response.headers.get("Cookie"));

  // if status code is not 200, return the errors
  if (data.status !== 200) {
    session.flash("error", "Invalid username/password");

    return json(
      { errors: data.message },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );
  } else {
    //from set-cookie header, get the token value
    if (response.headers.get("set-cookie")) {
      const setCookieHeader = response.headers.get("set-cookie");
      const token = setCookieHeader
        ? setCookieHeader.split("=")[1].split(";")[0]
        : null;

      const userId = data.data.id;

      session.set("userId", userId);
      session.set("token", token);

      // save the token in the cookie on the client browser
      return redirect("/dashboard", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  }

  // return redirect("/dashboard");
};

export default function SignInPage() {
  const data = useActionData<any>();
  const fetcher = useFetcher<any>();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title font-bold text-2xl mb-4">Login</h2>
          <fetcher.Form method="post" action="/log-in">
            <input
              type="email"
              name="email"
              className="input input-bordered w-full mt-4"
              placeholder="Email"
            />
            {fetcher.data?.errors?.email ? (
              <em className="text-error text-sm">
                {fetcher.data.errors.email}
              </em>
            ) : null}

            <input
              type="password"
              name="password"
              className="input input-bordered w-full mt-4"
              placeholder="Password"
            />
            {fetcher.data?.errors?.password ? (
              <em className="text-error text-sm">
                {fetcher.data.errors.password}
              </em>
            ) : null}

            <div className="card-actions justify-between mt-6 items-center">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please Wait" : "Submit"}
              </button>
            </div>
            {data && data.errors ? (
              <div className="alert alert-error mt-4">{data.errors}</div>
            ) : null}
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}
