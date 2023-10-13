import React, { useState } from "react";
import { ProfileForm } from "~/components/ProfileForm";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: "",
    categories: [],
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (selectedCategories: any) => {
    setFormData((prevData) => ({
      ...prevData,
      categories: selectedCategories,
    }));
  };

  const handleSubmit = async () => {
    // Submit the form data to your server for updating the user's profile
  };

  return (
    <ProfileForm
      submitHandler={handleSubmit}
      formData={formData}
      handleInputChange={handleInputChange}
      handleCategoryChange={handleCategoryChange}
    />
  );
}
