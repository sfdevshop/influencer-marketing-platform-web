import React, { useState, FormEvent } from "react";

function SelectCategories() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const availableCategories = [
    "Travel",
    "Fashion and Beauty",
    "Fitness and Health",
    "Food and Cuisine",
    "Parenting and Family",
    "Tech and Gadgets",
    "DIY and Crafts",
    "Business and Finance",
    "Pets and Animals",
    "Art and Photography",
  ];

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

    // Send the selected categories to the backend
    const categoriesData = { categories: selectedCategories };
    console.log(categoriesData);
    try {
      const response = await fetch("http://localhost:3000/user/addCategories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authentication: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(categoriesData),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect the user
      } else {
        // Handle errors, e.g., show an error message
      }
    } catch (error) {
      // Handle network or request errors
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
              {availableCategories.map((category) => (
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
            className="bg-primary text-white p-3 rounded-lg mt-4 w-full"
          >
            Add Categories
          </button>
        </form>
      </div>
    </div>
  );
}

export default SelectCategories;
