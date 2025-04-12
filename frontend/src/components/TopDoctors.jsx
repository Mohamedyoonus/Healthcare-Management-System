import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  // Parent animation for staggered effect
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.6 },
    },
  };

  // Individual card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-4 my-10 text-[#262626] px-4 md:px-8 py-6 rounded-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-2xl md:text-3xl font-semibold text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Top Doctors to Book
      </motion.h1>

      <motion.p
        className="sm:w-1/3 text-center text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Browse through our extensive list of trusted doctors.
      </motion.p>

      {/* --------- Doctors Grid --------- */}
      <motion.div
        className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-4"
        variants={containerVariants}
      >
        {doctors.slice(0, 12).map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="border border-gray-200 rounded-2xl overflow-hidden cursor-pointer shadow-md bg-white transition-all duration-300"
            >
              <div className="w-full h-40 bg-[#F3F6FF] flex items-center justify-center">
                <motion.img
                  className="w-full h-full object-contain"
                  src={item.image}
                  alt={item.name}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    item.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-[#262626] text-lg font-semibold">
                  {item.name}
                </p>
                <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* --------- More Button --------- */}
      <motion.button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-primary text-white px-12 py-3 rounded-full mt-6 transition-all duration-300 shadow-md"
        whileHover={{
          scale: 1.05,
          y: -2,
          boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.15)",
        }}
        whileTap={{ scale: 0.97 }}
      >
        More
      </motion.button>
    </motion.div>
  );
};

export default TopDoctors;
