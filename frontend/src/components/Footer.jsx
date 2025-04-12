import React from "react";
import { assets } from "../assets/assets";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" border-t border-gray-300">
      <div className="md:mx-10">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 py-10 text-sm">
          <div>
            <img className="mb-5 w-40" src={assets.logo} alt="Company Logo" />
            <p className="w-full md:w-2/3 text-gray-600 leading-6">
              MediCare simplifies healthcare management with easy appointment
              scheduling, secure medical records, and seamless communication,
              enhancing patient care and provider efficiency.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/"
                className="text-gray-600 hover:text-blue-600"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/?lang=en-in"
                className="text-gray-600 hover:text-blue-400"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/"
                className="text-gray-600 hover:text-pink-600"
              >
                <FaInstagram />
              </a>
              <a
                href="https://in.linkedin.com/"
                className="text-gray-600 hover:text-blue-700"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xl font-medium mb-5 text-gray-800">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">Home</li>
              <li className="hover:text-gray-900 cursor-pointer">About us</li>
              <li className="hover:text-gray-900 cursor-pointer">Delivery</li>
              <li className="hover:text-gray-900 cursor-pointer">
                Privacy policy
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xl font-medium mb-5 text-gray-800">
              GET IN TOUCH
            </p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">
                +1-212-456-7890
              </li>
              <li className="hover:text-gray-900 cursor-pointer">
                MediCare@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div>
          <hr />
          <p className="py-5 text-sm text-center text-gray-600">
            Copyright 2024 @ MediCare.com - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
