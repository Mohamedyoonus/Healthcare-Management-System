import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const MotionNavLink = motion.create(NavLink);
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between py-4 px-5 md:px-10">
        <motion.img
          onClick={() => navigate("/")}
          className="w-44 cursor-pointer hover:opacity-80 transition-opacity"
          src={assets.logo}
          alt="Logo"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          {["/", "/doctors", "/about", "/contact"].map((path, index) => (
            <li key={index}>
              <NavLink to={path} className="relative group">
                <motion.span
                  className="py-1 hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  {path === "/" ? "HOME" : path.substring(1).toUpperCase()}
                </motion.span>
                <motion.hr
                  className="h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block"
                  initial={{ width: "0%" }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 0.3 }}
                />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* User Profile & Dropdown */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
              >
                <motion.img
                  className="w-9 h-9 rounded-full border border-gray-300 object-cover"
                  src={userData.image}
                  alt="Profile"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.img
                  className="w-3"
                  src={assets.dropdown_icon}
                  alt="Dropdown Icon"
                  animate={{ rotate: showDropdown ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Dropdown */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute right-0 mt-3 w-52 bg-white bg-opacity-90 backdrop-blur-lg shadow-lg rounded-lg py-3 border border-gray-200"
                  >
                    <motion.p
                      onClick={() => navigate("/my-profile")}
                      className="px-5 py-2 hover:bg-primary hover:text-white cursor-pointer rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      My Profile
                    </motion.p>
                    <motion.p
                      onClick={() => navigate("/my-appointments")}
                      className="px-5 py-2 hover:bg-primary hover:text-white cursor-pointer rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      My Appointments
                    </motion.p>
                    <motion.p
                      onClick={logout}
                      className="px-5 py-2 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Logout
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              onClick={() => navigate("/login")}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full font-medium transition-all hidden md:block"
              whileHover={{ scale: 1.05 }}
            >
              Create account
            </motion.button>
          )}

          {/* Mobile Menu Icon */}
          <motion.img
            onClick={() => setShowMenu(true)}
            className="w-6 md:hidden cursor-pointer hover:scale-110 transition-transform"
            src={assets.menu_icon}
            alt="Menu Icon"
            whileHover={{ scale: 1.2 }}
          />
        </div>
      </div>

      {/* ---- Mobile Menu ---- */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-0 right-0 h-full bg-white shadow-lg z-30 w-64"
          >
            <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
              <motion.img
                src={assets.logo}
                className="w-36"
                alt="Logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.img
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                className="w-7 cursor-pointer hover:rotate-90 transition-transform"
                alt="Close Icon"
                whileHover={{ scale: 1.2 }}
              />
            </div>
            <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
              {["/", "/doctors", "/about", "/contact"].map((path, index) => (
                <li key={index}>
                  <MotionNavLink
                    onClick={() => setShowMenu(false)}
                    to={path}
                    className="w-full text-center hover:bg-gray-100 py-2 rounded"
                    whileHover={{ scale: 1.05 }}
                  >
                    {path === "/" ? "HOME" : path.substring(1).toUpperCase()}
                  </MotionNavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
