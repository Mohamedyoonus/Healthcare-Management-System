import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 py-6">
      {/* --- Heading Section --- */}
      <motion.div
        className="text-center text-3xl md:text-4xl font-semibold pt-4 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p>
          ABOUT <span className="text-primary">US</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">Who We Are & What We Do</p>
      </motion.div>

      {/* --- About Content --- */}
      <motion.div
        className="my-8 flex flex-col md:flex-row gap-8 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img
          className="w-full md:max-w-[380px] rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          src={assets.about_image}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-4 md:w-2/4 text-[15px] text-gray-600">
          <p>
            Welcome to <span className="font-bold text-gray-800">MediCare</span>
            , your trusted partner in managing your healthcare needs
            conveniently and efficiently. At MediCare, we understand the
            challenges individuals face when it comes to scheduling doctor
            appointments and managing their health records.
          </p>
          <p>
            MediCare is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, <b>MediCare</b> is here to support you every step of
            the way.
          </p>
          <div>
            <b className="text-gray-800 text-lg">Our Vision</b>
            <p>
              Our vision at MediCare is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>
      </motion.div>

      {/* --- Why Choose Us Section --- */}
      <motion.div
        className="text-center text-xl font-semibold text-gray-800 my-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p>
          WHY <span className="text-primary">CHOOSE US</span>
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {/* --- Card 1 --- */}
        <motion.div
          className="border px-7 md:px-10 py-7 flex flex-col gap-3 text-[14px] hover:shadow-xl bg-white hover:bg-gradient-to-r from-sky-700 to-sky-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg group"
          whileHover={{ scale: 1.05 }}
        >
          <b className="group-hover:text-white">EFFICIENCY :</b>
          <p className="leading-relaxed">
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </motion.div>

        {/* --- Card 2 --- */}
        <motion.div
          className="border px-7 md:px-10 py-7 flex flex-col gap-3 text-[14px] hover:shadow-xl bg-white hover:bg-gradient-to-r from-sky-700 to-sky-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg group"
          whileHover={{ scale: 1.05 }}
        >
          <b className="group-hover:text-white">CONVENIENCE :</b>
          <p className="leading-relaxed">
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </motion.div>

        {/* --- Card 3 --- */}
        <motion.div
          className="border px-7 md:px-10 py-7 flex flex-col gap-3 text-[14px] hover:shadow-xl bg-white hover:bg-gradient-to-r from-sky-700 to-sky-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg group"
          whileHover={{ scale: 1.05 }}
        >
          <b className="group-hover:text-white">PERSONALIZATION :</b>
          <p className="leading-relaxed">
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
