import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId,
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <motion.div
      className="flex flex-col items-center gap-4 my-16 text-[#262626]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl font-medium"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Related Doctors
      </motion.h1>
      <motion.p
        className="sm:w-1/3 text-center text-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Simply browse through our extensive list of trusted doctors.
      </motion.p>
      <motion.div
        className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
      >
        {relDoc.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <img className="bg-[#EAEFFF]" src={item.image} alt="" />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-gray-500"}`}
              >
                <p
                  className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-500"}`}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-[#262626] text-lg font-medium">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RelatedDoctors;
