// src/routes/discover-influencers.tsx

import { useState } from "react";
import InfluencerCard from "~/components/InfluencerCard";
import type { LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { API } from "~/constants/api";
import { getUserSession } from "~/utils/userSession";
import { UserTypes, type DbInfluencer } from "~/types/ApiOps";
import { getUser } from "~/utils/db";
import { availableCategories } from "~/constants/categories";
import { follwersRange } from "~/constants/followersRange";
import { ageGroupConst } from "~/constants/ageGroup";
import { genderConst } from "~/constants/gender";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  const data = await getUser(token);
  const user = data.data as DbInfluencer;
  if (user.usertype === UserTypes.INFLUENCER) {
    return redirect("/dashboard");
  }

  return json({ user, userId, token });
};

function DiscoverInfluencers() {
  const data = useLoaderData<any>();

  const [influencers, setInfluencers] = useState<DbInfluencer[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // States for the new dropdowns
  const [followers, setFollowers] = useState<string>("");
  const [ageGroup, setAgeGroup] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const handleCategoryChange = (category: string) => {
    // Toggle the selection of the category
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const handleFilterSubmit = () => {
    const selectedCategoryKeys: string[] = [];

    Object.keys(availableCategories).forEach((key) => {
      if (selectedCategories.includes(availableCategories[key])) {
        selectedCategoryKeys.push(key);
      }
    });

    let queryParams = selectedCategoryKeys
      .map((category) => `categories=${category}`)
      .join("&");

    console.log(queryParams);
    // Perform the GET request to your backend API with queryParams
    // Example using fetch:
    // fetch(`/brand/getInfluencers?${queryParams}`)
    //   .then((response) => response.json())
    //   .then((data) => setInfluencers(data));
    console.log(
      "Age Group:" +
        ageGroup +
        "Followers Range:" +
        followers +
        "Gender: " +
        gender
    );
    if (ageGroup != null && ageGroup != "") {
      queryParams += `&ageGroup=${ageGroup}`;
    }
    if (gender != null && gender != "") {
      queryParams += `&gender=${gender}`;
    }

    if (followers != null && followers != "") {
      queryParams += `&followersRange=${followers}`;
    }

    console.log(queryParams);
    try {
      fetch(`${API.GET_INFLUENCERS_URL}${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(data.token),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const influencers = data.data as DbInfluencer[];

          setInfluencers(influencers);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Handlers for the new dropdowns
  const handleFollowersChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFollowers(event.target.value);
  };

  const handleAgeGroupChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAgeGroup(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };
  return (
    <div className="discover-influencers-container">
      <div className="top-section bg-slate-800  p-8">
        <h2 className="page-title text-center mb-8 text-3xl font-bold py-2 text-white">
          Discover Influencers
        </h2>
        <div className="flex flex-wrap justify-center">
          {Object.values(availableCategories).map((category) => (
            <div
              key={category}
              className={`p-2 m-1 rounded-full cursor-pointer transform hover:scale-105 transition duration-300 ${
                selectedCategories.includes(category)
                  ? " bg-secondary text-black"
                  : "bg-gray-200"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </div>
          ))}
        </div>

        {/* New Dropdowns */}
        <div className="dropdowns-container gap-2 my-2 flex flex-row justify-end mt-8">
          <select
            className="dropdown border border-gray-300 rounded py-2 px-4"
            value={followers}
            onChange={handleFollowersChange}
            style={{
              padding: "0.5em",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <option value="">No of Followers</option>
            {Object.entries(follwersRange).map(([label, value]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>

          <select
            className="dropdown border border-gray-300 rounded py-2 px-4"
            value={ageGroup}
            onChange={handleAgeGroupChange}
            style={{
              padding: "0.5em",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <option value="">Age Group</option>
            {Object.entries(ageGroupConst).map(([label, value]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>

          <select
            className="dropdown border border-gray-300 rounded py-2 px-4"
            value={gender}
            onChange={handleGenderChange}
            style={{
              padding: "0.5em",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <option value="">Gender</option>
            {Object.entries(genderConst).map(([label, value]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex">
          <button
            className=" filter-button bg-primary text-white p-3 rounded-lg mt-4 w-1/6 mx-auto"
            onClick={handleFilterSubmit}
          >
            Filter
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-3 px-1 md:px-4 lg:px-8 py-4">
        {influencers.map((influencer) => {
          return <InfluencerCard key={influencer.id} influencer={influencer} />;
        })}
      </div>
    </div>
  );
}

export default DiscoverInfluencers;
