import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [availability, setAvailability] = useState("all");
  const [experience, setExperience] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const applyFilter = () => {
    let filtered = doctors;

    if (speciality) {
      filtered = filtered.filter((doc) => doc.speciality === speciality);
    }

    if (availability !== "all") {
      filtered = filtered.filter(
        (doc) => doc.available === (availability === "available")
      );
    }

    if (experience !== "all") {
      filtered = filtered.filter((doc) => {
        if (experience === "0-5") return doc.experience <= 5;
        if (experience === "5-10")
          return doc.experience > 5 && doc.experience <= 10;
        if (experience === "10+") return doc.experience > 10;
        return true;
      });
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, availability, experience, searchTerm]);

  return (
    <motion.div
      className="min-h-screen px-4 md:px-10 py-10 text-[#262626]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl font-semibold mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Find Your Specialist
      </motion.h1>
      <motion.p
        className="text-gray-600 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Browse through our list of trusted doctors by speciality.
      </motion.p>

      <motion.button
        onClick={() => setShowFilter(!showFilter)}
        className={`py-2 px-4 border rounded-lg text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""}`}
        whileTap={{ scale: 0.95 }}
      >
        {showFilter ? "Hide Filters" : "Show Filters"}
      </motion.button>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Filter Sidebar */}
        <AnimatePresence>
          {(showFilter || window.innerWidth > 640) && (
            <motion.div
              className="flex flex-col gap-4 w-full sm:w-[250px] text-sm"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-3">Search Doctor</h2>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                />
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-3">Specialities</h2>
                <div className="flex flex-col gap-2">
                  {specialities.map((item, index) => (
                    <motion.p
                      key={index}
                      onClick={() =>
                        speciality === item
                          ? navigate("/doctors")
                          : navigate(`/doctors/${item}`)
                      }
                      className={`pl-3 py-1.5 pr-16 border rounded-lg cursor-pointer transition-all 
                        ${speciality === item ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.p>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-3">Availability</h2>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full border p-2 rounded-lg bg-gray-100"
                >
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="notAvailable">Not Available</option>
                </select>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-3">Experience</h2>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full border p-2 rounded-lg bg-gray-100"
                >
                  <option value="all">All</option>
                  <option value="0-5">0-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Doctors Grid */}
        <motion.div
          className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {filterDoc.map((item, index) => (
            <motion.div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="group border border-gray-200 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-44 bg-[#EAEFFF] overflow-hidden flex items-center justify-center">
                <motion.img
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  src={item.image}
                  alt={item.name}
                  whileHover={{ scale: 1.1 }}
                />
              </div>
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm ${item.available ? "text-green-500" : "text-gray-500"}`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-500"}`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-[#262626] text-lg font-semibold">
                  {item.name}
                </p>
                <p className="text-[#5C5C5C] text-sm mb-1">
                  {item.speciality} <br /> • {item.experience} 
                </p>
                <div className="flex items-center text-yellow-500 text-sm">
                  {"★".repeat(Math.round(item.rating || 4))}
                  {"☆".repeat(5 - Math.round(item.rating || 4))}
                  <span className="ml-2 text-xs text-gray-500">
                    ({item.reviews || 24} reviews)
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Doctors;
