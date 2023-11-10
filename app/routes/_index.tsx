import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";

export const meta: MetaFunction = () => {
  return [
    { title: "influencity" },
    { name: "description", content: "Influence and earn" },
  ];
};

export default function Index() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="font-sans min-h-screen p-8"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="max-w-7xl mx-auto" variants={itemVariants}>
        <header className="text-center py-16">
          <motion.h1
            className="text-6xl font-black mb-4 text-white"
            variants={itemVariants}
          >
            Influence and earn
          </motion.h1>
          <motion.p
            className="text-xl text-white mb-8 max-w-xl mx-auto"
            variants={itemVariants}
          >
            The nexus of creativity and commerce. Where brands and influencers
            forge impactful partnerships.
          </motion.p>
        </header>

        <motion.main variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="bg-white text-gray-800 rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition duration-300"
              whileHover={{ scale: 1.05 }}
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold mb-6">For Brands</h2>
              <p className="mb-6">
                Elevate your brand with our curated network of influencers.
                Track your campaigns and engage with your audience like never
                before.
              </p>
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition duration-300">
                Discover Influencers
              </button>
            </motion.div>

            <motion.div
              className="bg-white text-gray-800 rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition duration-300"
              whileHover={{ scale: 1.05 }}
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold mb-6">For Influencers</h2>
              <p className="mb-6">
                Join an exclusive platform where your creativity is valued.
                Partner with brands that resonate with your audience.
              </p>
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition duration-300">
                Start Earning
              </button>
            </motion.div>
          </div>
        </motion.main>

        <motion.footer
          className="text-center mt-24 text-white"
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} influencity. Craft your influence.</p>
        </motion.footer>
      </motion.div>
    </motion.div>
  );
}
