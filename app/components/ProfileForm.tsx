import { motion } from "framer-motion";
import { availableCategories } from "~/routes/add-categories";

export function ProfileForm({
  handleSubmit,
  formData,
  handleInputChange,
  handleCategoryChange,
}: /* Include other necessary props */
any) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="flex justify-center items-center h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-md w-full p-4 bg-white shadow-md rounded-md">
        <form onSubmit={handleSubmit}>
          <motion.div className="mb-4" variants={itemVariants}>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              accept="image/*"
            />
          </motion.div>
          <motion.div className="mb-4" variants={itemVariants}>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="input input-bordered mt-1 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </motion.div>
          <motion.div className="mb-4" variants={itemVariants}>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="input input-bordered mt-1 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </motion.div>
          <motion.div className="mb-4" variants={itemVariants}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input input-bordered mt-1 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </motion.div>
          <motion.div className="mb-4" variants={itemVariants}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input input-bordered mt-1 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </motion.div>
          <motion.div className="mb-4" variants={itemVariants}>
            <label
              htmlFor="categories"
              className="block text-sm font-medium text-gray-700"
            >
              Categories
            </label>
            {/* Implement your category selection component here */}
          </motion.div>

          <div className="flex flex-wrap justify-center">
            {Object.values(availableCategories).map((category) => (
              <div
                key={category}
                className={`p-3 m-2 rounded-full cursor-pointer transform hover:scale-105 transition duration-300 ${
                  formData.categories.includes(category)
                    ? " bg-secondary text-black"
                    : "bg-gray-200"
                }`}
                onClick={() => {
                  // if category is already selected, remove it
                  // else add it to the list of selected categories
                  formData.categories.includes(category)
                    ? handleCategoryChange(
                        formData.categories.filter(
                          (selectedCategory: string) =>
                            selectedCategory !== category
                        )
                      )
                    : handleCategoryChange([...formData.categories, category]);
                }}
              >
                {category}
              </div>
            ))}
          </div>
          <motion.div className="flex justify-end" variants={itemVariants}>
            <button type="submit" className="btn btn-primary mt-2 w-full">
              Save
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
