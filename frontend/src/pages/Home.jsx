import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
      </motion.div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 my-6" />

      {/* Speciality Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SpecialityMenu />
      </motion.section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 my-6" />

      {/* Top Doctors Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <TopDoctors />
      </motion.section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 my-6" />

      {/* Banner / CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Banner />
      </motion.section>
    </div>
  );
};

export default Home;
