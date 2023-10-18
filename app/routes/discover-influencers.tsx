// src/routes/discover-influencers.tsx

import React, { useState } from "react";
import InfluencerCard from "~/components/InfluencerCard";
import { LoaderFunction, redirect, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { API } from "~/constants/api";
import { getUserSession, commitSession, getSession } from "~/utils/userSession";
import { ActionFunction } from "@remix-run/node";
import { Influencer } from "~/types/ApiOps";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  return json({ userId, token });
};

function DiscoverInfluencers() {
  const data = useLoaderData<any>();

  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const fetcher = useFetcher();

  // make a dictionary of categories and their ids

  const availableCategories: { [key: string]: string } = {
    travel: "Travel",
    fashion_and_beauty: "Fashion and Beauty",
    fitness_and_health: "Fitness and Health",
    food_and_cuisine: "Food and Cuisine",
    parenting_and_family: "Parenting and Family",
    tech_and_gadgets: "Tech and Gadgets",
    diy_and_crafts: "DIY and Crafts",
    business_and_finance: "Business and Finance",
    pets_and_animals: "Pets and Animals",
    art_and_photography: "Art and Photography",
  };

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

    const queryParams = selectedCategoryKeys
      .map((category) => `categories=${category}`)
      .join("&");

    console.log(queryParams);
    // Perform the GET request to your backend API with queryParams
    // Example using fetch:
    // fetch(`/brand/getInfluencers?${queryParams}`)
    //   .then((response) => response.json())
    //   .then((data) => setInfluencers(data));

    try {
      fetch(`${API.GET_INFLUENCERS_URL}${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(data.token),
        },
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          // convert data to obj

          const influencers = data.data.map((influencer: any) => {
            return {
              id: influencer.id,
              fname: influencer.fname,
              lname: influencer.lname,
              tags: influencer.tags.map(
                (tag: string) => availableCategories[tag.toLowerCase()]
              ),
              followers: influencer.followers,
            };
          });
          setInfluencers(influencers);
        });
    } catch (err) {
      console.log(err);
    }
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
        <div className="flex">
          <button
            className=" filter-button bg-primary text-white p-3 rounded-lg mt-4 w-1/6 mx-auto"
            onClick={handleFilterSubmit}
          >
            Filter
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-3">
        {influencers.map((influencer) => {
          return <InfluencerCard key={influencer.id} influencer={influencer} />;
        })}
      </div>
    </div>
  );
}

export default DiscoverInfluencers;