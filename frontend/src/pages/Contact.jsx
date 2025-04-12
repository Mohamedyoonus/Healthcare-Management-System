import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Contact = () => {
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
          CONTACT <span className="text-primary">US</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">We'd love to hear from you</p>
      </motion.div>

      {/* --- Contact Content --- */}
      <motion.div
        className="my-8 flex flex-col md:flex-row gap-8 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img
          className="w-full md:max-w-[380px] rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          src={assets.contact_image}
          alt="Contact Us"
        />
        <div className="flex flex-col justify-center items-start gap-6 text-[15px] text-gray-600">
          {/* --- Office Info --- */}
          <div className="p-0">
            <p className="font-semibold text-lg text-gray-700">OUR OFFICE</p>
            <p className="text-gray-500 leading-relaxed mt-1">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
          </div>

          {/* --- Get in Touch --- */}
          <div className="p-0">
            <p className="font-semibold text-lg text-gray-700">GET IN TOUCH</p>
            <p className="text-gray-500 leading-relaxed mt-1">
              Tel: (415) 555-0132 <br /> Email: medicare@gmail.com
            </p>
          </div>

          {/* --- Careers --- */}
          <div className="p-0">
            <p className="font-semibold text-lg text-gray-700">
              CAREERS AT MEDICARE
            </p>
            <p className="text-gray-500 leading-relaxed mt-1">
              Learn more about our teams and job openings.
            </p>
          </div>

          {/* --- Explore Jobs Button (Previous Style) --- */}
          <button className="border border-black px-7 py-2.5 text-sm hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 rounded-full">
            Explore Jobs
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
