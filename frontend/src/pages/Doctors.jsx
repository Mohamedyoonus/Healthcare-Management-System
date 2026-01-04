import React, { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Filter, 
  X, 
  Star, 
  Clock, 
  Award, 
  Calendar,
  User,
  ChevronDown
} from "lucide-react";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [availability, setAvailability] = useState("all");
  const [experience, setExperience] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const specialities = useMemo(() => [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist",
  ], []);

  const applyFilter = useCallback(() => {
    setLoading(true);
    let filtered = [...doctors];

    if (speciality) {
      filtered = filtered.filter((doc) => 
        doc.speciality.toLowerCase() === speciality.toLowerCase()
      );
    }

    if (availability !== "all") {
      filtered = filtered.filter(
        (doc) => doc.available === (availability === "available")
      );
    }

    if (experience !== "all") {
      filtered = filtered.filter((doc) => {
        const exp = doc.experience || 0;
        if (experience === "0-5") return exp <= 5;
        if (experience === "5-10") return exp > 5 && exp <= 10;
        if (experience === "10+") return exp > 10;
        return true;
      });
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch(sortBy) {
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "experience":
        filtered.sort((a, b) => (b.experience || 0) - (a.experience || 0));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setTimeout(() => {
      setFilterDoc(filtered);
      setLoading(false);
    }, 300);
  }, [doctors, speciality, availability, experience, searchTerm, sortBy]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  const handleDoctorClick = (doctorId) => {
    navigate(`/appointment/${doctorId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setAvailability("all");
    setExperience("all");
    setSearchTerm("");
    setSortBy("rating");
    if (speciality) {
      navigate("/doctors");
    }
  };

  const getExperienceText = (years) => {
    if (years === 1) return "1 year";
    if (years === 0) return "Fresh graduate";
    return `${years} years`;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={
              i < fullStars 
                ? "text-yellow-500 fill-yellow-500" 
                : i === fullStars && hasHalfStar 
                ? "text-yellow-500 fill-yellow-500/50"
                : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8 text-[#262626]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <motion.div
        className="mb-4 md:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-3 md:mb-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Find Your Specialist
          </h1>
          <p className="text-gray-600 text-sm md:text-base mt-1">
            Browse trusted doctors {speciality && <span className="text-primary font-medium">in {speciality}</span>}
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-gray-600 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 border border-gray-300 rounded-lg bg-white text-xs md:text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none w-32 sm:w-auto"
            >
              <option value="rating">Highest Rated</option>
              <option value="experience">Most Experienced</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          <motion.button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 py-2 px-3 border rounded-lg font-medium transition-all text-sm md:hidden ${
              showFilter 
                ? "bg-primary text-white border-primary" 
                : "bg-white text-gray-700 border-gray-300 hover:border-primary"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {showFilter ? (
              <>
                <X size={14} />
                <span>Hide Filters</span>
              </>
            ) : (
              <>
                <Filter size={14} />
                <span>Filters</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Mobile Search Bar */}
        <div className="mb-3 md:hidden">
          <input
            type="text"
            placeholder="Search doctors by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm"
          />
        </div>

        {/* Active Filters */}
        {(availability !== "all" || experience !== "all" || searchTerm || speciality) && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {speciality && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg flex items-center gap-1">
                {speciality}
                <button 
                  onClick={() => navigate("/doctors")} 
                  className="ml-0.5 hover:bg-primary/20 rounded-full"
                >
                  <X size={10} />
                </button>
              </span>
            )}
            {availability !== "all" && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg flex items-center gap-1">
                {availability === "available" ? "Available" : "Not Available"}
                <button 
                  onClick={() => setAvailability("all")} 
                  className="ml-0.5 hover:bg-blue-200 rounded-full"
                >
                  <X size={10} />
                </button>
              </span>
            )}
            {experience !== "all" && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-lg flex items-center gap-1">
                {experience} yrs
                <button 
                  onClick={() => setExperience("all")} 
                  className="ml-0.5 hover:bg-green-200 rounded-full"
                >
                  <X size={10} />
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-lg flex items-center gap-1">
                "{searchTerm.substring(0, 10)}..."
                <button 
                  onClick={() => setSearchTerm("")} 
                  className="ml-0.5 hover:bg-purple-200 rounded-full"
                >
                  <X size={10} />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1 ml-auto"
            >
              <X size={12} />
              Clear
            </button>
          </div>
        )}
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4 lg:gap-6">
        {/* Filter Sidebar */}
        <AnimatePresence>
          {(showFilter || window.innerWidth >= 768) && (
            <motion.aside
              className="lg:w-60 xl:w-64 flex-shrink-0"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="sticky top-3 md:top-4 space-y-3 md:space-y-4">
                {/* Search Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-4">
                  <h2 className="text-sm md:text-base font-semibold mb-2 md:mb-3">
                    Search Doctor
                  </h2>
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm"
                  />
                </div>

                {/* Specialities Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-4">
                  <h2 className="text-sm md:text-base font-semibold mb-2 md:mb-3">
                    Specialities
                  </h2>
                  <div className="space-y-1.5">
                    <motion.button
                      onClick={() => navigate("/doctors")}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                        !speciality 
                          ? "bg-primary text-white" 
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      All Specialities
                    </motion.button>
                    {specialities.map((item) => (
                      <motion.button
                        key={item}
                        onClick={() => 
                          speciality === item 
                            ? navigate("/doctors") 
                            : navigate(`/doctors/${encodeURIComponent(item)}`)
                        }
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                          speciality === item 
                            ? "bg-primary text-white" 
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Filters Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-4">
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <h2 className="text-sm md:text-base font-semibold">
                      Filters
                    </h2>
                    {(availability !== "all" || experience !== "all" || searchTerm) && (
                      <button
                        onClick={clearFilters}
                        className="text-xs text-primary hover:text-primary-dark font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
                        Availability
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {["all", "available", "notAvailable"].map((option) => (
                          <button
                            key={option}
                            onClick={() => setAvailability(option)}
                            className={`py-1.5 px-2 text-xs rounded-lg transition-all ${
                              availability === option 
                                ? "bg-primary text-white" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {option === "all" ? "All" : 
                             option === "available" ? "Available" : "Not Available"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5">
                        Experience
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {["all", "0-5", "5-10", "10+"].map((option) => (
                          <button
                            key={option}
                            onClick={() => setExperience(option)}
                            className={`py-1.5 px-2 text-xs rounded-lg transition-all ${
                              experience === option 
                                ? "bg-primary text-white" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {option === "all" ? "All" : 
                             option === "0-5" ? "0-5 yrs" :
                             option === "5-10" ? "5-10 yrs" : "10+ yrs"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Count */}
                <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-3 md:p-4">
                  <p className="text-sm md:text-base font-semibold">
                    {filterDoc.length} Doctors Found
                  </p>
                  <p className="text-xs opacity-90 mt-0.5">
                    {speciality ? `in ${speciality}` : "across all specialities"}
                  </p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Doctors Grid */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Desktop Results Count */}
          <div className="hidden md:flex items-center justify-between mb-3 md:mb-4">
            <p className="text-gray-600 text-sm">
              Showing <span className="font-semibold">{filterDoc.length}</span> doctors
              {speciality && <span className="text-primary font-medium ml-1">in {speciality}</span>}
            </p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-2 px-3 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm w-48"
              />
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
              >
                <X size={14} />
                Clear filters
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-xl h-36 md:h-44 mb-2 md:mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-1.5"></div>
                  <div className="h-2.5 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filterDoc.length === 0 ? (
            <motion.div
              className="text-center py-8 md:py-12 bg-white rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <User size={40} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-1.5">
                No doctors found
              </h3>
              <p className="text-gray-500 text-sm mb-4 max-w-xs mx-auto">
                Try adjusting your filters
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors text-sm"
              >
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              {filterDoc.map((doctor) => (
                <motion.div
                  key={doctor._id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    onClick={() => handleDoctorClick(doctor._id)}
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col"
                  >
                    {/* Doctor Image - Proper Aspect Ratio */}
                    <div className="relative h-32 md:h-40 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
                      <motion.img
                        className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
                        src={doctor.image}
                        alt={doctor.name}
                        loading="lazy"
                        style={{ objectPosition: 'center 20%' }}
                      />
                      
                      {/* Availability Badge - Top Right Corner */}
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full ${doctor.available ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${doctor.available ? 'bg-green-500' : 'bg-gray-500'}`} />
                          <span className="text-[9px] md:text-[10px] font-medium text-gray-700 whitespace-nowrap">
                            {doctor.available ? "Available" : "Busy"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="p-2.5 md:p-3 flex-1 flex flex-col">
                      <div className="mb-2">
                        {/* Truncated Doctor Name */}
                        <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                          {doctor.name}
                        </h3>
                        <p className="text-primary font-medium text-xs md:text-sm mt-0.5 truncate">
                          {doctor.speciality}
                        </p>
                      </div>

                      {/* Experience & Rating */}
                      <div className="space-y-1.5 mb-2.5 md:mb-3 flex-1">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Award size={12} className="text-primary flex-shrink-0" />
                          <span className="text-xs truncate">
                            {getExperienceText(doctor.experience || 0)} exp
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {renderStars(doctor.rating || 4)}
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            ({doctor.reviews || 24})
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <motion.button
                        className={`w-full py-1.5 md:py-2 rounded-lg font-medium flex items-center justify-center gap-1 transition-colors text-xs md:text-sm ${
                          doctor.available 
                            ? "bg-primary text-white hover:bg-primary-dark" 
                            : "bg-gray-100 text-gray-500 cursor-not-allowed"
                        }`}
                        whileTap={doctor.available ? { scale: 0.98 } : {}}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (doctor.available) {
                            handleDoctorClick(doctor._id);
                          }
                        }}
                      >
                        {doctor.available ? (
                          <>
                            <Calendar size={12} className="flex-shrink-0" />
                            <span className="truncate">Book Now</span>
                          </>
                        ) : (
                          <>
                            <Clock size={12} className="flex-shrink-0" />
                            <span className="truncate">Not Available</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex items-center justify-around md:hidden z-10">
        <div className="text-center">
          <p className="text-xs font-medium text-gray-900">{filterDoc.length}</p>
          <p className="text-[10px] text-gray-500">Doctors</p>
        </div>
        
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-primary text-white p-2.5 rounded-full shadow-lg"
        >
          <Filter size={18} />
        </button>
        
        <button
          onClick={clearFilters}
          className="text-center"
        >
          <X size={16} className="mx-auto text-gray-600" />
          <p className="text-[10px] text-gray-500 mt-0.5">Clear</p>
        </button>
      </div>
      
      {/* Bottom padding for mobile bottom bar */}
      <div className="h-14 md:h-0"></div>
    </motion.div>
  );
};

export default Doctors;