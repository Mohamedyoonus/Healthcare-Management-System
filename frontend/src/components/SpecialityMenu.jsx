import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SpecialityMenu = () => {
  return (
    <motion.div
      id="speciality"
      className="flex flex-col items-center gap-8 py-16 text-[#262626] dark:text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-semibold text-primary dark:text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Find by Speciality
      </motion.h1>

      <motion.p
        className="sm:w-1/3 text-center text-sm text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Browse through our trusted specialists and book appointments effortlessly.
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-10 pt-6 w-full max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {specialityData.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to={`/doctors/${item.speciality}`}
              onClick={() => scrollTo(0, 0)}
              className="group flex flex-col items-center text-center"
            >
              <motion.div
                className="bg-white dark:bg-gray-800 shadow-md rounded-full w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                  src={item.image}
                  alt={item.speciality}
                  loading="lazy"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <p className="mt-3 text-sm font-medium text-gray-800 dark:text-white">
                {item.speciality}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SpecialityMenu;
