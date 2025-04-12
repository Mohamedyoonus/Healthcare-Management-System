import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col md:flex-row bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ------- Left Side ------- */}
      <motion.div
        className="flex-1 py-12 sm:py-14 md:py-20 lg:py-28 lg:pl-5 text-center md:text-left"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Book Appointment
        </h2>
        <p className="mt-3 sm:mt-4 text-lg sm:text-xl lg:text-2xl text-white">
          With 100+ Trusted Doctors
        </p>
        <motion.button
          onClick={() => {
            navigate("/login");
            scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="bg-white text-sm sm:text-base text-gray-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full mt-6 font-medium hover:scale-105 hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Account
        </motion.button>
      </motion.div>

      {/* ------- Right Side ------- */}
      <motion.div
        className="hidden md:flex md:w-1/2 lg:w-[370px] justify-end relative"
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <img
          className="w-full max-w-md md:max-w-sm lg:max-w-md"
          src={assets.appointment_img}
          alt="Appointment"
        />
      </motion.div>
    </motion.div>
  );
};

export default Banner;
