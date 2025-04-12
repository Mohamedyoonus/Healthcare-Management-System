import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* --------- Header Left --------- */}
      <motion.div
        className="md:w-1/2 flex flex-col items-start justify-center gap-5 py-8 m-auto md:py-[8vw] md:mb-[-30px]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,{" "}
            <br className="hidden sm:block" /> schedule your appointment
            hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Book appointment{" "}
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </motion.div>

      {/* --------- Header Right --------- */}
      <motion.div
        className="md:w-1/2 relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          className="w-full md:absolute bottom-0 right-0 h-auto "
          src={assets.header_img}
          alt=""
        />
      </motion.div>
    </div>
  );
};

export default Header;
