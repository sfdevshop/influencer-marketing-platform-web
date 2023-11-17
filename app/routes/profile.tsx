import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ProfileForm } from "~/components/ProfileForm";
import { API } from "~/constants/api";
import type { DbInfluencer } from "~/types/ApiOps";

import { getUser } from "~/utils/db";
import { getUserSession } from "~/utils/userSession";
export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }
  const data = await getUser(token);
  const user = data.data as DbInfluencer;

  return json({ user, token });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const user = JSON.parse(formData.get("user") as string) as DbInfluencer;
  const token = formData.get("token") as string;

  const res = await fetch(API.UPDATE_USER, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fname: user.fname,
      lname: user.lname,
    }),
  });

  if (res.ok) {
    const influencer_res = await fetch(API.UPDATE_INFLUENCER, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user.influencerProfile),
    });

    if (influencer_res.ok) {
      return json({ status: 200, message: "influencer updated" });
    } else {
      return json({ status: 500, message: "influencer not updated" });
    }
  } else {
    return json({ status: 500, message: "user not updated" });
  }
};

export default function ProfilePage() {
  const data = useLoaderData<{
    user: DbInfluencer;
    token: string;
  }>();
  const fetcher = useFetcher<any>();

  const [user, setUser] = useState(data.user);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    const setNestedState: any = (
      prevData: any,
      namePath: string[],
      value: string
    ) => {
      const [first, ...rest] = namePath;
      if (rest.length === 0) {
        // If it's the last key in the path, set the value directly
        return {
          ...prevData,
          [first]: value,
        };
      } else {
        // If not, recurse further into the object
        return {
          ...prevData,
          [first]: setNestedState(prevData[first], rest, value),
        };
      }
    };

    setUser((prevData) => setNestedState(prevData, name.split("."), value));
  };

  useEffect(() => {
    if (fetcher.data?.status === 200) {
      setSuccess("Profile updated successfully");
    } else if (fetcher.data?.status === 500) {
      setError("Something went wrong");
    }
  }, [fetcher.data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [error, success]);

  const handleCategoryChange = (selectedCategories: any) => {
    setUser((prevData) => ({
      ...prevData,
      influencerProfile: {
        ...prevData.influencerProfile,
        categories: selectedCategories,
      },
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user", JSON.stringify(user));
    formData.append("token", data.token);
    fetcher.submit(formData, { method: "PUT" });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="toast toast-top toast-center z-[100000]">
        {success && <div className="alert alert-success">{success}</div>}

        {error && <div className="alert alert-error">{error}</div>}
      </div>

      <ProfileForm
        handleSubmit={handleSubmit}
        influencer={user}
        handleInputChange={handleInputChange}
        handleCategoryChange={handleCategoryChange}
        token={data.token}
      />
    </div>
  );
}
