import { useFetcher } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { useState } from "react";

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
  const response = await fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // the backend responds data in json format
  const data = await response.json();

  // if status code is not 200, return the errors
  if (data.status !== 200) {
    return json({ errors: data.message });
  } else {
    //from set-cookie header, get the token value
    if (response.headers.get("set-cookie")) {
      const setCookieHeader = response.headers.get("set-cookie");
      const token = setCookieHeader
        ? setCookieHeader.split("=")[1].split(";")[0]
        : null;

      // save the token in the cookie on the client browser
      return redirect("/dashboard", {
        headers: {
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Lax`,
        },
      });
    }
  }

  // return redirect("/dashboard");
};

export default function SignUpPage() {
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
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}
