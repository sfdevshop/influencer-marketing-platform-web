import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { FormEvent } from "react";
import { useState } from "react";
import { API } from "~/constants/api";
import { getUserSession } from "~/utils/userSession";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  return json({ userId, token });
};

export const action: ActionFunction = async ({ request }) => {};

export const availableCategories: { [key: string]: string } = {
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

function SelectCategories() {
  const data = useLoaderData<any>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(data.token);
    const selectedCategoryKeys: string[] = [];

    // Get the keys of the selected categories
    Object.keys(availableCategories).forEach((key) => {
      if (selectedCategories.includes(availableCategories[key])) {
        selectedCategoryKeys.push(key);
      }
    });

    // Send the selected categories to the backend
    const categoriesData = { categories: selectedCategoryKeys };
    console.log(categoriesData);
    try {
      console.log(JSON.stringify(categoriesData));
      const response = await fetch(API.ADD_CATEGORIES_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(data.token),
        },
        body: JSON.stringify(categoriesData),
      });

      // const resp = await response.json();

      if (response.status === 200) {
        navigate("/influencer-home");
        return;
      } else {
        // TODO: Handle error
      }
    } catch (error) {
      // TODO: Handle error
    }
  };

  return (
    <div className="h-screen flex justify-center items-center px-40">
      <div className="bg-slate-800 rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          Select Categories
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h2 className="text-lg mb-2 text-center text-white">
              Choose up to 3 categories
            </h2>
            <div className="flex flex-wrap justify-center">
              {Object.values(availableCategories).map((category) => (
                <div
                  key={category}
                  className={`p-3 m-2 rounded-full cursor-pointer transform hover:scale-105 transition duration-300 ${
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
          </div>
          <button
            type="submit"
            disabled={selectedCategories.length === 0}
            className="bg-primary text-white p-3 rounded-lg mt-4 w-full disabled:opacity-50"
          >
            Add Categories
          </button>
        </form>
      </div>
    </div>
  );
}

export default SelectCategories;
